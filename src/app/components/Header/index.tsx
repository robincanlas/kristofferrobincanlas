import * as React from 'react';
import * as style from './style.css';
import { Menu } from 'semantic-ui-react';
import { navs } from 'app/constants';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

export namespace Header {
	export interface Props {
		toggleOverLay: () => void;
	}
}

export const Header: React.FC<Header.Props> = (props: Header.Props) => { 
	const history: History = useHistory();
	const openTag: string = '<';
	const closeTag: string = '/>';
	const name: string = ' robin ';
	const [url, setUrl] = useState('/');
	const [isScrollUp, setScrollUp] = useState(false);
	const [top, setPosition] = useState(true);
	let lastScrollTop = 0;

	const onScroll = () => {
		let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
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
		setUrl(history.location.pathname); // <-- call this on did mount
		const historyUnlisten: Function = history.listen(() => {
			setUrl(history.location.pathname);
		});
		window.addEventListener('scroll', onScroll, false);
		
		return () => {
			historyUnlisten();
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<header>
			<Menu id={style.nav} className={`${isScrollUp ? style.unpinned : ''}`} text>
				<span className={`${style.pattern} ${top ? '' : style['show-bg']}`}></span>
				<span className={`${style.bg} ${top ? '' : style['show-bg']} ${url === '/photography' ? style.photography : ''}`}></span>
				<Menu.Item className={style.name} onClick={() => history.push('/')} header>
					<span className={style.tag}>{openTag}</span>
					<span>{name}</span>
					<span className={style.tag}>{closeTag}</span>
				</Menu.Item>
				<Menu.Menu className={style.menu} position='right'>
					{navs.map((nav) => (
						<Menu.Item
							key={nav.name}
							name={nav.name}
							className={nav.url === url ? style.active : ''}
							onClick={() => history.push(nav.url)}
						/>
					))}
				</Menu.Menu>
				<Menu.Item className={style.burger} position='right'>
					<div onClick={props.toggleOverLay}>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</Menu.Item>
			</Menu>
		</header>

	);
};
