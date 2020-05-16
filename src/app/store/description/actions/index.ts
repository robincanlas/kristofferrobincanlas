import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import { Models } from 'app/models';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import Axios from 'axios';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace DescriptionActions {
	export const getDescription = (id: string): Thunk => {
		const request = createAction(ActionTypes.GET_DESCRIPTION_REQUEST);
		const success = createAction<Models.Description>(ActionTypes.GET_DESCRIPTION_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_DESCRIPTION_FAILED);

		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			Axios.get(`${endPoint.work}/${id}`)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type DescriptionActions = typeof DescriptionActions;