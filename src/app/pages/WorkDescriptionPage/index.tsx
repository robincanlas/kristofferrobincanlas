import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { History } from 'history';
import { Models } from 'app/models';
import { Image, Header, Icon } from 'semantic-ui-react';
import { svgIcons } from 'app/constants';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DescriptionActions } from 'app/store/description/actions';
import { RootState } from 'app/store';
import { Loader } from 'app/components';

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
				return (
					<div id={style.container}>
						<div className={style.nav}>
							<span onClick={() => previousPage(props.description!.previous)}>
								<Icon name='arrow alternate circle left outline' /> 
								{props.description!.previous ? 'Previous Project'	: 'Back to Work Page' }
							</span>
							<span className={style.spacer}></span>
							{props.description!.next &&
								<span onClick={() => nextPage(props.description!.next)}>
									<React.Fragment>
										Next Project 
										<Icon name='arrow alternate circle right outline' />
									</React.Fragment>
								</span>
							}
						</div>
						<article>
							<div className={style.image}>
								<picture>
									<Image 
										sizes='(max-width: 800px) 100vw, 800px' 
										srcSet={`
										${props.description.current.sm} 200w, 
										${props.description.current.md} 400w, 
										${props.description.current.lg} 800w, 
										${props.description.current.xl} 1200w`}
									/>
								</picture>
							</div>
							<Header as='h1' className={style.title}>
								{props.description.current.name}
							</Header>
							<div className={style.description}>
								{props.description.current.description}
							</div>
						</article>
						<div className={style.technologies}>
							<Header as='h2'>
								Built Using
							</Header>
							<div className={style.list}>
								{props.description.current.technologies.map((technology: string) => (
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