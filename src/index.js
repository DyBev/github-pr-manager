import { getRepos } from './config.js';
import { getInfo } from './octokit.js';

console.log("hello world");
const repos = getRepos();

if (repos.length == 0) {
	console.error("repos no bueno");
}

let message = "";

for (let i = 0; i < repos.length; i++) {
	const repoOwner = repos[i].owner;
	const targetRepos = repos[i].targets;

	for (let j = 0; j < targetRepos.length; j++) {
		const targetRepo = targetRepos[j];
		const getInfoResponse = await getInfo(repoOwner, targetRepo);
		const pullRequests = getInfoResponse.data;
		let messageAppend = "";
		if (!pullRequests || (Array.isArray(pullRequests) && pullRequests.length == 0)) {
			continue;
		}
		for (let k = 0; k < pullRequests.length; k++) {
			const pullRequest = pullRequests[k];
			if (!pullRequest.draft && !pullRequest.title.toLowerCase().includes('do not merge')) {
				messageAppend = `${message}${`- [${pullRequest.title}](${pullRequest.html_url})`}\n`
			};
		}
		if (messageAppend.length !== 0) {
			message = `${message}\n*${targetRepo}*:\n${messageAppend}`
		}
	}
}

console.log(message)

