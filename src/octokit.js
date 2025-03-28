import { Octokit } from '@octokit/core';

const getInfo = async () => {
	const octokit = await Octokit({ auth: 'personal-access-token' });

	const response = octokit.request('GET /repos/{owner}/{repo}/pulls', {
		owner: 'dybev',
		repo: 'github-pr-manager',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});

	console.log(response);
}

export default {
	getInfo
};

