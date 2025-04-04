import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const loadSecrets = () => {
	try {
		const secrets = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../secrets.json'), 'utf-8');
		return JSON.parse(secrets) || {};
	} catch(e) {
		return {};
	}
};

const getPersonalAccessToken = () => loadSecrets().personalAccessToken;

export {
	getPersonalAccessToken
}
