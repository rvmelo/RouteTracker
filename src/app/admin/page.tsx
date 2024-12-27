'use client';

import { useMap } from '@/hooks/useMap';
import { useRef } from 'react';

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);

  return <div className="w-full h-[100vh]" ref={mapContainerRef} />;
}

export default AdminPage;
