import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Image, Icon } from 'semantic-ui-react';
import { WorkActions } from 'app/store/work/actions';
import { WorkState } from 'app/store/work/state';
import { connect } from 'react-redux';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { Models } from 'app/models';
import { Loader } from 'app/components';
import { cloudinaryUrl, cloudinarySizes } from 'app/constants';

export namespace Work {
	export interface Props {
		work: WorkState;
		actions: WorkActions;
	}	
}

const WorkPage: React.FC<Work.Props> = (props: Work.Props) => {
	const history: History = useHistory();

	React.useEffect(() => {
		if (props.work.works.length === 0) { // <<-- if already fetch don't fetch anymore
			props.actions.getWork();
		}
	}, []);

	const redirect = (work: Models.Work, index: number) => {
		history.push('/work/' + work.id);
	};

	const render = (): JSX.Element => {
		if (props.work.isLoading) {
			return <Loader />;
		}

		return (
			<Container id={style.work} fluid>
				<React.Fragment>
					<Header className={style.header}>WORK</Header>
					<span className={style.description}>A selection of my web development projects</span>
					<span className={style.screenshots}>
						{props.work.works.map((work, index) => (
							<span key={work.id} onClick={() => redirect(work, index)}>
								<picture>
									<Image 
										sizes='(max-width: 800px) 100vw, 800px' 
										src={`${cloudinaryUrl}${cloudinarySizes.sharp_img}${work.url}`}
										// srcSet={`${work.sm} 200w, ${work.md} 400w, ${work.lg} 800w, ${work.xl} 1200w`}
									/>
								</picture>
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
				</React.Fragment>
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