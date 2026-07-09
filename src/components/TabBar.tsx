import { TABS, type TabId } from "../data/domains";

type Props = {
  active: TabId;
  onChange: (id: TabId) => void;
  position: "top" | "bottom";
};

/**
 * Domain selector rendered once under the nav (sticky) and once above the
 * footer (static) so switching focus never requires scrolling back up.
 */
export function TabBar({ active, onChange, position }: Props) {
  return (
    <div className={`tabbar tabbar-${position}`}>
      <div className="wrap tabbar-in" role="group" aria-label="Portfolio focus">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn${active === tab.id ? " is-active" : ""}`}
            aria-current={active === tab.id ? "page" : undefined}
            onClick={() => onChange(tab.id)}
          >
            {tab.navLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
