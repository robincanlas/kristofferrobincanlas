import * as React from 'react';
import { Models } from 'app/models';
import { ProgressiveImage } from 'app/components';

export namespace Photo {
	export interface Props {
		photo: Models.Photo;
		lastPhotoRef?: (node: any) => void;
		handlePhotoClick: (photo: Models.Photo) => void;
	}
}

export const Photo: React.FC<Photo.Props> = (props: Photo.Props) => {

	const openModal = (data: Models.Photo) => {
		props.handlePhotoClick(data);
	};

	return (
		<>
			<span className='ttttt' ref={props.lastPhotoRef} onClick={() => openModal(props.photo)}>
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
		</>
	);
};