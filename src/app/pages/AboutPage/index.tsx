import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Message } from 'semantic-ui-react';
import { skills, svgIcons } from 'app/constants';

export namespace AboutPage {
	export interface Props {}	
}

export const AboutPage: React.FC<AboutPage.Props> = (props: AboutPage.Props) => {
	const firstYear: number = 2014;
	const firstMonth: number = 4; // 0 is January
	const currentDate: Date = new Date();
	const currentMonth: number = currentDate.getMonth();
	const currentYear: number = currentDate.getFullYear();
	const yearsOfExperience: number = currentMonth >= firstMonth ? currentYear - firstYear : currentYear - firstYear - 1 ;

	return (
		<Container id={style.container} fluid>
				<Message className={style.message}>
					<span><Header as='h2'>Hi,</Header></span>
					<p>
						I'm Kristoffer Robin Canlas, a developer based in Quezon City, Philippines. I have almost {yearsOfExperience} years of experience as a Web Developer. My passion is coding and learning new technologies.
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
