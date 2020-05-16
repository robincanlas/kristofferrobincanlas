import { Models } from 'app/models';

export const initialState = {
	photos: [],
	isLoading: true,
	error: ''
};

export type PhotoState = {
	// fullList: Models.Photo[];
	photos: Models.Photo[];
	isLoading: boolean;
	error: string;
};