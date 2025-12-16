import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 44.65, //  latitude
  lng: -63.57, //  longitude
};

const cityLocations = [
  { name: "St. John's", lat: 47.5615, lng: -52.7126 },
  { name: "Toronto", lat: 43.65107, lng: -79.347015 },
  { name: "Montreal", lat: 45.5017, lng: -73.5673 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
 
];

const CoverageMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
    >
      {cityLocations.map((city, idx) => (
        <Marker
          key={idx}
          position={{ lat: city.lat, lng: city.lng }}
          title={city.name}
        />
      ))}
    </GoogleMap>
  );
};

export default CoverageMap;
