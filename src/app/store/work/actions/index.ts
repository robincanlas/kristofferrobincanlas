import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import { Models } from 'app/models';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import Axios from 'axios';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace WorkActions {
	export const getWork = (): Thunk => {
		const request = createAction(ActionTypes.GET_WORK_REQUEST);
		const success = createAction<Models.Work[]>(ActionTypes.GET_WORK_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_WORK_FAILED);

		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			Axios.get(endPoint.work)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type WorkActions = typeof WorkActions;