import * as React from 'react';
import * as style from './style.css';
import { Header } from 'semantic-ui-react';

export const Loader = () => {
	return(
		<React.Fragment>
			<div id={style.container}>
				<div className={style.body}>
					<span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
					<div className={style.base}>
						<span></span>
						<div className={style.face}></div>
					</div>
				</div>
				<div className={style.longfazers}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<Header as='h3'>Loading...</Header>
			</div> 			
		</ React.Fragment>
	);
};