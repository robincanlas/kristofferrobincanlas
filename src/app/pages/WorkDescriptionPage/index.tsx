import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { History } from 'history';
import { Models } from 'app/models';
import { Header, Icon } from 'semantic-ui-react';
import { svgIcons, cloudinaryUrl, cloudinarySizes } from 'app/constants';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DescriptionActions } from 'app/store/description/actions';
import { RootState } from 'app/store';
import { Loader, ProgressiveImage } from 'app/components';

export namespace DescriptionComponent {
	export interface Props extends RouteComponentProps {
		description: Models.Description | null;
		isLoading: boolean;
		actions: DescriptionActions;
	}

	export interface Params {
		id: string;
	}

	export interface State {
		index: number;
		work: Models.Work | null;
	}
}

const DescriptionComponent: React.FC<DescriptionComponent.Props> = (props: DescriptionComponent.Props) => {
	const history: History = useHistory();
	const { id } = useParams<DescriptionComponent.Params>();

	React.useEffect(() => {
		props.actions.getDescription(id);
	}, [id]);

	const previousPage = (prevId: string | null) => {
		if (prevId) {
			history.push(prevId);
		} else {
			history.push('/work');
		}
	};

	const nextPage = (nextId: string | null) => {
		if (nextId) {
			history.push(nextId);
		}
	};
	
	const render = (): JSX.Element => {
		if (props.isLoading) {
			return <Loader />;
		} else {
			if (props.description && props.description.current) {
				const { current }: Models.Description = props.description;
				return (
					<div id={style.container}>
						<div className={style.nav}>
							<span onClick={() => previousPage(props.description!.previous)}>
								<Icon size='large' name='angle double left' /> 
								{props.description!.previous ? 'Previous Project'	: 'Back to Work Page' }
							</span>
							<span className={style.spacer}></span>
							{props.description!.next &&
								<span onClick={() => nextPage(props.description!.next)}>
									<React.Fragment>
										Next Project 
										<Icon size='large' name='angle double right' />
									</React.Fragment>
								</span>
							}
						</div>
						<article>
							<div className={style.image}>
								<ProgressiveImage 
										sizes='(max-width: 800px) 100vw, 800px'
										preview={`${cloudinaryUrl}${cloudinarySizes.tiny}${current.url}`}
										image={`${cloudinaryUrl}${cloudinarySizes.sharp_img}${current.url}`}
										srcSet={`${cloudinaryUrl}${cloudinarySizes.sm}${current.url} 200w,
											${cloudinaryUrl}${cloudinarySizes.md}${current.url} 400w,
											${cloudinaryUrl}${cloudinarySizes.lg}${current.url} 800w,
											${cloudinaryUrl}${cloudinarySizes.xl}${current.url} 1200w,
											${cloudinaryUrl}${cloudinarySizes.xxl}${current.url} 1400w,
											${cloudinaryUrl}${cloudinarySizes.xxxl}${current.url} 1600w,
										`}
									/>
								{/* <Image 
									sizes='(max-width: 800px) 100vw, 800px' 
									src={`${cloudinaryUrl}${cloudinarySizes.sharp_img}${props.description.current.url}`}
									srcSet={`
									${props.description.current.sm} 200w, 
									${props.description.current.md} 400w, 
									${props.description.current.lg} 800w, 
									${props.description.current.xl} 1200w`}
								/> */}
							</div>
							{current.code && current.site ? 
								<div className={style.buttons}>
									<a href={current.site} target='_blank' rel='noopener'>
										<Icon size='large' name='eye' />
										visit site
									</a>
									<a href={current.code} target='_blank' rel='noopener'>
										<Icon size='large' name='code' />
										view code
									</a>
								</div> :
								null
							}
							<Header as='h1' className={style.title}>
								{current.name}
							</Header>
							<div className={style.description}>
								{current.description}
							</div>
						</article>
						<div className={style.technologies}>
							<Header as='h2'>
								Built Using
							</Header>
							<div className={style.list}>
								{current.technologies.map((technology: string) => (
									<span key={technology}>
										{svgIcons[technology]}
									</span>
								))}
							</div>
						</div>
					</div>
				);
			} else {
				return <span>404 Not Found</span>;
			}
		}
	};

	return render();
};

const mapStateToProps = (state: RootState): Pick<DescriptionComponent.Props, 'description' | 'isLoading'> => {
	return {
		description: state.description.description,
		isLoading: state.description.isLoading
	};
};

const mapDispatchToProps =	(dispatch: Dispatch): Pick<DescriptionComponent.Props, 'actions'> => ({
	actions: bindActionCreators(DescriptionActions, dispatch)
});

const WorkConnect = connect(mapStateToProps, mapDispatchToProps)(DescriptionComponent);
export { WorkConnect as WorkDescriptionPage };