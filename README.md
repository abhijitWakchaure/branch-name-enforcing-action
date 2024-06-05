# Branch Name Enforcing Action

This action enforces the branch naming conventions using the pattern provided. This action assumes PR's to master/main will only be allowed from a release branch.

## Inputs

### release-branch-pattern (**Required**)

Pattern for release branch name

### feature-branch-pattern (**Required**)

Pattern for feature branch name

### max-length (Optional)

Max length of branch name. Default is 0 which means no limit

## Example usage

```yaml
uses: actions/pr-rules-enforcing-github-action@v1.0.0
with:
  release-branch-pattern: 'release/*'
  feature-branch-pattern: 'feature/*'
```
