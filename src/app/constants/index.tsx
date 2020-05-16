import * as React from 'react';
import { Models } from 'app/models';
import { CreateJS, CSS, HTML5, Javascript, ReactJS, Redux, Typescript, Github, Heroku, SemanticUI, AngularJS, NodeJS } from 'app/components/SVGIcons';

export const assetsPath: string =  '../../assets';
export interface Icon { [key: string]: JSX.Element; }

export const endPoint: Models.EndPoint = {
	photos: 'https://robincanlas-server.herokuapp.com/photos',
	work: 'https://robincanlas-server.herokuapp.com/projects'
};

export const navs: Models.Nav[] = [
	{ name: 'about', url: '/about' },
	{ name: 'work', url: '/work' },
	{ name: 'photography', url: '/photography' },
	{ name: 'contact', url: '/contact' }
];

export const skills: Models.Skill[] = [
	{ name: 'html5', title: 'HTML5' },
	{ name: 'css3', title: 'CSS3' },	
	{ name: 'javascript', title: 'Javascript' },
	{ name: 'typescript', title: 'Typescript' },
	{ name: 'reactjs', title: 'ReactJS' },
	{ name: 'redux', title: 'Redux' },
	{ name: 'createjs', title: 'CreateJS' },
	{ name: 'semanticui', title: 'Semantic UI React' },
	{ name: 'heroku', title: 'Heroku' },
	{ name: 'github', title: 'Github' }
];

export const svgIcons: Icon  = {
	'createjs': <CreateJS />,
	'css3': <CSS />,
	'html5': <HTML5 />,
	'javascript': <Javascript />,
	'reactjs': <ReactJS />,
	'redux': <Redux />,
	'typescript': <Typescript />,
	'github': <Github />,
	'heroku': <Heroku />,
	'semanticui': <SemanticUI />,
	'angularjs': <AngularJS />,
	'nodejs': <NodeJS />
};

export enum ActionTypes {
	GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST',
	GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS',
	GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED',

	GET_WORK_REQUEST = 'GET_WORK_REQUEST',
	GET_WORK_SUCCESS = 'GET_WORK_SUCCESS',
	GET_WORK_FAILED = 'GET_WORK_FAILED',

	GET_DESCRIPTION_REQUEST = 'GET_DESCRIPTION_REQUEST',
	GET_DESCRIPTION_SUCCESS = 'GET_DESCRIPTION_SUCCESS',
	GET_DESCRIPTION_FAILED = 'GET_DESCRIPTION_FAILED'
}