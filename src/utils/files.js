import fs from 'fs';

const writeFile = function WriteFileSync(path, data) {
	return fs.writeFileSync(path, data, 'utf8');
};
const readFile = function ReadFileSync(path) {
	return fs.readFileSync(path, 'utf8');
};
const fileExists = function FileExists(path) {
	return fs.existsSync(path);
};

class Files {
	constructor(path) {
		this.path = path;
	}
	read() {
		return readFile(this.path);
	}
	write(data) {
		return writeFile(this.path, data);
	}
	isExists() {
		return fileExists(this.path);
	}
	static read(path) {
		return readFile(path);
	}
	static write(path, data) {
		return writeFile(path, data);
	}
	static isExists(path) {
		return fileExists(path);
	}
}

export { writeFile, readFile, Files };
export default function files(path) {
	return new Files(path);
}
