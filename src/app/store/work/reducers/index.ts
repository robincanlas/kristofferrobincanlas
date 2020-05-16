import { handleActions } from 'redux-actions';
import { initialState, WorkState } from 'app/store/work/state';
import { Models } from 'app/models';
import { ActionTypes } from 'app/constants';
import update from 'immutability-helper';

type Payload = Models.Work[] | string;

export const WorkReducer = handleActions<WorkState, Payload> (
	{
		[ActionTypes.GET_WORK_REQUEST]: (state, actions) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_WORK_SUCCESS]: (state, actions) => {
			return update(state, {
				isLoading: { $set: false },
				works: { $set: actions.payload as Models.Work[] },
				error: { $set: '' }
			});
		},
		[ActionTypes.GET_WORK_FAILED]: (state, actions) => {
			return {
				...state,
				isLoading: false,
				error: actions.payload as string
			};
		}
	},
	initialState
);