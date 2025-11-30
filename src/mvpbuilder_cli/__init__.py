import os
import shutil
import tempfile
import zipfile
from pathlib import Path
from typing import Optional

import httpx
import typer
from rich import print as rprint
from rich.console import Console
from rich.prompt import Prompt

__version__ = "0.0.1"

app = typer.Typer(invoke_without_command=True)
console = Console()


@app.callback()
def main_callback(ctx: typer.Context):
    """
    MVP Builder CLI - Initialize a new MVP Builder project.

    This tool helps you set up specification-driven development projects
    with AI assistant integration.
    """
    if ctx.invoked_subcommand is None:
        console.print(banner_text)
        help_text = """[bold]Initialize a new MVP Builder project[/bold]

    This command will:
    1. Let you choose your AI assistant
    2. Download the appropriate template from GitHub
    3. Extract the template to a new project directory or current directory
    4. Set up AI assistant commands

    [bold]Usage:[/bold]
    [cyan]mvpbuilder init <project_name>[/cyan]  - Create a new project
    [cyan]mvpbuilder init .[/cyan]               - Initialize in current directory

    [bold]Examples:[/bold]
    [cyan]mvpbuilder init my_project[/cyan]
    [cyan]mvpbuilder init my_project --github-token=token[/cyan]
    [cyan]mvpbuilder init .[/cyan]

    For more information, run: [cyan]mvpbuilder init --help[/cyan]
    """
    console.print(help_text)


AI_AGENTS = {
    "claude": {
        "name": "Claude",
        "repo_url": "https://github.com/akhmat-s/MVP-Builder-CLI",
        "branch": "main",
        "folder": ".claude"
    }
}

banner_text = """
╔════════════════════════════════════════════════════════════════╗
║                        MVP BUILDER                             ║
║              Specification-Driven Development CLI              ║
╚════════════════════════════════════════════════════════════════╝
"""

def download_github_repo(repo_url: str, branch: str, github_token: Optional[str] = None) -> Path:
    """Download a GitHub repository as a ZIP file."""
    parts = repo_url.rstrip("/").split("/")
    owner = parts[-2]
    repo = parts[-1]

    download_url = f"https://api.github.com/repos/{owner}/{repo}/zipball/{branch}"

    headers = {}
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    console.print(f"[cyan]Downloading template from {repo_url}...[/cyan]")

    try:
        with httpx.Client(follow_redirects=True, timeout=30.0) as client:
            response = client.get(download_url, headers=headers)
            response.raise_for_status()

            temp_dir = Path(tempfile.gettempdir())
            zip_path = temp_dir / f"{repo}_{branch}.zip"

            with open(zip_path, "wb") as f:
                f.write(response.content)

            console.print("[green]OK[/green] Template downloaded successfully")
            return zip_path

    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            console.print("[red]Error:[/red] Repository not found or you don't have access.")
            console.print("[yellow]Tip:[/yellow] If this is a private repository, provide a GitHub token with --github-token")
        else:
            console.print(f"[red]Error:[/red] Failed to download repository: {e}")
        raise typer.Exit(1)
    except Exception as e:
        console.print(f"[red]Error:[/red] {e}")
        raise typer.Exit(1)


def extract_template(zip_path: Path, target_dir: Path, agent_name: str) -> None:
    """Extract the downloaded template to the target directory."""
    console.print(f"[cyan]Extracting template to {target_dir}...[/cyan]")

    try:
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            members = zip_ref.namelist()

            if members:
                root_folder = members[0].split("/")[0]

                for member in members:
                    if member.startswith(root_folder + "/"):
                        target_path = member[len(root_folder) + 1:]

                        if not target_path:
                            continue

                        full_target_path = target_dir / target_path

                        if member.endswith("/"):
                            full_target_path.mkdir(parents=True, exist_ok=True)
                        else:
                            full_target_path.parent.mkdir(parents=True, exist_ok=True)
                            with zip_ref.open(member) as source, open(full_target_path, "wb") as target:
                                target.write(source.read())

        console.print("[green]OK[/green] Template extracted successfully")

        zip_path.unlink()

    except Exception as e:
        console.print(f"[red]Error:[/red] Failed to extract template: {e}")
        raise typer.Exit(1)


