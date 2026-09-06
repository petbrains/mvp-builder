---
name: mvp-builder-init
description: Initialize a project for the MVP Builder pipeline. Copies the scaffold into the current project — project instructions (CLAUDE.md), path-scoped platform rules, and curated permissions. Run once per project after installing the mvp-builder plugin; also handles upgrades and migration from pre-plugin installs.
disable-model-invocation: true
argument-hint: "[web|mobile|all]"
---

# MVP Builder Init

Materializes the plugin's scaffold into the current project. Agents, skills, and MCP servers
already ship with the plugin — this step installs the parts a plugin cannot carry: always-on
project instructions, path-scoped rules, and permission settings.

# Input

`$ARGUMENTS` — rules preset:

| Preset | Rules installed |
|--------|-----------------|
| `web` | frontend.md, backend.md |
| `mobile` | backend.md, mobile.md, ios.md |
| `all` | all four |

If `$ARGUMENTS` is empty, ask in chat: "What platform is this project? (web / mobile / all)"
and wait for the answer. Default to `all` only if the user says they don't care.

# Execution

1. Locate the installer inside the installed plugin. This skill's **base directory** (announced
   when the skill is invoked) is `<plugin-root>/skills/mvp-builder-init`, so the installer is
   two levels up:

```bash
test -f "<this skill's base directory>/../../scripts/install.sh" && echo found
```

2. If found, run it:

```bash
bash "<this skill's base directory>/../../scripts/install.sh" --platform claude --rules [preset] --yes
```

   If NOT found (unexpected plugin layout), fall back to fetching the installer from the
   repository — note this pulls the latest release, which may be newer than the installed
   plugin:

```bash
curl -fsSL https://raw.githubusercontent.com/app-builders-club/mvp-builder/main/scripts/install.sh | bash -s -- --platform claude --rules [preset] --yes
```

The script handles all three scenarios itself:
- **Clean project** — copies scaffold, writes `.mvp-builder-manifest`
- **Upgrade** (manifest present) — overwrites only files the user has not modified;
  modified files are kept and the new version lands alongside as `<file>.new`
- **Legacy install** (pre-plugin `.claude/commands`, `.claude/agents`, or old `CLAUDE.md`
  without a manifest) — backs everything up to `.mvp-builder-backup-<timestamp>/`, removes
  superseded files, then performs a clean install

3. Relay the script's report to the user verbatim — installed files, kept files, `.new`
   files, backup location.

4. If any `<file>.new` files were created, tell the user to diff and merge them manually —
   never merge automatically.

5. Finish with next steps:
   - Restart the session so the new `CLAUDE.md` and rules load
   - Then: `/prd` to define the product (or `/feature` if `ai-docs/PRD.md` already exists)

# Error Handling

- **Installer missing at both locations**: report both paths/URLs tried; the plugin
  installation is likely broken — suggest reinstalling the plugin
- **Non-zero exit**: relay the script's error output verbatim; make no partial fixes
- **User declines migration prompt relayed by script**: stop; nothing was modified
