export namespace Models {
	export interface Skill {
		name: string;
		title: string;
	}

	export interface EndPoint {
		photos: string;
		work: string;
		information: string;
	}

	export interface Nav {
		name: string;
		url: string;
	}

	export interface Photo {
		id: number;
		index: number;
		thumbnail: string;
		url: string;
		src: string;
		raw: string;
		original: string;
	}
	
	export interface Work {
		id: string;
		name: string;
		url: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
		sharp_img: string;
		description: string;
		technologies: string[];
		code: string | null;
		site: string | null;
	}

	export interface Description {
		current: Work;
		previous: string | null;
		next: string | null;
	}

	// TO DO: update this for portfolio information and create a DBMS
	export interface Information {
		isEmployed: boolean;
		phone: string;
		email: string;
    availableForFreelance: boolean;
	}
}