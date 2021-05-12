import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const [ALGORITHM, SECRET_KEY, RANDOM_BYTES] = [
	'aes-256-ctr',
	'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
	randomBytes(16),
];

const encrypt = function Encrypt(data) {
	const cipher = createCipheriv(ALGORITHM, SECRET_KEY, RANDOM_BYTES);
	const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
	return {
		iv: RANDOM_BYTES.toString('hex'),
		content: encrypted.toString('hex'),
	};
};
const decrypt = function Decrypt(data) {
	const decipher = createDecipheriv(
		ALGORITHM,
		SECRET_KEY,
		Buffer.from(data.iv, 'hex'),
	);
	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(data.content, 'hex')),
		decipher.final(),
	]);
	return decrpyted.toString();
};

class Cryptor {
	constructor({ algorithm = ALGORITHM, secretKey = SECRET_KEY }) {
		this.algorithm = algorithm;
		this.secretKey = secretKey;
	}
	iv(size = 16) {
		return randomBytes(size);
	}
	encrypt(data) {
		this.data = data;
		let iv = this.iv();
		const cipher = createCipheriv(this.algorithm, this.secretKey, iv);
		const encrypted = Buffer.concat([
			cipher.update(this.data),
			cipher.final(),
		]);
		return {
			iv: iv.toString('hex'),
			content: encrypted.toString('hex'),
		};
	}
	decrypt(data) {
		this.data = data;
		const decipher = createDecipheriv(
			this.algorithm,
			this.secretKey,
			Buffer.from(this.data.iv, 'hex'),
		);
		const decrpyted = Buffer.concat([
			decipher.update(Buffer.from(this.data.content, 'hex')),
			decipher.final(),
		]);
		return decrpyted.toString();
	}

	static encrypt(data) {
		return encrypt(data);
	}
	static decrypt(data) {
		return decrypt(data);
	}
}

export { Cryptor, encrypt, decrypt, RANDOM_BYTES };
export default function cryptor(options) {
	return new Cryptor(options);
}
