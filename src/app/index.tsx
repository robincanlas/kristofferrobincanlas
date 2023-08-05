import * as React from 'react';
import * as style from './style.css';
import { Route, Switch, useHistory, matchPath, useLocation } from 'react-router-dom';
import { Header, Footer, OverlayNav } from 'app/components';
import { 
	HomePage, 
	PhotoPage, 
	AboutPage, 
	ContactPage, 
	WorkPage, 
	WorkDescriptionPage,
	NotFoundPage } from './pages';
import { History } from 'history';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { WorkActions } from './store/work/actions';
import { PhotoActions } from './store/photography/actions';
import { InformationActions } from './store/information/actions';

export namespace _App {
	export interface Props {
		informationActions?: InformationActions;
		workActions?: WorkActions;
		photoActions?: PhotoActions;
	}
}

export const _App: React.FC<_App.Props> = ({
	informationActions = InformationActions,
	workActions = WorkActions,
	photoActions = PhotoActions
}: _App.Props) => {
	const history: History = useHistory();
	const defaultTitle: string = 'Kristoffer Robin Canlas';
	const [overlayNav, setOverlayNav] = React.useState(false);
  const { pathname } = useLocation();

  const changeTitle = () => {
		const currentPath: string = history.location.pathname.split('/')[1].toUpperCase();
		const title: string = currentPath === '' ? defaultTitle : `${defaultTitle} | ${currentPath}`;
		document.title = title;
	};

	React.useEffect(() => {
		informationActions.get();
		workActions.getWork();
		photoActions.getPhotos();
		changeTitle();
		return history.listen(() => {
			changeTitle();
		});
	}, [history]);

  const isWorkDescriptionPage = !!matchPath(pathname, {
    path: '/work/:id',
    exact: false,
    strict: false
  });

  const isPhotoPage = !!matchPath(pathname, {
    path: '/photography',
    exact: true,
    strict: true
  });

	return (
		<React.Fragment>
			{/* <Cursor /> */}
			<span className={`${style.bg} ${isWorkDescriptionPage || isPhotoPage ? style['lights-off'] : ''}`}></span>
				<OverlayNav overlayNav={overlayNav} toggleOverlay={() => setOverlayNav(!overlayNav)} />
				<span className={style.content}>
					<Header overlayNav={overlayNav} toggleOverLay={() => setOverlayNav(!overlayNav)} />
					<span className={style.body}>
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route path='/about' component={AboutPage} />
							<Route exact path='/work' component={WorkPage} />
							<Route exact path='/work/:id' component={WorkDescriptionPage} />
							<Route path='/photography' component={PhotoPage} />
							<Route path='/contact' component={ContactPage} />
							<Route component={NotFoundPage} />
						</Switch>
					</span>
					<Footer />
			</span>
		</React.Fragment>
	);
};

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch): Pick<_App.Props, 'informationActions' | 'workActions' | 'photoActions'> => ({
	informationActions: bindActionCreators(InformationActions, dispatch),
	workActions: bindActionCreators(WorkActions, dispatch),
	photoActions: bindActionCreators(PhotoActions, dispatch) 
});

export const App: React.FC<_App.Props> = connect(
	mapStateToProps,	
	mapDispatchToProps
)(_App);