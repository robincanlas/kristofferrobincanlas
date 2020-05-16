import * as React from 'react';
import * as style from './style.css';
import { Route, Switch, useHistory } from 'react-router-dom';
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

	return (
		<React.Fragment>
			<span className={`${style.bg} ${history.location.pathname === '/photography' ? style.photography : ''}`}></span>
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