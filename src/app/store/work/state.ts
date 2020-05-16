import { Models } from 'app/models';

export const initialState = {
	works: [],
	isLoading: true,
	error: ''
};

export type WorkState = {
	works: Models.Work[];
	isLoading: boolean;
	error: string;
};