import { handleActions } from 'redux-actions';
import { initialState, InformationState } from 'app/store/information/state';
import { Models } from 'app/models';
import { ActionTypes } from 'app/constants';
import update from 'immutability-helper';

type Payload = Models.Information | string;

export const InformationReducer = handleActions<InformationState, Payload> (
	{
		[ActionTypes.GET_INFORMATION_REQUEST]: (state, actions) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_INFORMATION_SUCCESS]: (state, actions) => {
			return update(state, {
				isLoading: { $set: false },
				information: { $set: actions.payload as Models.Information },
				error: { $set: '' }
			});
		},
		[ActionTypes.GET_INFORMATION_FAILED]: (state, actions) => {
			return {
				...state,
				isLoading: false,
				error: actions.payload as string
			};
		}
	},
	initialState
);