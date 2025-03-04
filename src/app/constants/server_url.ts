import { Models } from 'app/models';

const baseUrl: string = process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://api.kristofferrobincanlas.com';

export const endPoint: Models.EndPoint = {
	photos: `${baseUrl}/photo`,
	work: `${baseUrl}/work`,
	information: `${baseUrl}/information`
};

export const cloudinaryUrl: string = 'https://res.cloudinary.com/speedforce/image/upload/';