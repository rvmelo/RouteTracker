/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/useMap';
import { socket } from '@/utils/socket-io';

export type MapDriverProps = {
  route_id: string | null;
  start_location: { lat: number; lng: number } | null;
  end_location: { lat: number; lng: number } | null;
};

export function MapDriver(props: MapDriverProps) {
  const { route_id, start_location, end_location } = props;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    if (!map || !route_id || !start_location || !end_location) return;

    socket.disconnected ? socket.connect() : socket.offAny();

    socket.on('connect', () => {
      console.log('connected!!');
      socket.emit(`client:new-points`, { route_id });
    });

    socket.on(
      `server:new-points/${route_id}:list`,
      (data: { route_id: string; lat: string; lng: string }) => {
        if (!map.hasRoute(route_id)) {
          map.addRouteWithIcons({
            routeId: data.route_id,
            startMarkerOptions: {
              position: start_location,
            },
            endMarkerOptions: {
              position: end_location,
            },
            carMarkerOptions: {
              position: start_location,
            },
          });
        }
        map.moveCar(route_id, {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
        });
      },
    );
    return () => {
      socket.disconnect();
    };
  }, [route_id, map, start_location, end_location]);

  return <div className="w-2/3 h-[100vh]" ref={mapContainerRef} />;
}
