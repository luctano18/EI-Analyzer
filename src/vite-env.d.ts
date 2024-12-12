/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_STRIPE_SECRET_KEY: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module 'react-places-autocomplete' {
  export interface Suggestion {
    active: boolean;
    description: string;
    formattedSuggestion: {
      mainText: string;
      secondaryText: string;
    };
    id: string;
    index: number;
    matchedSubstrings: Array<{
      length: number;
      offset: number;
    }>;
    placeId: string;
    terms: Array<{
      offset: number;
      value: string;
    }>;
    types: string[];
  }

  export interface Props {
    value: string;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    searchOptions?: {
      location?: google.maps.LatLng;
      radius?: number;
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
    };
    debounce?: number;
    highlightFirstSuggestion?: boolean;
    shouldFetchSuggestions?: boolean;
    googleCallbackName?: string;
    children: (params: {
      getInputProps: (options?: object) => object;
      suggestions: Suggestion[];
      getSuggestionItemProps: (suggestion: Suggestion, options?: object) => object;
      loading: boolean;
    }) => React.ReactNode;
  }

  export default function PlacesAutocomplete(props: Props): JSX.Element;

  export function geocodeByAddress(address: string): Promise<google.maps.GeocoderResult[]>;
  export function geocodeByPlaceId(placeId: string): Promise<google.maps.GeocoderResult[]>;
  export function getLatLng(result: google.maps.GeocoderResult): Promise<{
    lat: number;
    lng: number;
  }>;
}