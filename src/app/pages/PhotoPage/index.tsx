import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PhotoActions } from 'app/store/photography/actions';
import { PhotoState } from 'app/store/photography/state';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Loader, ProgressiveImage } from 'app/components';

export namespace Photo {
	export interface Props {
		photography: PhotoState;
		photoActions: PhotoActions;
	}
}

const PhotoPage: React.FC<Photo.Props> = (props: Photo.Props) => {
	let limit: number = 20;
	const [count, setCount]: [number, Function] = React.useState(1);

	const getPhotos = (): Models.Photo[] => {
		const photos = [];
		for (let i = 0; i < props.photography.photos.length; i++) {
			if (limit * count === i) {
				break;
			}
			photos.push(props.photography.photos[i]);
		}
		return photos;
	};

	// React.useEffect(() => {
	// 	if (props.photography.photos.length === 0) { // <<-- if already fetch don't fetch anymore
	// 		props.photoActions.getPhotos();
	// 	}
	// }, []);

	const onScroll = () => {
		/* Need to round the value so it can reach the scroll height */
		if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight && (count * limit) <= props.photography.photos.length) {
			const newCount: number = count + 1;
			setCount(newCount);
		}
	};

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll, false);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};	
	}, [props.photography.photos, count]);

	const render = (): JSX.Element => {
		if (props.photography.isLoading) {
			return <Loader />;
		}

		return (
			<Container id={style.container}>
				<span className={style['gallery-list']}>
					{getPhotos().map(element => (
						<span key={element.id}>
							<ProgressiveImage 
								sizes='(max-width: 800px) 100vw, 800px'
								preview={`https://farm2.staticflickr.com/${element.raw}_s.jpg`}
								image={element.src}
								srcSet={`${element.src} 200w,
									${element.src} 400w,
									${element.src} 800w
								`}
							/>
						</span>
					))}
				</span>
			</Container>
		);
	};

	return render();
};

const Photo: React.FC<Photo.Props> = connect(
	(state: RootState, ownProps): Pick<Photo.Props, 'photography'> => {
		return {
			photography: state.photography
		};
	},
	(dispatch: Dispatch): Pick<Photo.Props, 'photoActions'> => ({
		photoActions: bindActionCreators(PhotoActions, dispatch) 
	})
)(PhotoPage);

export { Photo as PhotoPage };