// import { useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   StandaloneSearchBox,
// } from "@react-google-maps/api";

// const MapComponent = () => {
//   const mapStyles = {
//     height: "calc(100vh - 50px)",
//     width: "100%",
//   };

//   const defaultPosition = {
//     lat: 22.7196,
//     lng: 75.8577,
//   };

//   const [currentPosition, setCurrentPosition] = useState(defaultPosition);
//   const [showModal, setShowModal] = useState(true);
//   const [searchBox, setSearchBox] = useState(null);

//   const locateUser = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
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
//         setShowModal(false); // Close modal when a place is selected
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div style={appStyle}>
//       {/* Modal */}
//       {showModal && (
//         <div style={modalStyle}>
//           <div style={modalContentStyle}>
//             <h3>Location Permission</h3>
//             <p>We need your location to update your delivery address.</p>
//             <button onClick={locateUser} style={buttonStyle}>
//               Enable Location
//             </button>
//             <button onClick={closeModal} style={buttonStyle}>
//               Search Manually
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Google Map */}
//       <LoadScript
//         googleMapsApiKey="AIzaSyAFrB_FyCr2o0o7T9cVIkI6NMdedk8NbXY"
//         libraries={["places"]}
//       >
//         <StandaloneSearchBox
//           onLoad={(ref) => setSearchBox(ref)}
//           onPlacesChanged={handlePlacesChanged}
//         >
//           <input
//             type="text"
//             placeholder="Search your address"
//             style={inputStyle}
//           />
//         </StandaloneSearchBox>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={currentPosition}
//           onClick={handleMapClick}
//         >
//           <Marker
//             position={currentPosition}
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//             }}
//           />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// // App container style
// const appStyle = {
//   display: "flex",
//   flexDirection: "column",
//   height: "100vh",
//   margin: 0,
//   padding: 0,
// };

// // Modal styles
// const modalStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000, // Ensure modal appears above the map
// };

// const modalContentStyle = {
//   backgroundColor: "white",
//   padding: "20px",
//   borderRadius: "10px",
//   textAlign: "center",
//   width: "300px",
// };

// const buttonStyle = {
//   margin: "10px",
//   padding: "10px 20px",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   backgroundColor: "#007BFF",
//   color: "white",
// };

// // Input field style
// const inputStyle = {
//   boxSizing: "border-box",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   width: "90%",
//   padding: "10px",
//   margin: "10px auto",
//   zIndex: 1000,
//   display: "block",
// };

// export default MapComponent;
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries = ["places"]; // Static declaration for libraries

const MapComponent = () => {
  const mapStyles = {
    height: "calc(100vh - 50px)",
    width: "100%",
  };

  const defaultPosition = {
    lat: 22.7196,
    lng: 75.8577,
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
            lng: position.coords.longitude,
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
