import * as React from 'react';
import * as style from './style.css';
import { Container, Header, Icon } from 'semantic-ui-react';

export namespace ContactPage {
	export interface Props {
	}	
}

export const ContactPage: React.FC<ContactPage.Props> = (props: ContactPage.Props) => {
	const isEmployed: boolean = true;
	// const [isEmployed, setIsEmployed] = React.useState<boolean>(false);

	// React.useEffect(() => {
	// 	setIsEmployed(true);
	// 	return(() => {
	// 		// unmount
	// 	});
	// }, []);

	return (
		<Container id={style.container}>
			<span className={style.contact}>
				<Header>
					Contact Me
				</Header>
				<span>
					<p>
						I'd love to hear from you! I'm currently available for freelance projects &nbsp;
					</p>
					<p className={`${isEmployed ? style.linethru : ''}`}>
						and interested in full-time position.
					</p>
				</span>
				<p>
					Here's how you can reach me: 
				</p>
				<span className={style.details}>
					<span>
						<Icon size='huge' name='mail outline'/>
						<div className={style.text}>Email</div>
						<div className={style.text}>kristofferrobincanlas@gmail.com</div>
					</span>
					<span>
						<Icon size='huge' name='mobile alternate'/>
						<div className={style.text}>Phone</div>
						<div className={style.text}>+63906-4636-752</div>
					</span>
				</span>
			</span>			
		</Container>
	);
};
