import { Octokit } from '@octokit/core';

const getInfo = async () => {
	const octokit = new Octokit({ auth: 'personal-access-token' });

	const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
		owner: 'dybev',
		repo: 'github-pr-manager',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});

	console.log(response);
}

export {
	getInfo
};

