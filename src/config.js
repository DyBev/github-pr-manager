import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const loadConfig = () => {
	try {
		const secrets = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../config.json'), 'utf-8');
		return JSON.parse(secrets) || {};
	} catch(e) {
		return {};
	}
};

const getRepos = () => loadConfig().repos;

export {
	getRepos
}
