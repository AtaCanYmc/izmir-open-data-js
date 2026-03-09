import { vi } from "vitest";

export function installMockFetch(options?: { ok?: boolean; status?: number; jsonData?: unknown }) {
  const ok = options?.ok ?? true;
  const status = options?.status ?? 200;
  const jsonData = options?.jsonData ?? { ok: true };

  const json = vi.fn(async () => jsonData);
  const fetchMock = vi.fn(async () => ({ ok, status, json }));

  vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
  return { fetchMock, json };
}

