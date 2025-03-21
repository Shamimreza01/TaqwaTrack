export const getLocationName = async (latitude, longitude) => {
  const apiKey = process.env.REACT_APP_GEOAPIFY_KEY;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0].formatted;
};

