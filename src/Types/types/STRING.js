import { MUTTABLE } from '../utils/type';

class STRING extends MUTTABLE {
	constructor() {
		super();
		this.maximum = null;
		this.minimum = null;
		this.length = { maximum: this.maximum, minimum: this.minimum };
	}

	max(n) {
		return (this.maximum = n);
	}
	min(n) {
		return (this.minimum = n);
	}
}

export default new STRING();
