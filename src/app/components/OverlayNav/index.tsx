import * as React from 'react';
import * as style from './style.css';
import { Header } from 'semantic-ui-react';
import { navs } from 'app/constants';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

export namespace OverlayNav {
	export interface Props {
		overlayNav: boolean;

		toggleOverlay: () => void;
	}
}

export const OverlayNav: React.FC<OverlayNav.Props> = (props: OverlayNav.Props) => { 
	const [url, setUrl] = useState('/');
	const history: History = useHistory();

	useEffect(() => {
		setUrl(history.location.pathname); // <-- call this on did mount
		const historyUnlisten: Function = history.listen(() => {
			setUrl(history.location.pathname);
		});
		return() => {
			historyUnlisten();
		};
	}, []);

	const changeUrl = (nav: string) => {
		history.push(nav);
		props.toggleOverlay();
	};

	useEffect(() => {
		props.overlayNav ? 
		document.body.style.overflow = 'hidden' :
		document.body.style.overflow = '';
		return() => {
			document.body.style.overflow = '';
		};
	}, [props.overlayNav]);

	return (
		<span id={style.overlay} className={props.overlayNav ? style.open : ''}>
			<span className={style.bg}>
				<span>
					<div aria-label='close' tabIndex={0} role='button' aria-expanded={true} onClick={props.toggleOverlay} className={style.xicon}>
						<div></div>
						<div></div>
					</div>
				</span>
				<span>
					{navs.map(nav => (
						<Header 
							as='h1' 
							key={nav.name}
							onClick={() => changeUrl(`${nav.url}`)}
							className={nav.url === url ? style.active : ''}>
							{nav.name}
						</Header>
					))}
				</span>
			</span>
		</span>
	);
};
