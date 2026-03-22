import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/stores/authStore';

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-8">
        <div className="mb-6">
          <div className="text-muted text-sm">Good morning,</div>
          <div className="font-heading text-2xl font-bold mt-1">
            {user?.firstName || 'Coach'}
          </div>
          <div className="text-muted text-sm mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Stat cards placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {[
            { label: 'Avg Recovery', value: '--', status: 'Pending' },
            { label: 'Avg Sleep Score', value: '--', status: 'Pending' },
            { label: 'Avg Stress Level', value: '--', status: 'Pending' },
            { label: 'Avg Readiness', value: '--', status: 'Pending' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface rounded-xl p-5 border border-border"
            >
              <div className="text-muted text-sm mb-3">{stat.label}</div>
              <div className="font-heading text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted text-xs mt-2">{stat.status}</div>
            </div>
          ))}
        </div>

        {/* Content placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="bg-surface rounded-xl p-5 border border-border flex items-center justify-center h-[200px]">
            <span className="text-muted text-sm">
              Team Performance Ring
            </span>
          </div>
          <div className="lg:col-span-3 bg-surface rounded-xl p-5 border border-border flex items-center justify-center h-[200px]">
            <span className="text-muted text-sm">
              Player Readiness Grid
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
});
