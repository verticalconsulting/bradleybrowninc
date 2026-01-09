---
name: Build Failure
about: Report a build or deployment failure
title: '[BUILD] '
labels: 'build-failure, bug'
assignees: ''
---

## Build Failure Report

### Environment
- **Build Platform**: (e.g., Cloudflare Pages, Local, GitHub Actions)
- **Node Version**: (if known)
- **Branch**: (e.g., master, feature/xyz)
- **Commit SHA**: (if known)

### Error Message
```
<!-- Paste the complete error message here -->
```

### Build Log
```
<!-- Paste relevant portions of the build log -->
```

### Steps to Reproduce
1.
2.
3.

### Expected Behavior
<!-- What should have happened? -->

### Actual Behavior
<!-- What actually happened? -->

### Possible Cause
<!-- If you have any ideas about what might be causing this -->

### Related Files
<!-- List any files that might be related to this issue -->
-
-

### Screenshots
<!-- If applicable, add screenshots to help explain the problem -->

### Additional Context
<!-- Add any other context about the problem here -->

---

## Troubleshooting Checklist
- [ ] Verified all image references exist in `src/images/`
- [ ] Checked for typos in file paths and names
- [ ] Ran `npm run build` locally to reproduce
- [ ] Checked for missing dependencies
- [ ] Reviewed recent commits for changes that might cause this
- [ ] Verified `.gitignore` isn't excluding required files
