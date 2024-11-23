# GitHub Zapier Integration

This project is a custom GitHub app for the Zapier platform. It provides triggers and actions to interact with GitHub repositories, issues, and pull requests.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)

## Installation

To install the dependencies, run:
```sh
npm install
```
## Configuration
Create a .env file in the root directory and populate it with the necessary configuration:
```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```
You can use ```zapier env:set <version> key=value``` command to set environmental variables.

## Usage
This app provides the following triggers and actions:

### Triggers
* **New Issue:** Triggers when a new issue is created.

  * File: ```triggers/issue.js```
  * Sample: ```samples/sample_issue.js```
* **New Pull Request:** Triggers when a new pull request is created.

  * File: ```triggers/pull_request.js```
  * Sample: ```samples/sample_pull_request.js```
* **Get Repo:** Populates the dropdown list of repos in the UI.(Hidden)

  * File: ```triggers/repo.js```
  * Sample: ```samples/sample_repo_list.js```

### Actions
* **Create Issue:** Creates a new issue in a repository.
  * File: ```creates/issue.js```
  * Sample: ```samples/sample_issue.js```

## Testing
To run the tests, use the following command:
```sh
zapier test
```
