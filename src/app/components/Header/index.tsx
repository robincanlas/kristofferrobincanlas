import * as React from 'react';
import * as style from './style.css';
import { Menu } from 'semantic-ui-react';
import { navs } from 'app/constants';
import { useEffect, useState } from 'react';
import { useHistory, matchPath, useLocation } from 'react-router-dom';
import { History } from 'history';

export namespace Header {
	export interface Props {
    overlayNav: boolean;
		toggleOverLay: () => void;
	}
}

export const Header: React.FC<Header.Props> = (props: Header.Props) => { 
	const history: History = useHistory();
  const { pathname } = useLocation();
	const openTag: string = '<';
	const closeTag: string = '/>';
	const name: string = ' robin ';
	const [isScrollUp, setScrollUp] = useState(false);
	const [top, setPosition] = useState(true);
	let lastScrollTop = 0;

	const onScroll = () => {
		let st = window.scrollY || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
		if (st === 0) {
			// scroll already at the top 
			setPosition(true);
		} else {
			// scroll not at the top
			setPosition(false);
		}

		if (st > lastScrollTop) {
			// downscroll code
			setScrollUp(true);
		} else {
			// upscroll code
			setScrollUp(false);
		}
		lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll, false);
		
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

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
		<header>
			<Menu id={style.nav} className={`${isScrollUp ? style.unpinned : ''}`} text>
				<span className={`${style.pattern} ${top ? '' : style['show-bg']}`} />
				<span className={`${style.bg} ${top ? '' : style['show-bg']} ${isWorkDescriptionPage || isPhotoPage ? style['lights-off'] : ''}`} />
				<Menu.Item tabIndex={0} className={style.name} onClick={() => history.push('/')} header>
					<span className={style.tag}>{openTag}</span>
					<span>{name}</span>
					<span className={style.tag}>{closeTag}</span>
				</Menu.Item>
				<Menu.Menu className={style.menu} position='right'>
					{navs.map((nav, index) => (
						<Menu.Item
							key={nav.name}
							name={nav.name}
							className={nav.url === pathname ? style.active : ''}
							onClick={() => history.push(nav.url)}
						/>
					))}
				</Menu.Menu>
				<Menu.Item className={style.burger} position='right'>
					<div aria-label={props.overlayNav ? 'close' : 'burger'} tabIndex={0} role='button' aria-expanded={props.overlayNav} onClick={props.toggleOverLay}>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</Menu.Item>
			</Menu>
		</header>

	);
};
