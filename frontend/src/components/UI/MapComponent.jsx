// import { useState, useEffect, useRef } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   StandaloneSearchBox,
// } from "@react-google-maps/api";

// const libraries = ["places"];

// const MapComponent = () => {
//   const mapStyles = {
//     height: "calc(100vh - 200px)",
//     width: "100%",
//   };

//   const defaultPosition = {
//     lat: 22.7196,
//     lng: 75.8577,
//   };

//   const [currentPosition, setCurrentPosition] = useState(defaultPosition);
//   const [showModal, setShowModal] = useState(true);
//   const [searchBox, setSearchBox] = useState(null);
//   const mapRef = useRef(null);

//   const locateUser = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           console.log("Fetched Position: ", position.coords);
//           setCurrentPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           setShowModal(false);
//         },
//         (error) => {
//           console.error("Error fetching location: ", error);
//           alert("Unable to fetch location. Please enable location services.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const addMarker = () => {
//     if (mapRef.current && window.google) {
//       const { google } = window;

//       const MarkerClass =
//         google.maps.marker?.AdvancedMarkerElement || google.maps.Marker;

//       const markerOptions = {
//         position: currentPosition,
//         map: mapRef.current,
//         title: "Current Location",
//       };

//       if (MarkerClass === google.maps.Marker) {
//         markerOptions.icon = {
//           url: "data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z'/></svg>",
//           scaledSize: new google.maps.Size(20, 20),
//         };
//       }

//       const marker = new MarkerClass(markerOptions);
//       return () => marker.setMap(null);
//     }
//   };

//   useEffect(addMarker, [currentPosition]);

//   const handleMapClick = (event) => {
//     setCurrentPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handlePlacesChanged = () => {
//     if (searchBox) {
//       const places = searchBox.getPlaces();
//       if (places && places.length > 0) {
//         const location = places[0].geometry.location;
//         setCurrentPosition({
//           lat: location.lat(),
//           lng: location.lng(),
//         });
//         setShowModal(false);
//       } else {
//         alert("No places found. Please refine your search.");
//       }
//     }
//   };

//   const handleMapLoad = (map) => {
//     mapRef.current = map;
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="app-container">
//       {showModal && (
//         <div className="modal" role="dialog" aria-modal="true">
//           <div className="modal-content">
//             <h3 id="modal-title">Location Permission</h3>
//             <p id="modal-description">
//               We need your location to update your delivery address.
//             </p>
//             <button className="button" onClick={locateUser}>
//               Enable Location
//             </button>
//             <button className="button" onClick={closeModal}>
//               Search Manually
//             </button>
//           </div>
//         </div>
//       )}

//       <LoadScript
//         googleMapsApiKey="AIzaSyAFrB_FyCr2o0o7T9cVIkI6NMdedk8NbXY"
//         libraries={libraries}
//         version="weekly"
//       >
//         <StandaloneSearchBox
//           onLoad={(ref) => setSearchBox(ref)}
//           onPlacesChanged={handlePlacesChanged}
//         >
//           <input
//             type="text"
//             placeholder="Search your address"
//             className="search-input"
//           />
//         </StandaloneSearchBox>

//         <GoogleMap
//           onLoad={handleMapLoad}
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={currentPosition}
//           onClick={handleMapClick}
//         />
//       </LoadScript>
//     </div>
//   );
// };

// export default MapComponent;
import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries = ["places"];

const MapComponent = () => {
  const mapStyles = {
    height: "calc(100vh - 200px)",
    width: "100%",
  };

  const defaultPosition = {
    lat: 22.7196,
    lng: 75.8577,
  };

  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [showModal, setShowModal] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const mapRef = useRef(null);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowModal(false);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Location access denied by user.");
          } else {
            alert("Unable to fetch location. Please enable location services.");
          }
          setShowModal(true);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setShowModal(true);
        }
      );
    } else {
      setShowModal(true);
    }
  }, []);

  const addMarker = () => {
    if (mapRef.current && window.google) {
      const { google } = window;

      const MarkerClass =
        google.maps.marker?.AdvancedMarkerElement || google.maps.Marker;

      const markerOptions = {
        position: currentPosition,
        map: mapRef.current,
        title: "Current Location",
      };

      if (MarkerClass === google.maps.Marker) {
        markerOptions.icon = {
          url: "data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z'/></svg>",
          scaledSize: new google.maps.Size(20, 20),
        };
      }

      const marker = new MarkerClass(markerOptions);
      return () => marker.setMap(null);
    }
  };

  useEffect(addMarker, [currentPosition]);

  const handleMapClick = (event) => {
    setCurrentPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry.location;
        setCurrentPosition({
          lat: location.lat(),
          lng: location.lng(),
        });
        setShowModal(false);
      } else {
        alert("No places found. Please refine your search.");
      }
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3 id="modal-title">Location Permission</h3>
            <p id="modal-description">
              We need your location to update your delivery address.
            </p>
            <button className="button" onClick={locateUser}>
              Enable Location
            </button>
            <button className="button" onClick={closeModal}>
              Search Manually
            </button>
          </div>
        </div>
      )}

      <LoadScript
        googleMapsApiKey="AIzaSyAFrB_FyCr2o0o7T9cVIkI6NMdedk8NbXY"
        libraries={libraries}
        version="weekly"
      >
        <StandaloneSearchBox
          onLoad={(ref) => setSearchBox(ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search your address"
            className="search-input"
          />
        </StandaloneSearchBox>

        <GoogleMap
          onLoad={handleMapLoad}
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
          onClick={handleMapClick}
        />
      </LoadScript>
    </div>
  );
};

export default MapComponent;
