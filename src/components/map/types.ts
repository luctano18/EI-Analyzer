export interface MapFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties: Record<string, any>;
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: MapFeature[];
}

export interface MapLayerConfig {
  id: string;
  name: string;
  defaultVisible: boolean;
}

export interface MapStyle {
  url: string;
  name: string;
  thumbnail?: string;
}