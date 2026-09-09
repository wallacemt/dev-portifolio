import { test, expect, mock } from "bun:test";

const requests = [];
mock.module("@/lib/axios", () => ({
  ownerId: "test-owner",
  setupAuth: () => {},
  API: { get: async (url, config) => {
    requests.push({ url, params: config.params });
    const page = config.params.page;
    return { data: { projects: [{ id: `project-${page}` }], texts: {}, meta: { page, limit: 100, total: 3, hasNextPage: page < 3 } } };
  } },
}));
const { getAllProjects } = await import("../src/services/projects");
const { ownerListParams, ownerListFilter } = await import("../src/components/Owner/use-owner-list");
const { StackType } = await import("../src/types/skills");

test("complete project collection follows hasNextPage", async () => {
  const result = await getAllProjects();
  expect(result.projects.map(p => p.id)).toEqual(["project-1", "project-2", "project-3"]);
  expect(requests.map(r => r.params.page)).toEqual([1, 2, 3]);
});

test("filters reset page and Todos omits invalid empty parameters", () => {
  const filtered = ownerListFilter({ page: "3", stack: "desktop" }, "stack", "");
  expect(ownerListParams(filtered)).toEqual({ page: "1", limit: 10, language: "pt" });
  expect(ownerListParams(ownerListFilter({ page: "3" }, "activate", "false"))).toEqual({ page: "1", activate: "false", limit: 10, language: "pt" });
  expect(ownerListParams({ page: "2", search: "Rust & Tauri", orderBy: "asc" }).search).toBe("Rust & Tauri");
  expect(StackType.Desktop).toBe("desktop");
});
