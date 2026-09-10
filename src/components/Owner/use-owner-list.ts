"use client";

import { useEffect, useState } from "react";
import { API, ownerId } from "@/lib/axios";
import type { Meta } from "@/types/projects";

export type OwnerCollection = "projects" | "skills" | "formations" | "badges" | "certifications";

export function ownerListParams(query: Record<string, string>) {
  return { ...Object.fromEntries(Object.entries(query).filter(([, value]) => value !== "")), limit: 10, language: "pt" };
}

export function ownerListFilter(query: Record<string, string>, name: string, value: string) {
  return { ...query, [name]: value, page: "1" };
}

export function useOwnerList<T>(collection: OwnerCollection) {
  const [query, setQuery] = useState<Record<string, string>>({ page: "1", search: "" });
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<Meta>({ page: 1, limit: 10, total: 0, hasNextPage: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [view, setView] = useState<"grid" | "list">("grid");
  const storageKey = `owner:${ownerId}:${collection}:view`;

  useEffect(() => {
    try { setView(localStorage.getItem(storageKey) === "list" ? "list" : "grid"); }
    catch { /* Storage can be unavailable in private browsers. */ }
  }, [storageKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(current => current.search === search.trim() ? current : { ...current, search: search.trim(), page: "1" });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    API.get(`/${collection}/owner/${ownerId}`, {
      params: ownerListParams(query), signal: controller.signal,
    }).then(({ data }) => {
      if (controller.signal.aborted) return;
      const result = data[collection] as T[];
      const pagination = data.meta as Meta;
      if (!pagination || !Array.isArray(result)) throw new Error("Resposta de paginação inválida");
      if (result.length === 0 && Number(query.page) > 1) {
        setQuery(current => ({ ...current, page: String(Math.max(1, Math.ceil(pagination.total / pagination.limit))) }));
        return;
      }
      setItems(result);
      setMeta(pagination);
    }).catch(() => {
      if (!controller.signal.aborted) setError("Não foi possível carregar a lista. Tente novamente.");
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [collection, query, revision]);

  return {
    items, meta, loading, error, query, search, setSearch, view,
    refresh: () => setRevision(value => value + 1),
    filter: (name: string, value: string) => setQuery(current => ownerListFilter(current, name, value)),
    page: (page: number) => setQuery(current => ({ ...current, page: String(page) })),
    changeView: (next: "grid" | "list") => {
      setView(next);
      try { localStorage.setItem(storageKey, next); }
      catch { /* The view still works without persistent storage. */ }
    },
  };
}
