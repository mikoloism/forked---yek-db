class ENUM {
	constructor(items) {
		this.name = 'enum';
		this.extends = 'array';
	}
}

export default (...items) => new ENUM(items);
