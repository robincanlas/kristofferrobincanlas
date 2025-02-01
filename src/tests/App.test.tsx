import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from 'app/store';
import { BrowserRouter } from 'react-router';

import App from '../app';

describe('App', () => {
	it('should render the App component', () => {
		const AppComponent: any = render(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
    );
		expect(AppComponent).not.toBeNull();
	});
});