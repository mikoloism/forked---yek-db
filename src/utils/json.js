import fs from 'fs';

class Json {
	constructor(path) {
		this.path = this.file(path);
		let _json = this.read(path);
		this.json = this.parse(_json);
	}
	file(path) {
		let regex = /\.json$/i;
		let _path = regex.test(path) ? path : path.concat('.json');
		return _path;
	}
	parse(string_data) {
		return JSON.parse(string_data);
	}
	stringify(json_data) {
		return JSON.stringify(json_data);
	}

	read(path) {
		let _path = this.path;
		if (path) _path = this.file(path);
		let raw = fs.readFileSync(_path, 'utf8');
		this.raw = raw;
		return this;
	}
	write(data, path) {
		let _path = this.path;
		if (path) _path = this.file(path);
		let _json = _.isString(data)
			? this.stringify(this.parse(data))
			: this.stringify(data);
		fs.writeFileSync(_path, _json, 'utf8');
	}
	insert(key, value) {
		let json = { ...this.json, [key]: value };
		this.write(json, this.path);
		return this;
	}
	// remove(parent, key) {}
}

export { Json };
export default function json(path) {
	return new Json(path);
}
