import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

const PlayersPage = () => {
  return (
    <div>
      <Header title="Players" />
      <div className="p-8">
        <div className="bg-surface rounded-xl p-8 border border-border flex items-center justify-center min-h-[400px]">
          <span className="text-muted">Players grid coming soon</span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/players/')({
  component: PlayersPage,
});
