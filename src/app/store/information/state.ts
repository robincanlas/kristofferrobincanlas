import { Models } from 'app/models';

export const initialState = {
	information: null,
	isLoading: true,
	error: ''
};

export type InformationState = {
	information: Models.Information | null;
	isLoading: boolean;
	error: string;
};