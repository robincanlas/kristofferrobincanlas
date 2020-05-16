import { Models } from 'app/models';

export const initialState = {
	description: null,
	isLoading: true,
	error: ''
};

export type DescriptionState = {
	description: Models.Description | null;
	isLoading: boolean;
	error: string;
};