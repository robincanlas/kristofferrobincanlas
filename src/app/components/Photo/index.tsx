import * as React from 'react';
import * as style from './style.css';
import { Models } from 'app/models';
import { ProgressiveImage } from 'app/components';
import { Modal } from 'semantic-ui-react';

export namespace Photo {
	export interface Props {
		photo: Models.Photo;
		lastPhotoRef?: (node: any) => void;
	}

	export interface InitialModalData {
		open: boolean;
		data: Models.Photo | null;
	}
}

const initialModalData: Photo.InitialModalData = {
	open: false,
	data: null
};

export const Photo: React.FC<Photo.Props> = (props: Photo.Props) => {
	const [modalData, setModalData] = React.useState<Photo.InitialModalData>(initialModalData);

	const openModal = (data: Models.Photo) => {
		setModalData({
			open: true,
			data: data
		});
	};

	const getModal = (): JSX.Element => {
		return (
			<Modal
				basic
				size='large'
				centered={true}
				onClose={() => setModalData(initialModalData)}
				open={modalData.open}
				// closeIcon
			>
			<Modal.Content image>
				<div onClick={() => setModalData(initialModalData)} className={style['modal-image']}>
					<ProgressiveImage 
						sizes='(max-width: 800px) 100vw, 800px'
						preview={`${modalData.data!.raw}_s.jpg`}
						image={modalData.data!.src}
						srcSet={`${modalData.data!.src} 200w,
							${modalData.data!.src} 400w,
							${modalData.data!.src} 800w
						`}
					/>
				</div>
			</Modal.Content>
		</Modal>
		);
	};

	return (
		<React.Fragment>
			{modalData.open && getModal()}
			<span ref={props.lastPhotoRef} onClick={() => openModal(props.photo)}>
				<ProgressiveImage 
					sizes='(max-width: 800px) 100vw, 800px'
					preview={`${props.photo.raw}_s.jpg`}
					image={props.photo.src}
					srcSet={`${props.photo.src} 200w,
						${props.photo.src} 400w,
						${props.photo.src} 800w
					`}
				/> 
			</span>
		</React.Fragment>
	);
};