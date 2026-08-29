interface GithubRepoRef {
  owner: string;
  repo: string;
}

/**
 * Extracts {owner, repo} from a GitHub URL (repo root, or any sub-path).
 * Returns null for non-GitHub URLs or malformed input.
 */
export function parseGithubRepo(url?: string | null): GithubRepoRef | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

/**
 * Fetches the repo's last push timestamp. Never throws — a failed/rate-limited
 * lookup falls back to null so the caller can keep using the project's own
 * manual lastUpdate field instead.
 */
export async function getRepoLastPush(owner: string, repo: string): Promise<Date | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { pushed_at?: string };
    return data.pushed_at ? new Date(data.pushed_at) : null;
  } catch (error) {
    console.error(`Error fetching GitHub push date for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Picks whichever of a project's frontend/backend links is a GitHub repo
 * and resolves its last push date. Null when neither link is a GitHub URL,
 * or the lookup fails.
 */
export async function getProjectGithubLastPush(links?: {
  frontend?: { url?: string };
  backend?: { url?: string };
}): Promise<Date | null> {
  const frontendRef = parseGithubRepo(links?.frontend?.url);
  if (frontendRef) {
    const lastPush = await getRepoLastPush(frontendRef.owner, frontendRef.repo);
    if (lastPush) return lastPush;
  }

  // Frontend link either wasn't a GitHub URL or its lookup failed (private,
  // deleted, renamed, rate-limited) — try backend before giving up.
  const backendRef = parseGithubRepo(links?.backend?.url);
  if (backendRef) return getRepoLastPush(backendRef.owner, backendRef.repo);

  return null;
}
