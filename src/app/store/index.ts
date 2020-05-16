import { 
	createStore, 
	combineReducers, 
	applyMiddleware, 
	Store } from 'redux';
import thunk from 'redux-thunk';
import { PhotoReducer } from './photography/reducers';
import { PhotoState } from './photography/state';
import { WorkReducer } from './work/reducers';
import { WorkState } from './work/state';
import { DescriptionReducer } from './description/reducers';
import { DescriptionState } from './description/state';

export interface RootState {
	photography: PhotoState;
	work: WorkState;
	description: DescriptionState;
}

export const configureStore = (initialState?: RootState): Store<RootState> => {
	const middleware = applyMiddleware(thunk); // <-- later check if production
	const rootReducer = combineReducers<RootState>({
		photography: PhotoReducer as any,
		work: WorkReducer as any,
		description: DescriptionReducer as any
	});

	const store = createStore(rootReducer, initialState as RootState, middleware);

	return store;
};

export * from './photography/reducers';
export * from './work/reducers';
export * from './description/reducers';

// store.subscribe(() => console.log(store.getState().photography));
// // Dispatch some actions
// store.dispatch(getPhotos());