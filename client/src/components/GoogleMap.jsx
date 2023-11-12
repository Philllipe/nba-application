import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function Map({ lat, lng, venueName, API_KEY }) {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: lat,
    lng: lng,
  };
  const options = {
    disableDefaultUI: false,
    zoomControl: false,
    streetViewControl: true,
    mapTypeId: "satellite",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="aspect-[1/1] shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={center}
        options={options}
        tilt={45}
      >
        <Marker position={center} title={venueName} />
      </GoogleMap>
    </div>
  );
}
