import * as React from 'react';
import style from './style.css';
import { Container, Header, Icon } from 'semantic-ui-react';
import { RootState } from 'app/store';
import { connect } from 'react-redux';
import { Models } from 'app/models';
import { Loader } from 'app/components';

export namespace _ContactPage {
	export interface Props {
		information?: Models.Information | null;
		isLoading?: boolean;
	}	
}

export const _ContactPage: React.FC<_ContactPage.Props> = ({
	information = null,
	isLoading = true
}: _ContactPage.Props) => {

	if (isLoading || !information) {
		return <Loader />;
	}

	return (
		<Container id={style.container}>
			<span className={style.contact}>
				<Header>
					Contact Me
				</Header>
				<span>
					<p>
           I'm available for freelance projects &nbsp;  
					</p>
					<p className={`${information.isEmployed ? style.linethru : ''}`}>
            and interested in full-time positions.
					</p>
				</span>
				<p>
          Reach out to me using the following contact information:
				</p>
				<span className={style.details}>
					<span>
						<Icon size='huge' name='mail outline'/>
						<div className={style.text}>Email</div>
						<div className={style.text}>{information.email}</div>
					</span>
					<span>
						<Icon size='huge' name='mobile alternate'/>
						<div className={style.text}>Phone</div>
						<div className={style.text}>{information.phone}</div>
					</span>
				</span>
			</span>			
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<_ContactPage.Props, 'information' | 'isLoading'> => {
	return {
		information: state.information.information,
		isLoading: state.information.isLoading
	};
};

const mapDispatchToProps = null;

export const ContactPage: React.FC<_ContactPage.Props> = connect(
	mapStateToProps,
	mapDispatchToProps
)(_ContactPage);