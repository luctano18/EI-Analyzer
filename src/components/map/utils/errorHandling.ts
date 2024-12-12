import toast from 'react-hot-toast';

export function handleMapErrors(error: any) {
  console.error('Map error:', error);

  let message = 'An error occurred while loading the map';

  if (error.status === 401) {
    message = 'Invalid Mapbox access token';
  } else if (error.status === 404) {
    message = 'Map style not found';
  } else if (error.message) {
    message = error.message;
  }

  toast.error(message, {
    duration: 5000,
    position: 'top-right'
  });
}