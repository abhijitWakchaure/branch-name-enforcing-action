const core = require('@actions/core');
const github = require('@actions/github');

try {
  const releaseBranchPattern = core.getInput('release-branch-pattern');
  const featureBranchPattern = core.getInput('feature-branch-pattern');
  const maxLength = core.getInput('max-length');

  core.info(`Release branch pattern ${releaseBranchPattern}`);
  core.info(`Feature branch pattern ${featureBranchPattern}`);
  core.info(`Max length ${maxLength}`);

  const eventName = github.context.eventName;
  if (eventName != 'pull_request') {
    core.setFailed(`Invalid event: ${eventName}`);
    return;
  }
  const fromBranch = github.context.payload.pull_request.head.ref
  const toBranch = github.context.payload.pull_request.base.ref

  core.info(`PR fromBranch: ${fromBranch}`);
  core.info(`PR toBranch: ${toBranch}`);

  const releaseBranchRegex = RegExp(releaseBranchPattern);
  const featureBranchRegex = RegExp(featureBranchPattern);

  core.info(`releaseBranchRegex: ${releaseBranchRegex}`);
  core.info(`featureBranchRegex: ${featureBranchRegex}`);

  if (toBranch === 'master' || toBranch === 'main') {
    // fromBranch must match release branch pattern
    if (!releaseBranchRegex.test(fromBranch)) {
      var msg = `Branch name ${fromBranch} does not match release branch pattern. PR's for master/main must come from a release branch`;
      core.setFailed(msg);
      return;
    }
  }

  if (!releaseBranchRegex.test(toBranch)) {
    var msg = `Skipping checks since branch ${toBranch} does not match release branch pattern`;
    core.info(msg);
    return;
  }

  if (!featureBranchRegex.test(fromBranch)) {
    var msg = `Branch name ${fromBranch} does not match feature branch pattern. Make sure your branch name matches the pattern ${featureBranchPattern}`;
    core.setFailed(msg);
    return;
  }

} catch (error) {
  core.setFailed(error.message);
}