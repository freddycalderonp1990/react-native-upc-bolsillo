// utils/mapUtils.ts

export const createPolylines = async (
  inicioLat: number,
  inicioLong: number,
  finLat: number,
  finLong: number
): Promise<{ latitude: number; longitude: number }[]> => {
  const osrmUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${inicioLong},${inicioLat};${finLong},${finLat}?overview=full&steps=true&geometries=geojson`;

  try {
    const response = await fetch(osrmUrl);
    if (!response.ok) {
      console.error('Error en la respuesta del servidor OSRM');
      return [];
    }

    const json = await response.json();
    const coordinates = json.routes[0].geometry.coordinates;
 
    return coordinates.map((point: [number, number]) => ({
      latitude: point[1],
      longitude: point[0],
    }));
  } catch (error) {
    console.error('Error al obtener la ruta:', error);
    return [];
  }
};
