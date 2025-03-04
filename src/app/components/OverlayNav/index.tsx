import * as React from 'react';
import style from './style.css';
import { Header } from 'semantic-ui-react';
import { navs } from 'app/constants';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export namespace OverlayNav {
	export interface Props {
		overlayNav: boolean;

		toggleOverlay: () => void;
	}
}

export const OverlayNav: React.FC<OverlayNav.Props> = (props: OverlayNav.Props) => { 
	const navigate = useNavigate();
  const { pathname: url } = useLocation();

	const changeUrl = (nav: string) => {
		navigate(nav);
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
