import { handleActions } from 'redux-actions';
import { initialState, DescriptionState } from 'app/store/description/state';
import { Models } from 'app/models';
import { ActionTypes } from 'app/constants';

type Payload = Models.Description | string;

export const DescriptionReducer = handleActions<DescriptionState, Payload> (
	{
		[ActionTypes.GET_DESCRIPTION_REQUEST]: (state, actions) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_DESCRIPTION_SUCCESS]: (state, actions) => {
			return {
				...state,
				description: actions.payload as Models.Description,
				isLoading: false
			};
		},
		[ActionTypes.GET_DESCRIPTION_FAILED]: (state, actions) => {
			return {
				...state,
				isLoading: false,
				error: actions.payload as string
			};
		}
	},
	initialState
);