import * as React from 'react';
import style from './style.css';
import { Image } from 'semantic-ui-react';

	export interface ProgressiveImageProps {
		sizes: string;
		preview: string;
		image: string;
		srcSet: string;
	}

export const ProgressiveImage = ({
  sizes = '', 
  preview = '', 
  image = '', 
  srcSet = ''}: ProgressiveImageProps) => {
	const [loaded, setLoaded] = React.useState<boolean>(false);

	const imageLoaded = () => {
		if (!loaded) {
			setLoaded(true);
		}
	};

	return (
		<>
			<Image src={preview} className={`${style.preview} ${loaded ? style.hide : ''}`} />
			<picture>
				<Image 
					sizes={sizes}
					src={image} 
					className={`${style.image} ${loaded ? style.show : ''}`} 
					onLoad={imageLoaded}
					srcSet={srcSet}
				/>
			</picture>
		</>
	);
};