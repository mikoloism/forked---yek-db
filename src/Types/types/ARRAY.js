import { IMMUTABLE } from '../utils/type';

class ARRAY extends IMMUTABLE {
	constructor() {
		super();
		this.name = 'array';
	}

	item(index) {
		return index;
	}
}

export default new ARRAY();
