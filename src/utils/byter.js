import { encrypt, decrypt } from './cryptor';

const bEncode = function ByterEncoder(data) {
	let encrypted = JSON.stringify(encrypt(JSON.stringify(data)));
	let buff = Buffer.from(encrypted);
	let uint = Uint8Array.from(buff).toString();
	let encoded = JSON.stringify(encrypt(uint));
	let value = Buffer.from(encoded, 'binary').toString('base64');
	return value;
};
const bDecode = function ByterDecoder(data) {
	let binary = Buffer.from(data, 'base64').toString('binary');
	let decoded = JSON.parse(binary);
	let decrypted = decrypt(decoded);
	let array = decrypted.split(',').map((item) => parseInt(item));
	let uint = Uint8Array.from(array);
	let buff = JSON.parse(Buffer.from(uint).toString());
	let deep = decrypt(buff);
	let value = JSON.parse(deep);
	return value;
};

class Byter {
	constructor(data) {
		this.data = data;
		this.encoded = bEncode(this.data);
		this.decoded = bDecode(this.encoded);
	}
	encode(data = undefined) {
		if (data) this.data = data;
		this.encoded = bEncode(this.data);
		return this.encoded;
	}
	decode(data = undefined) {
		if (data) this.data = data;
		this.decoded = bDecode(this.data);
		return this.decoded;
	}
	static encode(data) {
		return bEncode(data);
	}
	static decode(data) {
		return bDecode(data);
	}
}

export { bEncode, bDecode, Byter };
export default function byter(data) {
	return new Byter(data);
}
