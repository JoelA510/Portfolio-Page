import { useCallback, useEffect, useState } from "react";
import { TAB_IDS, type TabId } from "../data/domains";

const STORAGE_KEY = "active-tab";

function isTabId(value: string | null): value is TabId {
  return value !== null && (TAB_IDS as string[]).includes(value);
}

export function useActiveTab(): [TabId, (id: TabId) => void] {
  const [tab, setTab] = useState<TabId>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isTabId(stored)) return stored;
    } catch {
      /* no-op */
    }
    return "home";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, tab);
    } catch {
      /* no-op */
    }
  }, [tab]);

  const select = useCallback((id: TabId) => setTab(id), []);

  return [tab, select];
}
