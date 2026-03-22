import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

const MatchesPage = () => {
  return (
    <div>
      <Header title="Matches" />
      <div className="p-8">
        <div className="bg-surface rounded-xl p-8 border border-border flex items-center justify-center min-h-[400px]">
          <span className="text-muted">Matches list coming soon</span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/matches/')({
  component: MatchesPage,
});
