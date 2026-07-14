const API_BASE = process.env.TIMEWEB_CLOUD_API_URL || "https://api.timeweb.cloud";
const token = process.env.TIMEWEB_CLOUD_TOKEN;

if (!token) {
  console.error(
    [
      "TIMEWEB_CLOUD_TOKEN is not set.",
      "Create a scoped token in Timeweb Cloud -> API and Terraform, then set it for your user:",
      '[Environment]::SetEnvironmentVariable("TIMEWEB_CLOUD_TOKEN", "paste-token-here", "User")',
      "Restart Codex after setting the variable.",
    ].join("\n"),
  );
  process.exit(1);
}

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    const error = new Error(`${response.status} ${response.statusText}`);
    error.body = body;
    throw error;
  }

  return body;
}

function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      /secret|token|password|access_key/i.test(key) ? "[redacted]" : redact(entry),
    ]),
  );
}

const checks = [
  ["Account", "/api/v1/account/status"],
  ["Finances", "/api/v1/account/finances"],
  ["Projects", "/api/v1/projects"],
  ["App Platform", "/api/v1/apps"],
  ["VCS providers", "/api/v1/vcs-provider"],
  ["S3 buckets", "/api/v1/storages/buckets"],
  ["App tariffs", "/api/v1/presets/apps"],
  ["S3 tariffs", "/api/v1/presets/storages"],
];

let failed = false;

for (const [label, path] of checks) {
  try {
    const result = await request(path);
    console.log(`\n=== ${label} ===`);
    console.log(JSON.stringify(redact(result), null, 2));
  } catch (error) {
    failed = true;
    console.error(`\n=== ${label}: FAILED ===`);
    console.error(error.message);
    if (error.body) console.error(JSON.stringify(redact(error.body), null, 2));
  }
}

if (failed) process.exitCode = 1;
