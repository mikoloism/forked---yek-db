class INT_UNSIGNED {
	constructor() {
		this.name = 'unsigned-integer';
	}
}
class INT_SIGNED {
	constructor() {
		this.name = 'signed-integer';
	}
}

class INTEGER {
	constructor() {
		this.UNSIGNED = new INT_UNSIGNED();
		this.SIGNED = new INT_SIGNED();
		this.name = 'integer';
	}
}
export default new INTEGER();
