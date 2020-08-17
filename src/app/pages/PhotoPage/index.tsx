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

export namespace _PhotoPage {
	export interface Props {
		photography: PhotoState;
		photoActions: PhotoActions;
	}
}

const _PhotoPage: React.FC<_PhotoPage.Props> = (props: _PhotoPage.Props) => {
	let limit: number = 20;
	const [count, setCount] = React.useState<number>(1);
	const [photos, setPhotos] = React.useState<Models.Photo[]>([]);

	const getPhotos = () => {
		const newPhotos: Models.Photo[] = [];
		for (let i = photos.length; i < props.photography.photos.length; i++) {
			if (limit * count === i) {
				break;
			}
			newPhotos.push(props.photography.photos[i]);
		}
		setPhotos(oldPhotos => oldPhotos.concat(newPhotos));
	};

	const onScroll = () => {
		/* Need to round the value so it can reach the scroll height */
		if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight && (count * limit) <= props.photography.photos.length) {
			const newCount: number = count + 1;
			setCount(newCount);
		}
	};

	React.useEffect(() => {
		getPhotos();
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
					{photos.map(element => (
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