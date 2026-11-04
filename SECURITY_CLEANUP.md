# Flagweb malware cleanup

## Confirmed infection

- `vite.config.js` contained an obfuscated injected JavaScript loader.
- `.vscode/tasks.json` contained a hidden `folderOpen` task that attempted to execute a fake font using Node.js.
- `src/app/public/fonts/fa-solid-900.woff2` was JavaScript, not a font, and matched a previously confirmed malicious payload.
- `.vscode/settings.json` enabled automatic tasks.

## Fixes

- Restored a minimal, valid Vite React configuration.
- Deleted the malicious fake font and execution task.
- Disabled automatic VS Code tasks and removed the in-settings folder-open task.
- Added `scripts/check-malware.py` and a pre-install GitHub Actions security scan.
- Added local environment ignore rules.

## Next actions

1. Keep endpoint protection enabled and investigate local machines that previously opened or built the infected repository.
2. Rotate credentials potentially accessible to the loader.
3. Check older Git commits, forks, cached deployments and clones; this commit does not erase Git history.
4. Confirm the GitHub Actions scan, and test the application from a clean environment.

The check looks for known campaign indicators, not all possible malware.
