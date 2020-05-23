import * as React from 'react';
import * as style from './style.css';
import { Route, Switch, useHistory, matchPath } from 'react-router-dom';
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

export const App: React.FC = () => {
	const history: History = useHistory();
	const defaultTitle: string = 'Kristoffer Robin Canlas';
	const [overlayNav, setOverlayNav] = React.useState(false);
	
	const changeTitle = () => {
		const currentPath: string = history.location.pathname.split('/')[1].toUpperCase();
		const title: string = currentPath === '' ? defaultTitle : `${defaultTitle} | ${currentPath}`;
		document.title = title;
		// document.body.style.backgroundImage = currentPath === 'PROJECTS' ? 'none' : 'var(--background-image)';
	};

	React.useEffect(() => {
		changeTitle();
		return history.listen(() => {
			changeTitle();
		});
	}, [history]);

	const isWorkDescriptionPage = !!matchPath(
		history.location.pathname, 
		'/work/:id'
	);

	const isPhotoPage = !!matchPath(
		history.location.pathname, 
		'/photography'
	);

	return (
		<React.Fragment>
			<span className={`${style.bg} ${isWorkDescriptionPage || isPhotoPage ? style['lights-off'] : ''}`}></span>
				<OverlayNav overlayNav={overlayNav} toggleOverlay={() => setOverlayNav(!overlayNav)} />
				<span className={style.content}>
					<Header toggleOverLay={() => setOverlayNav(!overlayNav)} />
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