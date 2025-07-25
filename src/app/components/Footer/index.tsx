import * as React from 'react';
import style from './style.css';
import { Icon } from 'semantic-ui-react';

export namespace Footer {
	export interface Props {}
}

export const Footer: React.FC<Footer.Props> = (props: Footer.Props) => { 
	const copyrightYear: string = '2020-2025';
	return (
		<footer id={style.footer}>
			<div className={style.hosting}>
				<a rel='noopener' target='_blank' href='https://github.com/robincanlas'><Icon size='huge' name='github' /></a>
				<a rel='noopener' target='_blank' href='https://bitbucket.org/kristofferrobincanlas'><Icon size='huge' name='bitbucket' /></a>
			</div>
			<p>© {copyrightYear}, Designed {`&`} Coded by Kristoffer Robin Canlas</p>
		</footer>
	);
}
