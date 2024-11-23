const sample = require('../samples/sample_pull_request');

const getReviewerEmail = async (z, login) => {
  const response = await z.request({
    url: `https://api.github.com/users/${login}`,
  });
  return response.data.email;
};

const triggerPullRequest = async (z, bundle) => {
  const response = await z.request({
    url: `https://api.github.com/repos/${bundle.inputData.repo}/pulls`,
    params: { state: 'open' },
  });

  const pulls = response.data;

  const pullsWithReviewers = await Promise.all(
    pulls.map(async (pull) => {
      const reviewersResponse = await z.request({
        url: `${pull.url}/requested_reviewers`,
      });
      const reviewers = reviewersResponse.data.users;

      // Fetch emails for reviewers
      const reviewersWithEmails = await Promise.all(
        reviewers.map(async (reviewer) => {
          const email = await getReviewerEmail(z, reviewer.login);
          return { ...reviewer, email };
        })
      );

      pull.reviewers = reviewersWithEmails;
      return pull;
    })
  );

  return pullsWithReviewers;
};

module.exports = {
  key: 'pull_request',
  noun: 'Pull Request',

  display: {
    label: 'New Pull Request',
    description: 'Triggers when a new pull request is created.',
  },

  operation: {
    inputFields: [
      {
        key: 'repo',
        label: 'Repository',
        required: true,
        dynamic: 'repo.full_name.full_name',
      },
    ],
    perform: triggerPullRequest,
    sample: sample,
  },
};