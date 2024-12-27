'use client';

import { useRef } from 'react';
import { useMap } from '../../hooks/useMap';
import { DirectionsData } from '@/utils/models';

export type MapNewRouteProps = {
  directionsData: DirectionsData;
};

export function MapDriver() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);

  return <div className="w-2/3 h-[100vh]" ref={mapContainerRef} />;
}
