import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Icon } from 'semantic-ui-react';
import { WorkActions } from 'app/store/work/actions';
import { WorkState } from 'app/store/work/state';
import { connect } from 'react-redux';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { Models } from 'app/models';
import { ProgressiveImage, Loader } from 'app/components';
import { cloudinaryUrl, cloudinarySizes } from 'app/constants';

export namespace Work {
	export interface Props {
		work: WorkState;
		actions: WorkActions;
	}	
}

const WorkPage: React.FC<Work.Props> = (props: Work.Props) => {
	const history: History = useHistory();

	// React.useEffect(() => {
		// if (props.work.works.length === 0) { // <<-- if already fetch don't fetch anymore
		// 	props.actions.getWork();
		// }
	// }, []);

	const redirect = (work: Models.Work, index: number) => {
		history.push('/work/' + work.id);
	};

	const render = (): JSX.Element => {
		if (props.work.isLoading) {
			return <Loader />;
		}
		
		return (
			<Container id={style.work} fluid>
				<>
					<Header className={style.header}>WORK</Header>
					<span className={style.description}>A selection of my web development projects</span>
					<span className={style.screenshots}>
						{props.work.works.map((work, index) => (
							<span key={work.id} onClick={() => redirect(work, index)}>
								<div className={style['project-image']}>
									<ProgressiveImage 
										sizes='(max-width: 800px) 100vw, 800px'
										preview={`${cloudinaryUrl}${cloudinarySizes.tiny}${work.url}`}
										image={`${cloudinaryUrl}${cloudinarySizes.sharp_img}${work.url}`}
										srcSet={`${cloudinaryUrl}${cloudinarySizes.sm}${work.url} 200w,
											${cloudinaryUrl}${cloudinarySizes.md}${work.url} 400w,
											${cloudinaryUrl}${cloudinarySizes.lg}${work.url} 800w,
											${cloudinaryUrl}${cloudinarySizes.xl}${work.url} 1200w,
											${cloudinaryUrl}${cloudinarySizes.xxl}${work.url} 1400w,
											${cloudinaryUrl}${cloudinarySizes.xxxl}${work.url} 1600w,
										`}
									/>
								</div>
								<div className={style.info}>
									<span><p>{work.name}</p></span>
								</div>
							</span>
						))}				
						<div className={style.more} onClick={() => history.push('/contact')}>
							<span>
								Contact Me for more of my projects
								<Icon name='arrow circle right' />
							</span>
						</div>
					</span>
				</>
			</Container>
		);
	};

	return render();
};

const Work: React.FC<Work.Props> = connect(
	(state: RootState, ownProps): Pick<Work.Props, 'work'> => {
		return {
			work: state.work
		};
	},
	(dispatch: Dispatch): Pick<Work.Props, 'actions'> => ({
		actions: bindActionCreators(WorkActions, dispatch)
	})
)(WorkPage);

export { Work as WorkPage };