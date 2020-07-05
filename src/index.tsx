import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { Provider } from 'react-redux';
import { configureStore } from 'app/store';

import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/image.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'normalize.css';
import './default.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);