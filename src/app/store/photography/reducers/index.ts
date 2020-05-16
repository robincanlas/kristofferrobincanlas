import { initialState, PhotoState } from '../state';
import { ActionTypes } from 'app/constants';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

type Payload = Models.Photo[] | string;

export const PhotoReducer = handleActions<PhotoState, Payload> (
	{ 
		[ActionTypes.GET_PHOTOS_REQUEST]: (state, action) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_PHOTOS_SUCCESS]: (state, action) => {
			return update(state, {
				isLoading: { $set: false },
				photos: { $set: action.payload as Models.Photo[] }
			});
		},
		[ActionTypes.GET_PHOTOS_FAILED]: (state, action) => {
			return {
				...state,
				isLoading: false,
				error: action.payload as string
			};
		}
	},
	initialState
);