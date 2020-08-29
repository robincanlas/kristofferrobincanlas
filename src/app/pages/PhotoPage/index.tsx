import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PhotoActions } from 'app/store/photography/actions';
import { PhotoState } from 'app/store/photography/state';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Loader, Photo } from 'app/components';

export namespace _PhotoPage {
	export interface Props {
		photography: PhotoState;
		photoActions: PhotoActions;
	}
}

const _PhotoPage: React.FC<_PhotoPage.Props> = (props: _PhotoPage.Props) => {
	let limit: number = 20;
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [photos, setPhotos] = React.useState<Models.Photo[]>([]);
	const [maxPageNumber, setMaxPageNumber] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(true);
	const watcher: React.MutableRefObject<IntersectionObserver | undefined> = React.useRef();	
	
	React.useEffect(() => {
		setMaxPageNumber(Math.round(props.photography.photos.length / limit));
	}, [props.photography.photos]);

	const lastPhotoRef: (node: any) => void = React.useCallback(node => {
		if (loading) return;
		if (watcher.current) {
			watcher.current.disconnect();
		}
		watcher.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && pageNumber !== maxPageNumber) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
				console.log('VISIBLe');
			}
		});
		if (node) {
			watcher.current.observe(node);
		}
	}, [photos, props.photography.photos, pageNumber, maxPageNumber, loading]);

	const getPhotos = () => {
		console.log('get photos');
		const newPhotos: Models.Photo[] = [];
		for (let i = photos.length; i < props.photography.photos.length; i++) {
			if (limit * pageNumber === i) {
				break;
			}
			newPhotos.push(props.photography.photos[i]);
		}
		setPhotos((oldPhotos) => oldPhotos.concat(newPhotos));
	};

	React.useEffect(() => {
		setLoading(false);
	}, [photos]);

	React.useEffect(() => {
		setLoading(true);
		getPhotos();
	}, [props.photography.photos, pageNumber]);

	const render = (): JSX.Element => {
		if (props.photography.isLoading) {
			return <Loader />;
		}

		return (
			<Container id={style.container}>
				<span className={style['gallery-list']}>
					{photos.map((element, index) => {
						if (index + 1 === photos.length) {
							return <Photo lastPhotoRef={lastPhotoRef} photo={element} key={element.id} />;
						} else {
							return <Photo photo={element} key={element.id} />;
						}
					})}
				</span>
			</Container>
		);
	};

	return render();
};

export const PhotoPage: React.FC<_PhotoPage.Props> = connect(
	(state: RootState, ownProps): Pick<_PhotoPage.Props, 'photography'> => {
		return {
			photography: state.photography
		};
	},
	(dispatch: Dispatch): Pick<_PhotoPage.Props, 'photoActions'> => ({
		photoActions: bindActionCreators(PhotoActions, dispatch) 
	})
)(_PhotoPage);