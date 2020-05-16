import * as React from 'react';
import * as style from './style.css';
import { Icon } from 'semantic-ui-react';

export namespace Footer {
	export interface Props {}
}

export const Footer: React.FC<Footer.Props> = (props: Footer.Props) => { 
	return (
		<footer>
			<div className={style.hosting}>
				<a target='_blank' href='https://github.com/robincanlas'><Icon size='huge' name='github' /></a>
				<a target='_blank' href='https://bitbucket.org/kristofferrobincanlas'><Icon size='huge' name='bitbucket' /></a>
			</div>
			<p>© 2020, Designed and Coded by Kristoffer Robin Canlas</p>
		</footer>
	);
}
