import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';
import { Avatar } from 'app/components';

export namespace HomePage {
	export interface Props {
	}
}

export const HomePage: React.FC<HomePage.Props> = (props: HomePage.Props) => {
	return (
		<Container id={style.container}>
			<span className={style.intro}>
				<span className={style.text}>
					<p>Kristoffer Robin Canlas</p>
					<p>Web Developer</p>
				</span>
				<span aria-hidden='true' className={style.picture}>
					<span>
						<Avatar />
					</span>
				</span>
			</span>
		</Container>
	);
};
