import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

const PlayerDetailPage = () => {
  const { playerId } = Route.useParams();

  return (
    <div>
      <Header title="Player Detail" />
      <div className="p-8">
        <div className="bg-surface rounded-xl p-8 border border-border flex items-center justify-center min-h-[400px]">
          <span className="text-muted">
            Player detail for {playerId} coming soon
          </span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/players/$playerId')({
  component: PlayerDetailPage,
});
