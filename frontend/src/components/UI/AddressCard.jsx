import { useContext, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AddressContext } from "../../contexts/AddressContext";
import { TiInputChecked } from "react-icons/ti";

const AddressCard = () => {
  const { addresses, deleteAddress } = useContext(AddressContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAddresses = addresses.filter((address) => {
    const houseNo = address.houseNo ? address.houseNo.toLowerCase() : "";
    const area = address.area ? address.area.toLowerCase() : "";
    const category = address.category ? address.category.toLowerCase() : "";

    return (
      houseNo.includes(searchTerm.toLowerCase()) ||
      area.includes(searchTerm.toLowerCase()) ||
      category.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="address-manager-container">
      <h2>Your Location</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for an address..."
      />
      <div className="address-cards">
        {filteredAddresses.map((address) => (
          <div key={address._id} className="address-card">
            <div className="address-details">
              <h3>{address.category}</h3>
              <p style={{ textAlign: "start" }}>
                {`${address.houseNo}, ${address.area}`}
              </p>
            </div>

            <button
              onClick={() => handleAddressSelect(address)}
              style={{ background: "blue" }}
            >
              <TiInputChecked />
            </button>
            <button style={{ background: "green" }}>
              <MdEdit />
            </button>

            <button
              onClick={() => deleteAddress(address._id)}
              style={{ background: "red" }}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedAddress && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h3>Selected Address</h3>
            <hr />
            <div>
              <p>
                <strong>{selectedAddress.category}</strong>
              </p>
              <p>{`${selectedAddress.houseNo}, ${selectedAddress.area}`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
