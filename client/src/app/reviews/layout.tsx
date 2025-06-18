import { Suspense } from 'react';
import LoadingSkeleton from '@/components/loading';

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h3>Review Layout Applied</h3>
      <Suspense fallback={<LoadingSkeleton />}>
        <div>{children}</div>
      </Suspense>
    </section>
  );
};

export default ReviewLayout;
