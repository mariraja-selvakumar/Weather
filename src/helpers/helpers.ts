interface GetLocationReturnType {
  latitude: number;
  longitude: number;
}

const defaultLocation: GetLocationReturnType = {
  latitude: 13.0843,
  longitude: 80.2705,
};

export const getLocation = (): GetLocationReturnType => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    });
  }
  return defaultLocation;
};
