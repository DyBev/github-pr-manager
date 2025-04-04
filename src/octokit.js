import { Octokit } from '@octokit/core';
import { getPersonalAccessToken } from './secrets.js';

const getInfo = async (owner, repo) => {
	const octokit = new Octokit({ auth: getPersonalAccessToken() });

	const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
		owner,
		repo,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});

	return response;
}

export {
	getInfo
};

