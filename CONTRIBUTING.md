# Contributing to Bradley Brown Inc Website

Thank you for your interest in contributing to the Bradley Brown Inc website! This document provides guidelines and workflows for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Build Validation](#build-validation)
- [Common Issues](#common-issues)
- [Code Style](#code-style)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bradleybrowninc.git
   cd bradleybrowninc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Git hooks** (automatic after npm install)
   ```bash
   npm run prepare
   ```

4. **Start development server**
   ```bash
   npm run develop
   ```
   Visit http://localhost:8000 to see the site.

## Development Workflow

### Branch Strategy

- `master` - Production branch (protected)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `content/*` - Content updates

### Creating a New Branch

```bash
# For a new feature
git checkout -b feature/feature-name

# For a bug fix
git checkout -b fix/bug-description

# For content updates
git checkout -b content/update-description
```

### Making Changes

1. **Make your changes** in the appropriate files
2. **Test locally**
   ```bash
   npm run develop  # Test in development
   npm run build    # Test production build
   ```
3. **Format your code**
   ```bash
   npm run format
   ```

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add hero section to homepage"
git commit -m "Fix missing image reference in footer.scss"
git commit -m "Update project portfolio with new builds"

# Bad examples
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "wip"
```

## Pull Request Process

### 1. Ensure Your Build Passes

Before creating a PR, validate your changes:

```bash
npm run validate
```

This runs both the build and formatter.

### 2. Push Your Branch

```bash
git push origin your-branch-name
```

### 3. Create Pull Request

1. Go to GitHub and create a new Pull Request
2. Fill out the PR template completely
3. Link any related issues
4. Add screenshots if you made visual changes

### 4. Automated Checks

When you create a PR, the following checks run automatically:

- ✅ **Build Validation** - Ensures Gatsby builds successfully
- ✅ **Image Reference Check** - Verifies all CSS/SCSS image references exist
- ✅ **Code Formatting** - Checks Prettier formatting
- ✅ **Linting** - Runs ESLint (if configured)

### 5. Review Process

- Address any failing checks
- Respond to reviewer feedback
- Make requested changes in new commits
- Once approved, your PR will be merged

## Build Validation

### Pre-Commit Hooks

Git hooks automatically run before commits:

- **Image reference validation** - Ensures all `url()` references in CSS/SCSS exist
- **Code formatting** - Runs Prettier on staged files

### Pre-Push Hooks

Before pushing, the hook runs:

- **Full build test** - Ensures `npm run build` succeeds

### CI/CD Pipeline

GitHub Actions runs on every PR and push to master:

1. **Build validation** - Full production build
2. **Asset verification** - Checks for missing images/files
3. **Format check** - Validates code formatting
4. **Lint check** - Runs linters

## Common Issues

### Build Failure: Missing Image References

**Error:**
```
Can't resolve '../images/filename.jpg'
```

**Solution:**
1. Check that the image exists in `src/images/`
2. Verify the path is correct in your CSS/SCSS file
3. Check for typos in the filename

**Example:**
```scss
/* ❌ Wrong - file doesn't exist */
background-image: url("../images/missing-file.jpg");

/* ✅ Correct - file exists */
background-image: url("../images/hero.jpg");
```

### Pre-Commit Hook Fails

**Error:**
```
❌ Found missing image reference(s)
```

**Solution:**
1. Review the error output to see which files are missing
2. Add the missing files or fix the references
3. Try committing again

### Build Works Locally But Fails in CI

**Possible causes:**
- Case-sensitive file paths (Windows vs Linux)
- Missing files not tracked by Git
- Environment-specific configuration

**Solution:**
1. Check `.gitignore` isn't excluding necessary files
2. Verify all referenced files are committed
3. Test with `NODE_ENV=production npm run build`

## Code Style

### JavaScript/React

- Use functional components with hooks
- Follow existing code patterns in the project
- Use meaningful variable and function names
- Add comments for complex logic

### CSS/SCSS

- Use SCSS for styling
- Follow BEM naming convention where applicable
- Keep selectors specific but not overly nested
- Use variables from theme files

### File Organization

```
src/
├── components/       # Reusable React components
├── pages/           # Gatsby page components
├── templates/       # Page templates (programmatic pages)
├── images/          # All image assets
├── data/            # JSON data files
├── themes/          # SCSS theme files
└── assets/          # SVG icons and other assets
```

### Asset Management

**Images:**
- Place all images in `src/images/`
- Use descriptive filenames (e.g., `hero-background.jpg`, not `img1.jpg`)
- Optimize images before committing
- Prefer WebP for photos, SVG for icons/logos

**Data Files:**
- Store structured data in `src/data/`
- Use JSON format
- Follow existing schema patterns

## Reporting Issues

### Build Failures

Use the **Build Failure** issue template:
1. Include the complete error message
2. Attach build logs
3. List steps to reproduce
4. Note your environment (OS, Node version)

### Bugs

Use the **Bug Report** issue template:
1. Describe the issue clearly
2. Include steps to reproduce
3. Add screenshots if visual
4. Note browser/device information

### Feature Requests

Use the **Feature Request** issue template:
1. Describe the feature
2. Explain the problem it solves
3. Suggest implementation approach

## Getting Help

- **Documentation Issues**: Open an issue with the "documentation" label
- **Setup Problems**: Check the troubleshooting section in README.md
- **Questions**: Open a discussion on GitHub

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Help others when you can
- Follow project guidelines

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to Bradley Brown Inc! 🏗️
