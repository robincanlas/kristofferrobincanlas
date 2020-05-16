import { Models } from 'app/models';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { createAction } from 'redux-actions';
import Axios from 'axios';
import { AnyAction } from 'redux';
import { ActionTypes, endPoint } from 'app/constants';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace PhotoActions {
	export const getPhotos = (): Thunk => {
		const request = createAction(ActionTypes.GET_PHOTOS_REQUEST);
		const success = createAction<Models.Photo[]>(ActionTypes.GET_PHOTOS_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_PHOTOS_FAILED);

		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			Axios.get(endPoint.photos)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type PhotoActions = typeof PhotoActions;