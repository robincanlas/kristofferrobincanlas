import * as React from 'react';
import style from './style.css';
import { Container, Header, Button, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC<{}> = (props: {}) => {
	const navigate = useNavigate();
  
	return (
		<Container>
			<span id={style.wrapper}>
				<Message warning compact>
					<Message.Header>404 Not Found!</Message.Header>
					<Header className={style.big}>NOT ALL WHO</Header>
					<Header className={style.big}>WANDER ARE LOST</Header>
					<Header>But you're definitely not supposed to be here.</Header>
				</Message>
				<Button onClick={() => navigate('/')} color='black' >Go Home</Button>
			</span>
		</Container>
	);
};
