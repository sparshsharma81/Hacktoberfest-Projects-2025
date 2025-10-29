## Godseye OSINT Toolkit (MVP)

Godseye is a privacy-respecting, public-data OSINT toolkit. It aggregates open sources like crt.sh (certificate transparency), Wayback Machine, and GitHub to help investigate domains and usernames.

### Features (MVP)
- Domain enrichment: subdomains via crt.sh, historical URLs via Wayback Machine
- Username enrichment: presence checks on popular platforms + GitHub profile summary
- HTTP API (FastAPI) and CLI (Typer)

### Quickstart

1) Python 3.10+

2) Create a virtual environment and install deps
```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: . .venv/Scripts/Activate.ps1
pip install -r requirements.txt
```

3) (Optional) Configure environment variables
Copy `.env.example` to `.env` and add tokens if you have them.

4) Run the CLI
```bash
python -m godseye.cli domain example.com
python -m godseye.cli username torvalds
```

5) Run the API
```bash
uvicorn godseye.api.main:app --reload
# Open: http://127.0.0.1:8000/docs
```

### Environment variables
- `GITHUB_TOKEN` (optional): increases GitHub rate limits for user lookups.

### Notes
- Only public sources are used. Respect rate limits and each source's ToS.
- Results are best-effort and may contain inaccuracies. Always verify critical findings.

### License
MIT


