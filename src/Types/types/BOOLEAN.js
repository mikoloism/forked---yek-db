class BOOLEAN {
	constructor() {
		this.name = 'boolean';
		this.allows = [
			[true, false],
			[1, 0],
			['', undefined],
		];
	}
}

export default new BOOLEAN();
