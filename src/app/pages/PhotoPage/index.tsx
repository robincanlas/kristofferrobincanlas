import * as React from 'react';
import style from './style.css';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Loader, Photo } from 'app/components';
import { Modal } from 'semantic-ui-react';
import { ProgressiveImage } from 'app/components';

export namespace _PhotoPage {
	export interface InitialModalData {
		open: boolean;
		photo: Models.Photo | null;
	}
}

const initialModalData: _PhotoPage.InitialModalData = {
	open: false,
	photo: null
};

export const PhotoPage: React.FC = () => {
	let limit: number = 20;
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [photos, setPhotos] = React.useState<Models.Photo[]>([]);
	const [maxPageNumber, setMaxPageNumber] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [modalData, setModalData] = React.useState<_PhotoPage.InitialModalData>(initialModalData);
  const photography = useSelector((state: RootState) => state.photography);

	const watcher: React.MutableRefObject<IntersectionObserver | undefined> = React.useRef();	
	
	React.useEffect(() => {
		setMaxPageNumber(Math.round(photography.photos.length / limit));
	}, [photography.photos]);

	const lastPhotoRef: (node: any) => void = React.useCallback(node => {
		if (loading) return;
		if (watcher.current) {
			watcher.current.disconnect();
		}
		watcher.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && pageNumber !== maxPageNumber) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		});
		if (node) {
			watcher.current.observe(node);
		}
	}, [photos, photography.photos, pageNumber, maxPageNumber, loading]);

	const getPhotos = () => {
		const newPhotos: Models.Photo[] = [];
		for (let i = photos.length; i < photography.photos.length; i++) {
			if (limit * pageNumber === i) {
				break;
			}
			newPhotos.push(photography.photos[i]);
		}
		setPhotos((oldPhotos) => oldPhotos.concat(newPhotos));
	};

	const handlePhotoClick = (photo: Models.Photo | null = null) => {
		setModalData({
			open: !modalData.open,
			photo: photo
		});
	};

	const getOverlay = (): JSX.Element => {
		return (
			<span className={style['custom-modal']} onClick={() => handlePhotoClick()}>
				<img src={`${modalData.photo?.raw}_s.jpg`} />
			</span>
		);
	};

	const getModal = (): JSX.Element => {
		return (
			<Modal
				basic
				size='large'
				centered={true}
				onClose={() => handlePhotoClick()}
				open={modalData.open}
			>
			<Modal.Content image>
				<div onClick={() => handlePhotoClick()} className={style['modal-image']}>
					<ProgressiveImage 
						sizes='(max-width: 800px) 100vw, 800px'
						preview={`${modalData.photo!.raw}_s.jpg`}
						image={modalData.photo!.src}
						srcSet={`${modalData.photo!.src} 200w,
							${modalData.photo!.src} 400w,
							${modalData.photo!.src} 800w
						`}
					/>
				</div>
			</Modal.Content>
			</Modal>
		);
	};

	React.useEffect(() => {
		if (modalData.open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [modalData.open]);

	React.useEffect(() => {
		setLoading(false);
	}, [photos]);

	React.useEffect(() => {
		setLoading(true);
		getPhotos();
	}, [photography.photos, pageNumber]);

	const render = (): JSX.Element => {
		if (photography.isLoading) {
			return <Loader />;
		}

		return (
			<>
				{modalData.open && getOverlay()}
				{modalData.open && getModal()}
				<Container id={style.container}>
					<span className={style['gallery-list']}>
						{photos.map((element, index) => {
							if (index + 1 === photos.length) {
								return <Photo lastPhotoRef={lastPhotoRef} photo={element} key={element.id} handlePhotoClick={handlePhotoClick} />;
							} else {
								return <Photo photo={element} key={element.id} handlePhotoClick={handlePhotoClick} />;
							}
						})}
					</span>
				</Container>
			</>
		);
	};

	return render();
};