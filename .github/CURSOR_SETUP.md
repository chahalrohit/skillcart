# Cursor AI Code Review Integration

This repository is configured with automated code reviews using Cursor AI that run on every pull request and push to main branches.

## Setup Instructions

### 1. GitHub Secrets Configuration

To use advanced Cursor AI features, you'll need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets (if using Cursor API):

   - `CURSOR_API_KEY` (optional): Your Cursor API key if you have one
   - `GITHUB_TOKEN`: Already available by default, used for posting reviews

### 2. Workflow Configuration

The workflow file `.github/workflows/cursor-code-review.yml` is already configured to:

- ✅ Trigger on pull requests to `main`, `develop`, or `master` branches
- ✅ Trigger on pushes to `main`, `develop`, or `master` branches
- ✅ Run linting checks
- ✅ Perform TypeScript type checking
- ✅ Analyze code changes and post review comments
- ✅ Check for common code quality issues

### 3. Cursor CLI Configuration

The `.cursor/cli.json` file configures:

- Permissions for what Cursor can do during reviews
- Review settings and exclusions
- File size limits

### 4. What Gets Reviewed

The workflow automatically reviews:

- All TypeScript files (`.ts`, `.tsx`)
- All JavaScript files (`.js`, `.jsx`)
- Code quality issues
- TypeScript type errors
- Linting errors
- Common code smells (console.log, TODO comments, etc.)

### 5. Review Process

When you create a pull request:

1. The workflow automatically triggers
2. It checks out your code
3. Runs linting and type checking
4. Analyzes the changed files
5. Posts a detailed review comment on the PR
6. Provides suggestions for improvements

## Customization

### Modify Review Checks

Edit `.github/workflows/cursor-code-review.yml` to:

- Add custom code analysis rules
- Change which files are reviewed
- Modify review triggers
- Add additional checks

### Modify Cursor Permissions

Edit `.cursor/cli.json` to:

- Change allowed/denied operations
- Adjust review settings
- Modify file exclusions

## Troubleshooting

### Workflow Not Running

1. Check that the workflow file is in `.github/workflows/`
2. Verify the branch name matches your main branch
3. Check GitHub Actions tab for error messages

### Reviews Not Posting

1. Ensure `GITHUB_TOKEN` has write permissions
2. Check that the PR is targeting the correct branch
3. Verify the workflow completed successfully

### Missing Reviews for Some Files

1. Check `.cursor/cli.json` exclude patterns
2. Verify file extensions are included in the workflow
3. Check file size limits

## Next Steps

1. Create a test pull request to verify the integration works
2. Review the automated comments and adjust rules as needed
3. Share feedback with your team about the review process

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cursor Documentation](https://docs.cursor.com)
