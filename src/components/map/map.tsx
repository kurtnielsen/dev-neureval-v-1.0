// import { forwardRef } from 'react';
// import type { MapRef, MapProps } from 'react-map-gl';

// import MapGL from 'react-map-gl';

// import { CONFIG } from 'src/config-global';

// // ----------------------------------------------------------------------

// export const Map = forwardRef<
//   MapRef,
//   Omit<MapProps, 'projection'> & { projection?: MapProps['projection'] }
// >(({ ...other }, ref) => <MapGL ref={ref} mapboxAccessToken={CONFIG.mapboxApiKey} {...other} />);

import { forwardRef } from 'react';

export const Map = forwardRef((props, ref) => {
  return <div>Map component is currently turned off.</div>;
});
