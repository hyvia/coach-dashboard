import { Link, useMatchRoute } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  Clock,
  Trophy,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

const navSections = [
  {
    label: 'Main',
    items: [
      { to: '/' as const, icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/players' as const, icon: Users, label: 'Players' },
    ],
  },
  {
    label: 'Activities',
    items: [
      { to: '/trainings' as const, icon: Clock, label: 'Trainings' },
      { to: '/matches' as const, icon: Trophy, label: 'Matches' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/settings' as const, icon: Settings, label: 'Settings' },
    ],
  },
];

export const Sidebar = () => {
  const matchRoute = useMatchRoute();
  const logout = useAuthStore((s) => s.logout);
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <nav
      className={cn(
        'flex flex-col bg-surface border-r border-border h-screen sticky top-0 transition-all duration-200',
        sidebarCollapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <svg
          width={sidebarCollapsed ? 32 : 100}
          height={sidebarCollapsed ? 12 : 35}
          viewBox="0 0 600 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M505.362 163.381C500.047 163.381 495.15 162.037 490.674 159.35C486.337 156.662 482.84 153.126 480.182 148.74C477.664 144.355 476.405 139.475 476.405 134.1V87.844H572.511V70.6572C572.511 69.95 572.231 69.3841 571.672 68.9598C571.252 68.3939 570.692 68.111 569.993 68.111H476.405V40.3151H571.042C576.358 40.3151 581.184 41.6589 585.521 44.3466C589.998 47.0342 593.495 50.5706 596.013 54.9557C598.671 59.3408 600 64.221 600 69.5963V163.381H505.362ZM506.412 135.585H561.285C567.485 135.585 572.511 130.503 572.511 124.233C572.511 117.964 567.485 112.882 561.285 112.882H503.893V133.039C503.893 133.746 504.103 134.383 504.523 134.949C505.083 135.373 505.712 135.585 506.412 135.585Z"
            fill="#E07800"
          />
          <path
            d="M432.142 163.381V54.2126C432.142 46.5369 438.295 40.3146 445.886 40.3146C453.477 40.3146 459.631 46.537 459.631 54.2126V163.381H432.142Z"
            fill="#E07800"
          />
          <path
            d="M421.551 40.0145C418.24 50.4378 414.365 60.7088 409.926 70.8277C405.486 80.9466 400.37 90.6091 394.576 99.815C388.858 108.945 382.425 117.428 375.277 125.264C368.204 133.025 360.341 139.758 351.689 145.464C343.111 151.094 333.743 155.545 323.586 158.817C313.503 162.012 302.556 163.61 290.743 163.61C288.711 163.61 286.793 163.229 284.987 162.469C283.181 161.708 281.601 160.681 280.247 159.387C278.892 158.018 277.839 156.458 277.086 154.708C276.334 152.882 275.958 150.942 275.958 148.888V54.8505C275.958 46.6568 282.527 40.0145 290.63 40.0145C298.733 40.0145 305.302 46.6568 305.302 54.8505V132.797C312.45 132.797 319.297 131.237 325.843 128.117C332.464 124.998 338.709 120.89 344.578 115.792C350.447 110.619 355.864 104.76 360.83 98.2173C365.872 91.6742 370.349 84.979 374.261 78.1316C378.174 71.2081 381.484 64.4368 384.193 57.8177C386.977 51.1986 389.046 45.2642 390.4 40.0145H421.551Z"
            fill="#E07800"
          />
          <path
            d="M171.852 209C164.203 209 158.002 202.73 158.002 194.996C158.002 187.262 164.203 180.992 171.852 180.992H231.236C231.936 180.992 232.495 180.709 232.915 180.143C233.475 179.719 233.754 179.153 233.754 178.446V163.381H166.606C161.43 163.381 156.603 162.037 152.127 159.349C147.79 156.662 144.293 153.125 141.635 148.74C138.977 144.355 137.648 139.475 137.648 134.1V40.7392H165.137V133.039C165.137 133.746 165.347 134.382 165.766 134.948C166.326 135.373 166.956 135.585 167.655 135.585H231.236C231.936 135.585 232.495 135.373 232.915 134.948C233.475 134.382 233.754 133.746 233.754 133.039V40.7392H261.243V179.719C261.243 185.094 259.984 189.974 257.466 194.359C254.948 198.886 251.451 202.422 246.974 204.969C242.638 207.656 237.811 209 232.495 209H171.852Z"
            fill="#E07800"
          />
          <path
            d="M13.7445 163.381C6.15361 163.381 0 157.158 0 149.483V0H27.4889V40.3147H94.6375C99.9534 40.3147 104.78 41.6585 109.116 44.3462C113.453 47.0338 116.95 50.5702 119.608 54.9553C122.266 59.3404 123.595 64.2206 123.595 69.5959V163.381H96.1064V70.6568C96.1064 69.9495 95.8266 69.3837 95.267 68.9593C94.8474 68.3935 94.2878 68.1106 93.5883 68.1106H30.007C29.3076 68.1106 28.678 68.3935 28.1185 68.9593C27.6988 69.3837 27.4889 69.9495 27.4889 70.6568V149.483C27.4889 157.158 21.3353 163.381 13.7445 163.381Z"
            fill="#E07800"
          />
          <path
            d="M445.065 0.000285521C453.203 0.000285161 459.8 6.671 459.8 14.8997C459.8 23.1285 453.203 29.7992 445.065 29.7992C436.927 29.7992 430.33 23.1285 430.33 14.8997C430.33 6.671 436.927 0.00028588 445.065 0.000285521Z"
            fill="#E07800"
          />
        </svg>
        {!sidebarCollapsed && (
          <span className="font-heading text-sm font-semibold tracking-widest text-muted">
            COACH
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {!sidebarCollapsed && (
              <div className="px-3 mb-2 text-[11px] font-medium uppercase tracking-widest text-muted">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive =
                item.to === '/'
                  ? matchRoute({ to: '/', fuzzy: false })
                  : matchRoute({ to: item.to, fuzzy: true });

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-10 text-primary'
                      : 'text-muted hover:text-foreground hover:bg-surface-light',
                  )}
                >
                  <item.icon size={20} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface-light w-full transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-error hover:bg-error-10 w-full transition-colors"
        >
          <LogOut size={20} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
};
