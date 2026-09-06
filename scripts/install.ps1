#Requires -Version 5.1
<#
MVP Builder scaffold installer (Windows).

Usage:
  Local:   .\scripts\install.ps1 [-Platform claude|codex] [-Rules web|mobile|all] [-Standalone] [-Yes]
  Remote:  irm https://raw.githubusercontent.com/app-builders-club/mvp-builder/main/scripts/install.ps1 | iex

Same behavior as install.sh: installs the scaffold into the current directory,
detects clean / upgrade / legacy scenarios via .mvp-builder-manifest, keeps
user-modified files (new version written as <file>.new), backs up pre-plugin
installs to .mvp-builder-backup-<timestamp>\.
#>
param(
    [ValidateSet("claude", "codex")] [string]$Platform = "claude",
    [ValidateSet("web", "mobile", "all")] [string]$Rules = "all",
    [switch]$Standalone,
    [switch]$Yes
)
$ErrorActionPreference = "Stop"
$Repo = "app-builders-club/mvp-builder"
$Manifest = ".mvp-builder-manifest"
$RuleFiles = switch ($Rules) {
    "web"    { @("frontend", "backend") }
    "mobile" { @("backend", "mobile", "ios") }
    "all"    { @("frontend", "backend", "mobile", "ios") }
}

Write-Host ""
Write-Host "🚀 MVP Builder installer (platform: $Platform, rules: $Rules)"
Write-Host ""

function Get-Hash($Path) { (Get-FileHash -Algorithm SHA256 -Path $Path).Hash.ToLower() }
function Confirm-Step($Message) {
    if ($Yes) { return $true }
    return ((Read-Host "$Message (y/N)") -match "^[Yy]$")
}

# --- Resolve source: sibling scaffold\ or download ---
$SrcRoot = $null
if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot "..\scaffold"))) {
    $SrcRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
    Write-Host "📦 Source: local ($SrcRoot)"
} else {
    $TempDir = Join-Path ([System.IO.Path]::GetTempPath()) ("mvp-builder-" + [guid]::NewGuid())
    New-Item -ItemType Directory -Path $TempDir | Out-Null
    $Version = "main"
    $Url = "https://github.com/$Repo/archive/refs/heads/main.zip"
    try {
        $Release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -Headers @{ "User-Agent" = "mvp-builder" }
        if ($Release.zipball_url) { $Version = $Release.tag_name; $Url = $Release.zipball_url }
    } catch {}
    Write-Host "📦 Source: download ($Version)"
    $Zip = Join-Path $TempDir "repo.zip"
    Invoke-WebRequest -Uri $Url -OutFile $Zip -Headers @{ "User-Agent" = "mvp-builder" }
    Expand-Archive -Path $Zip -DestinationPath $TempDir
    $SrcRoot = (Get-ChildItem -Path $TempDir -Directory | Select-Object -First 1).FullName
    if (-not (Test-Path (Join-Path $SrcRoot "scaffold"))) { throw "scaffold\ not found in download" }
}

