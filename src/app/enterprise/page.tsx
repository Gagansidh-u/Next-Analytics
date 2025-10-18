'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NotFoundPage from '../not-found';

export default function EnterprisePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/not-found');
  }, [router]);

  return <NotFoundPage />;
}
