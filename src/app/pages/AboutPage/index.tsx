import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Message } from 'semantic-ui-react';
import { skills, svgIcons } from 'app/constants';

export namespace AboutPage {
	export interface Props {}	
}

export const AboutPage: React.FC<AboutPage.Props> = (props: AboutPage.Props) => {
	return (
		<Container id={style.container} fluid>
				<Message className={style.message}>
					<span><Header as='h2'>Hi,</Header></span>
					<p>
						I'm Kristoffer Robin Canlas, a developer based in Quezon City, Philippines. I have almost 6 years of experience as a Web Developer. My passion is coding and learning new technologies.
					</p>
				</Message>
			<span className={style.segment}>
				<Header className={style.title}>Skills</Header>
				<span>
					{skills.map((skill) => (
						<span key={skill.name}>
							{svgIcons[skill.name]}
						</span>
					))}
				</span>
			</span>
		</Container>
	);
};
