import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import { Models } from 'app/models';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export const getInformation = (): Thunk => {
  const request = createAction(ActionTypes.GET_INFORMATION_REQUEST);
  const success = createAction<Models.Information>(ActionTypes.GET_INFORMATION_SUCCESS);
  const failure = createAction<any>(ActionTypes.GET_INFORMATION_FAILED);

  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(request());
    axios.get(endPoint.information)
      .then((response: AxiosResponse<Models.Information>) => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error.data));
      });
  };
};