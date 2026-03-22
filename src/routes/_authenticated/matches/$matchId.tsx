import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

const MatchDetailPage = () => {
  const { matchId } = Route.useParams();

  return (
    <div>
      <Header title="Match Detail" />
      <div className="p-8">
        <div className="bg-surface rounded-xl p-8 border border-border flex items-center justify-center min-h-[400px]">
          <span className="text-muted">
            Match detail for {matchId} coming soon
          </span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/matches/$matchId')({
  component: MatchDetailPage,
});
