import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

const TrainingDetailPage = () => {
  const { trainingId } = Route.useParams();

  return (
    <div>
      <Header title="Training Detail" />
      <div className="p-8">
        <div className="bg-surface rounded-xl p-8 border border-border flex items-center justify-center min-h-[400px]">
          <span className="text-muted">
            Training detail for {trainingId} coming soon
          </span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/_authenticated/trainings/$trainingId',
)({
  component: TrainingDetailPage,
});