def select_ai_agent() -> str:
    """Let user select an AI agent."""
    console.print("\n[bold]Choose your AI assistant:[/bold]")

    agents_list = list(AI_AGENTS.keys())

    if len(agents_list) == 1:
        agent = agents_list[0]
        console.print(f"  1. {AI_AGENTS[agent]['name']}")
        console.print(f"\n[cyan]Selected:[/cyan] {AI_AGENTS[agent]['name']}")
        return agent

    for i, agent_key in enumerate(agents_list, 1):
        console.print(f"  {i}. {AI_AGENTS[agent_key]['name']}")

    choice = Prompt.ask("\nSelect", choices=[str(i) for i in range(1, len(agents_list) + 1)], default="1")
    selected_agent = agents_list[int(choice) - 1]
    console.print(f"[cyan]Selected:[/cyan] {AI_AGENTS[selected_agent]['name']}")

    return selected_agent


def show_completion_message(project_name: str, agent_folder: str) -> None:
    """Show completion message with next steps."""
    is_current_dir = project_name == "."

    console.print("\n[green]OK[/green] [bold]Project initialized successfully![/bold]\n")

    console.print("[yellow]![/yellow]  [bold]Security Notice:[/bold]")
    console.print(f"Some agents may store credentials, auth tokens, or other identifying and private artifacts in the agent folder within your project.")
    console.print(f"Consider adding [cyan]{agent_folder}[/cyan] (or parts of it) to [cyan].gitignore[/cyan] to prevent accidental credential leakage.\n")

    if is_current_dir:
        console.print("[bold]You're already in the project directory![/bold]\n")
    else:
        console.print(f"[bold]Go to the project folder:[/bold] [cyan]cd {project_name}[/cyan]\n")

    console.print("[bold]Start using slash commands with your AI agent:[/bold]")
    console.print("  [cyan]/docs:prd[/cyan] - Create PRD")
    console.print("  [cyan]/docs:clarify[/cyan] - Clarify PRD")
    console.print("  [cyan]/docs:feature[/cyan] - Create features files from PRD\n")


@app.command()
def init(
    project_name: str = typer.Argument(..., help="Name for your new project directory (or use '.' for current directory)"),
    github_token: Optional[str] = typer.Option(None, "--github-token", help="GitHub token to use for API requests (or set GH_TOKEN or GITHUB_TOKEN environment variable)"),
):
    agent_key = select_ai_agent()
    agent_config = AI_AGENTS[agent_key]

    is_current_dir = project_name == "."

    if is_current_dir:
        target_dir = Path.cwd()
        console.print(f"\n[cyan]Target directory:[/cyan] {target_dir} (current directory)")

        if any(target_dir.iterdir()):
            if not typer.confirm("\n! Current directory is not empty. Continue anyway?"):
                console.print("[yellow]Cancelled.[/yellow]")
                raise typer.Exit(0)
    else:
        target_dir = Path.cwd() / project_name
        console.print(f"\n[cyan]Project name:[/cyan] {project_name}")

        if target_dir.exists():
            console.print(f"[red]Error:[/red] Directory '{project_name}' already exists")
            raise typer.Exit(1)

    console.print()
    zip_path = download_github_repo(
        repo_url=agent_config["repo_url"],
        branch=agent_config["branch"],
        github_token=github_token
    )

    if not is_current_dir:
        target_dir.mkdir(parents=True, exist_ok=True)
        console.print(f"[green]OK[/green] Created directory: {project_name}")

    extract_template(zip_path, target_dir, agent_key)

    show_completion_message(project_name, agent_config["folder"])


def main():
    """Main entry point for the CLI."""
    app()


if __name__ == "__main__":
    main()