# --- Build install list ---
$Pairs = @()
if ($Platform -eq "claude") {
    $Pairs += @{ Src = "$SrcRoot\scaffold\INSTRUCTIONS.md"; Dst = "CLAUDE.md" }
    $Pairs += @{ Src = "$SrcRoot\scaffold\settings.json"; Dst = ".claude\settings.json" }
    foreach ($r in $RuleFiles) {
        $Pairs += @{ Src = "$SrcRoot\scaffold\rules\$r.md"; Dst = ".claude\rules\$r.md" }
    }
    if ($Standalone) {
        $Pairs += @{ Src = "$SrcRoot\.mcp.json"; Dst = ".mcp.json" }
        foreach ($f in (Get-ChildItem "$SrcRoot\agents" -Filter *.md -File | Sort-Object Name)) {
            $Pairs += @{ Src = $f.FullName; Dst = ".claude\agents\$($f.Name)" }
        }
        foreach ($f in (Get-ChildItem "$SrcRoot\skills" -Recurse -File | Sort-Object FullName)) {
            $Rel = $f.FullName.Substring("$SrcRoot\skills\".Length)
            $Pairs += @{ Src = $f.FullName; Dst = ".claude\skills\$Rel" }
        }
    }
} else {
    if ($Standalone) { Write-Host "ℹ️  -Standalone is Claude-only; on Codex the plugin provides skills and MCP servers" }
    # AGENTS.md = INSTRUCTIONS.md + a Platform Rules section referencing the installed rules
    $AgentsGen = Join-Path ([System.IO.Path]::GetTempPath()) ("mvp-agents-" + [guid]::NewGuid() + ".md")
    Copy-Item "$SrcRoot\scaffold\INSTRUCTIONS.md" $AgentsGen
    $RuleLines = @{
        frontend = '- `*.tsx`, `*.jsx`, `*.css` → read `.codex/rules/frontend.md`'
        backend  = '- `prisma/`, `server/`, `api/`, `*.py` → read `.codex/rules/backend.md`'
        mobile   = '- `*.swift`, `*.kt`, `*.dart` (cross-platform mobile) → read `.codex/rules/mobile.md`'
        ios      = '- `*.swift`, `*.xcodeproj` (iOS specifics) → read `.codex/rules/ios.md`'
    }
    $Block = @("", "## Platform Rules", "",
        'Path-scoped standards live in `.codex/rules/`. Before working with matching files,',
        "read the corresponding rule first:", "")
    foreach ($r in $RuleFiles) { $Block += $RuleLines[$r] }
    Add-Content -Path $AgentsGen -Value $Block
    $Pairs += @{ Src = $AgentsGen; Dst = "AGENTS.md" }
    foreach ($r in $RuleFiles) {
        $Pairs += @{ Src = "$SrcRoot\scaffold\rules\$r.md"; Dst = ".codex\rules\$r.md" }
    }
    foreach ($f in (Get-ChildItem "$SrcRoot\agents" -Filter *.md -File | Sort-Object Name)) {
        $Pairs += @{ Src = $f.FullName; Dst = ".codex\agents\$($f.Name)" }
    }
    foreach ($f in (Get-ChildItem "$SrcRoot\scaffold\codex\agents" -Filter *.toml -File | Sort-Object Name)) {
        $Pairs += @{ Src = $f.FullName; Dst = ".codex\agents\$($f.Name)" }
    }
}

# --- Detect scenario ---
$Scenario = "clean"
if (Test-Path $Manifest) { $Scenario = "upgrade" }
elseif ((Test-Path ".claude\commands") -or (Test-Path ".claude\agents") -or
        ((Test-Path "CLAUDE.md") -and (Select-String -Path "CLAUDE.md" -Pattern "Harness Orchestration" -Quiet))) {
    $Scenario = "legacy"
}
Write-Host "🔍 Scenario: $Scenario"

# --- Legacy: back up and remove pre-plugin install ---
if ($Scenario -eq "legacy") {
    $LegacyItems = @(".claude\commands", ".claude\agents", ".claude\skills", ".claude\rules",
                     ".claude\settings.json", "CLAUDE.md", ".mcp.json") | Where-Object { Test-Path $_ }
    Write-Host ""
    Write-Host "⚠️  Pre-plugin MVP Builder install detected: $($LegacyItems -join ' ')"
    Write-Host "   These will be backed up and replaced. Agents, skills and MCP servers now ship"
    Write-Host "   with the Claude Code plugin (unless -Standalone)."
    if (-not (Confirm-Step "Back up and migrate?")) { Write-Host "Cancelled — nothing modified."; exit 1 }
    $BackupDir = ".mvp-builder-backup-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    foreach ($item in $LegacyItems) {
        $Target = Join-Path $BackupDir $item
        New-Item -ItemType Directory -Path (Split-Path $Target -Parent) -Force | Out-Null
        Move-Item -Path $item -Destination $Target
    }
    Write-Host "   ✓ Backed up to $BackupDir\"
}

