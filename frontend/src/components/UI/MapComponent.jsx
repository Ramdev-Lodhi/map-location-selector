// import { useState, useEffect, useRef } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   StandaloneSearchBox
// } from "@react-google-maps/api";

// const libraries = ["places"]; // Static declaration for libraries

// const MapComponent = () => {
//   const mapStyles = {
//     height: "calc(100vh - 200px)",
//     width: "100%"
//   };

//   const defaultPosition = {
//     lat: 22.7196,
//     lng: 75.8577
//   };

//   const [currentPosition, setCurrentPosition] = useState(defaultPosition);
//   const [showModal, setShowModal] = useState(true);
//   const [searchBox, setSearchBox] = useState(null);
//   const mapRef = useRef(null); // Ref for the map

//   // Initialize the map with AdvancedMarkerElement
//   useEffect(() => {
//     if (typeof window.google !== "undefined" && window.google.maps) {
//       const { google } = window;

//       // Check if AdvancedMarkerElement is available
//       if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
//         console.log("AdvancedMarkerElement is available!");
//       } else {
//         console.warn(
//           "AdvancedMarkerElement is not available. Using Marker as fallback."
//         );
//       }
//     }
//   }, []);

//   // Initialize the map with marker
//   useEffect(() => {
//     if (mapRef.current && currentPosition && window.google) {
//       const { google } = window;
//       const map = mapRef.current;

//       // Wait until the map is fully initialized
//       if (!map) {
//         console.error("Map not initialized");
//         return;
//       }

//       // Use AdvancedMarkerElement if available, otherwise fall back to standard Marker
//       const MarkerClass =
//         google.maps.marker?.AdvancedMarkerElement || google.maps.Marker;

//       // Create the marker
//       const marker = new MarkerClass({
//         position: currentPosition,
//         map: map, // Ensure the marker is associated with the map
//         title: "Current Location", // Example of a title
//         icon: "<div style='background-color: #ff0000; width: 10px; height: 10px; border-radius: 50%;'></div>" // Custom marker content
//       });

//       // Clean up the marker when the component is unmounted or position changes
//       return () => {
//         marker.setMap(null);
//       };
//     }
//   }, [currentPosition]);

//   const locateUser = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
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

//   const handleMapClick = (event) => {
//     setCurrentPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng()
//     });
//   };

//   const handlePlacesChanged = () => {
//     if (searchBox) {
//       const places = searchBox.getPlaces();
//       if (places && places.length > 0) {
//         const location = places[0].geometry.location;
//         setCurrentPosition({
//           lat: location.lat(),
//           lng: location.lng()
//         });
//         setShowModal(false);
//       } else {
//         alert("No places found. Please refine your search.");
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="app-container">
//       {/* Modal */}
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

//       {/* Google Map */}
//       <LoadScript
//         googleMapsApiKey="AIzaSyAFrB_FyCr2o0o7T9cVIkI6NMdedk8NbXY"
//         libraries={libraries}
//         version="quarterly" // Ensure you're using the latest available API version
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
//           ref={mapRef}
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

// export default MapComponent;
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox
} from "@react-google-maps/api";

const libraries = ["places"]; // Static declaration for libraries

const MapComponent = () => {
  const mapStyles = {
    height: "calc(100vh - 200px)",
    width: "100%"
  };

  const defaultPosition = {
    lat: 22.7196,
    lng: 75.8577
  };

  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [showModal, setShowModal] = useState(true);
  const [searchBox, setSearchBox] = useState(null);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowModal(false);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (event) => {
    setCurrentPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry.location;
        setCurrentPosition({
          lat: location.lat(),
          lng: location.lng()
        });
        setShowModal(false);
      } else {
        alert("No places found. Please refine your search.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      {/* Modal */}
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

      {/* Google Map */}
      <LoadScript
        googleMapsApiKey="AIzaSyAFrB_FyCr2o0o7T9cVIkI6NMdedk8NbXY"
        libraries={libraries}
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
