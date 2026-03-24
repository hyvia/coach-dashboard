import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Clock,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import hvyiaLogo from "@/assets/hyvia_logo.svg";

const navSections = [
  {
    label: "Main",
    items: [
      { to: "/" as const, icon: LayoutDashboard, label: "Dashboard", exact: true },
      { to: "/players" as const, icon: Users, label: "Players", exact: false },
    ],
  },
  {
    label: "Activities",
    items: [
      { to: "/trainings" as const, icon: Clock, label: "Trainings", exact: false },
      { to: "/matches" as const, icon: Trophy, label: "Matches", exact: false },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/settings" as const, icon: Settings, label: "Settings", exact: false },
    ],
  },
];

const navItemBase =
  "group flex items-center gap-3.5 h-11 rounded-sm border-l-3 text-[14px] transition-colors w-[248px]";
const navItemActive =
  "bg-surface-light border-l-primary pl-6 pr-3.5 text-primary font-semibold";
const navItemInactive =
  "border-l-transparent pl-[17px] pr-3.5 text-muted font-medium hover:text-foreground hover:bg-surface-light/50";

export const Sidebar = () => {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const clubName = user?.clubName || "FC Partizan U19";

  return (
    <nav className="flex flex-col bg-surface h-screen sticky top-0 w-[280px] overflow-hidden">
      {/* Header — gradient with club identity */}
      <div
        className="shrink-0 border-b border-border px-6 pt-7 pb-6"
        style={{
          backgroundImage:
            "linear-gradient(140deg, rgba(224, 120, 0, 0.15) 0%, rgba(224, 120, 0, 0.05) 100%)",
        }}
      >
        <img src={hvyiaLogo} alt="Hyvia" className="w-[60px] mb-5" />

        <div className="flex flex-col items-center gap-3">
          {/* Club crest placeholder */}
          <div className="size-16 rounded-full border-2 border-primary bg-primary-20 flex items-center justify-center">
            <span className="font-heading text-[22px] font-bold text-primary">
              {clubName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[15px] font-semibold text-foreground text-center">
              {clubName}
            </span>
            <span className="text-[12px] font-medium text-primary bg-primary-10 px-3 py-0.5 rounded-full">
              Youth Academy
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pl-4 pt-5">
        {navSections.map((section) => (
          <div key={section.label} className="mb-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary">
              {section.label}
            </div>

            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className={navItemBase}
                  activeProps={{ className: `${navItemBase} ${navItemActive}` }}
                  inactiveProps={{ className: `${navItemBase} ${navItemInactive}` }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer — Logout */}
      <div className="shrink-0 border-t border-border px-4 pt-3 pb-4">
        <button
          onClick={logout}
          className="flex items-center gap-3.5 h-11 w-full rounded-sm border-l-3 border-l-transparent pl-[17px] pr-3.5 text-[14px] font-medium text-error transition-colors hover:bg-error-10 cursor-pointer"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};
