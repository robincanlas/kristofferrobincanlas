export namespace Models {
	export interface Skill {
		name: string;
		title: string;
	}

	export interface EndPoint {
		photos: string;
		work: string;
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
	}
	
	export interface Work {
		id: string;
		name: string;
		url: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
		description: string;
		technologies: string[];
	}

	export interface Description {
		current: Work;
		previous: string | null;
		next: string | null;
	}
}