# --- Clean scenario: never silently overwrite files we did not install ---
if ($Scenario -eq "clean") {
    $Existing = @($Pairs | Where-Object { Test-Path $_.Dst } | ForEach-Object { $_.Dst })
    if ($Existing.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠️  Existing files would be overwritten: $($Existing -join ' ')"
        if (-not (Confirm-Step "Overwrite?")) { Write-Host "Cancelled — nothing modified."; exit 1 }
    }
}

# --- Install ---
$OldManifest = @{}
if (Test-Path $Manifest) {
    foreach ($line in Get-Content $Manifest) {
        if ($line -match "^([0-9a-f]{64})  (.+)$") { $OldManifest[$Matches[2]] = $Matches[1] }
    }
}
$NewManifest = @()
$Installed = 0; $Kept = 0
foreach ($p in $Pairs) {
    if (-not (Test-Path $p.Src)) { Write-Host "   ⚠ missing in source: $($p.Src)"; continue }
    $Dir = Split-Path $p.Dst -Parent
    if ($Dir) { New-Item -ItemType Directory -Path $Dir -Force | Out-Null }
    $NewHash = Get-Hash $p.Src
    if ((Test-Path $p.Dst) -and ($Scenario -eq "upgrade")) {
        $CurHash = Get-Hash $p.Dst
        $RecHash = $OldManifest[$p.Dst -replace "\\", "/"]
        if ($CurHash -eq $NewHash) {
            # already current
        } elseif ($RecHash -and ($CurHash -eq $RecHash)) {
            Copy-Item $p.Src $p.Dst -Force; Write-Host "   ✓ updated  $($p.Dst)"; $Installed++
        } else {
            Copy-Item $p.Src "$($p.Dst).new" -Force
            Write-Host "   ↷ kept     $($p.Dst) (modified by you — new version: $($p.Dst).new)"
            $Kept++
            # Manifest records what WE installed, never the user's content: keep the old
            # entry so the file still reads as user-modified on the next upgrade. A file
            # we never installed gets no entry at all.
            if ($RecHash) { $NewManifest += "$RecHash  $($p.Dst -replace '\\', '/')" }
            continue
        }
    } else {
        Copy-Item $p.Src $p.Dst -Force; Write-Host "   ✓ $($p.Dst)"; $Installed++
    }
    $NewManifest += "$NewHash  $($p.Dst -replace '\\', '/')"
}
Set-Content -Path $Manifest -Value $NewManifest

Write-Host ""
Write-Host "✅ MVP Builder scaffold installed ($Scenario`: $Installed written, $Kept kept)"
Write-Host ""
if ($Platform -eq "claude") {
    if (-not $Standalone) {
        Write-Host "Requires the mvp-builder plugin (agents, skills, MCP servers):"
        Write-Host "   /plugin marketplace add $Repo"
        Write-Host "   /plugin install mvp-builder@mvp-builder"
        Write-Host ""
    }
    Write-Host "Next steps:"
    Write-Host "   1. Restart the Claude Code session (loads CLAUDE.md and rules)"
    Write-Host "   2. /prd — define your product"
} else {
    Write-Host "Requires the mvp-builder plugin (skills, MCP servers):"
    Write-Host "   codex plugin marketplace add $Repo"
    Write-Host "   codex plugin add mvp-builder@mvp-builder"
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "   1. Enable subagents: multi_agent = true under [features] in ~/.codex/config.toml"
    Write-Host "   2. Restart the Codex session (loads AGENTS.md and .codex/agents/)"
    Write-Host "   3. Kick off with the prd skill: {@prd} (or just ask to create a PRD)"
}
if ($Kept -gt 0) { Write-Host ""; Write-Host "⚠️  $Kept modified file(s) kept — review the *.new versions and merge manually." }
Write-Host ""
