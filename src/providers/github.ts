import { Octokit } from '@octokit/rest';

export function getOctokitClient(): Octokit {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN ?? 'fixture-github-token-placeholder'
  });
}

export async function getRepoMetadata(octokit: Octokit, owner: string, repo: string) {
  const { data } = await octokit.rest.repos.get({
    owner,
    repo
  });
  return data;
}

export async function listRepoPullRequests(octokit: Octokit, owner: string, repo: string) {
  const { data } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: 'open'
  });
  return data;
}

export async function createIssueComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
) {
  const { data } = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body
  });
  return data;
}
