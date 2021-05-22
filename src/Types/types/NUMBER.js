class NUM_HEX {
	constructor() {
		this.name = 'hex-number';
	}
}
class NUM_BIT {
	constructor() {
		this.name = 'bit-number';
	}
}
class NUM_BINARY {
	constructor() {
		this.name = 'binary-number';
	}
}
class NUM_DECIMAL {
	constructor() {
		this.name = 'decimal-number';
	}
}

class NUMBER {
	constructor() {
		this.name = 'number';
		this.HEX = new NUM_HEX();
		this.BIT = new NUM_BIT();
		this.BINARY = new NUM_BINARY();
		this.DECIMAL = new NUM_DECIMAL();
	}
}

export default new NUMBER();
