export const FREEBIE_TYPE_FILE = "file";

export const FREEBIE_TYPE_CHOICES = [FREEBIE_TYPE_FILE];

export interface FreebieJson {
	id: string;
	name: string;
	photoUrl: string;
	description: string;
	type: string;
	file: string;
	extension: string;
	customUrl: string;
	updatedAt: any;
}

export class Freebie {

    public static collection = 'freebie'

    constructor(
        public id: string, 
        public name: string, 
        public photoUrl: string, 
        public description: string, 
        public type: string, 
        public file: string, 
        public extension: string, 
        public customUrl: string, 
        public updatedAt: any, 

    ) {}

}
