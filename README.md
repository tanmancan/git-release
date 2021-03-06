# Git Release - Create releases with auto generated release message

Online Demo: [https://git-release.tkarimdesign.com/](https://git-release.tkarimdesign.com/)

## Personal Access Token

You will need a personal access token to authenticate with github. [How to generate token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

## Auto-generate Release Message

Using the `Auto Generate Release Message` field, you can generate release notes based on commit messages. Choose a start and end date, and all commit messages within these date ranges will be used to generate a release message. If no end date is provided, it will use the most recent commit as the end point.

## Run Locally

```
npm install
npm run serve
```

### Pre-fill Form Data

When you are running the app locally, you can provide pre filled values for the form using a dotenv file. For, example, you can pre-fill the `access_token` inside a `.env.development.local` file, so you don't have to re-enter it every time, you refresh the page.

```
VUE_APP_ACCESS_TOKEN=012345abcdef
```

**IMPORTANT:** If you are going to build for production, make sure you remove any sensitive info from your dotenv file, such as the access token. Otherwise webpack will bundle it with your app. For adding variables via for development, use a `.env.development.local` file. See more about how Vue handles environment variables here: https://cli.vuejs.org/guide/mode-and-env.html#modes

### Available Variables

|name|value|
|-|-|
|VUE_APP_OWNER|Owner of the repository.|
|VUE_APP_REPO|Name of the repository|
|VUE_APP_ACCESS_TOKEN|Token you have generated that can be used to authorize access to the GitHub API. Keep this a secret because it can be used to gain unauthorized access to your repository and account. This app does not store the token, and only sends it to Github via an Authorization header.|
|VUE_APP_NAME|The name of the release.|
|VUE_APP_DRAFT|Check to create a draft (unpublished) release, uncheck to create a published one. Default: uncheck|
|VUE_APP_PRERELEASE|Check to identify the release as a prerelease. uncheck to identify the release as a full release. Default: uncheck|
|VUE_APP_TAG_NAME|The name of the tag.|
|VUE_APP_TARGET_COMMITISH|Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository"s default branch (usually master).|
|VUE_APP_BODY|Text describing the contents of the tag/release.|


***
&copy; Tanveer Karim https://www.tkarimdesign.com
