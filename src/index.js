import { getRepos } from './config.js';
import { getInfo } from './octokit.js';

console.log("hello world");
const repos = getRepos();

if (repos.length == 0) {
	console.error("repos no bueno");
}

let openPrs = {};

for (let i = 0; i < repos.length; i++) {
	const repoOwner = repos[i].owner;
	const targetRepos = repos[i].targets;

	for (let j = 0; j < targetRepos.length; j++) {
		const targetRepo = targetRepos[j];
		const getInfoResponse = await getInfo(repoOwner, targetRepo);
		const pullRequests = getInfoResponse.data;
		if (!pullRequests || (Array.isArray(pullRequests) && pullRequests.length == 0)) {
			continue;
		}
		if (!openPrs[targetRepo]) {
			openPrs[targetRepo] = [];
		}
		for (let k = 0; k < pullRequests.length; k++) {
			const pullRequest = pullRequests[k];
			openPrs[targetRepo].push({
				title: pullRequest.title,
				link: pullRequest.html_url
			});
		}
	}
}

const formatSlackMessage = (openPrs) => {
	let message = "";
	const reposWithOpenPrs = Object.keys(openPrs);

	if (reposWithOpenPrs.length == 0) return "There are no open PRs team, go open some!"

	for (let i = 0; i < reposWithOpenPrs.length; i++) {
		const repo = reposWithOpenPrs[i];
		const openPrsInRepo = openPrs[repo];
		message = `${message}\n*${repo}*:\n`
		for (let j = 0; j < openPrsInRepo.length; j++) {
			const prData = openPrsInRepo[j];
			message = `${message}${`- [${prData.title}](${prData.link})`}\n`
		};
	};

	return message;
}

console.log(formatSlackMessage(openPrs))

