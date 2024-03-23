import * as React from 'react';
import style from './style.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header, Footer, OverlayNav } from 'app/components';
import { 
	HomePage, 
	PhotoPage, 
	AboutPage, 
	ContactPage, 
	WorkPage, 
	WorkDescriptionPage,
	NotFoundPage } from './pages';
import { AnyAction } from 'redux';
import { getWork } from './store/work/actions';
import { getPhotos } from './store/photography/actions';
import { getInformation } from './store/information/actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useLightsOff from './hooks/useLightsOff';

export type AppDispatch = ThunkDispatch<{}, {}, AnyAction>;

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

	const defaultTitle: string = 'Kristoffer Robin Canlas';
	const [overlayNav, setOverlayNav] = React.useState(false);
  const { pathname } = useLocation();
  const lightsOff = useLightsOff();

  const changeTitle = () => {
		const currentPath: string = pathname.split('/')[1].toUpperCase();
		const title: string = currentPath === '' ? defaultTitle : `${defaultTitle} | ${currentPath}`;
		document.title = title;
	};

	React.useEffect(() => {
    dispatch(getInformation())
    dispatch(getWork())
    dispatch(getPhotos())
	}, []);

  React.useEffect(() => {
    changeTitle()
  }, [pathname]);


	return (
		<>
			{/* <Cursor /> */}
			<span className={`${style.bg} ${lightsOff ? style['lights-off'] : ''}`}></span>
				<OverlayNav overlayNav={overlayNav} toggleOverlay={() => setOverlayNav(!overlayNav)} />
				<span className={style.content}>
					<Header overlayNav={overlayNav} toggleOverLay={() => setOverlayNav(!overlayNav)} />
					<span className={style.body}>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/about' element={<AboutPage />} />
							<Route path='/work' element={<WorkPage />} />
							<Route path='work'>
                <Route path=':id' element={<WorkDescriptionPage />} />
              </Route>
							<Route path='/photography' element={<PhotoPage  />} />
							<Route path='/contact' element={<ContactPage />} />
							<Route element={<NotFoundPage />} />
						</Routes>
					</span>
					<Footer />
			</span>
		</>
	);
};

export default App;