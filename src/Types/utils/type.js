class TYPE {
	constructor() {}
}

class MUTTABLE extends TYPE {
	constructor() {
		super();
		this.length = {};
	}

	is(value) {
		return value instanceof MUTTABLE;
	}
}

class IMMUTABLE extends TYPE {
	constructor(structure) {
		super();
		this.structure = structure;
	}

	is(value) {
		return value instanceof IMMUTABLE;
	}
}

export { TYPE, MUTTABLE, IMMUTABLE };
