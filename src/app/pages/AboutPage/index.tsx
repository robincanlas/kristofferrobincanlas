import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Message } from 'semantic-ui-react';
import { skills, svgIcons } from 'app/constants';

export namespace AboutPage {
  export interface Props { }
}

export const AboutPage: React.FC<AboutPage.Props> = (props: AboutPage.Props) => {
  const firstYear: number = 2014;
  const firstMonth: number = 4; // 0 is January
  const currentDate: Date = new Date();
  const currentMonth: number = currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();
  const yearsOfExperience: number = currentMonth >= firstMonth ? currentYear - firstYear : currentYear - firstYear - 1;

  return (
    <Container id={style.container} fluid>
      <Message className={style.message}>
        <span><Header as='h2'>Hey there!</Header></span>
        <p>
          I am Kristoffer Robin Canlas, a software engineer from Quezon City, Philippines, with nearly {yearsOfExperience} years of experience in web development. Coding is my passion, and I am constantly eager to explore new technologies and enhance my skills.
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
