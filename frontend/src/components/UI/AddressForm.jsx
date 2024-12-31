import { useState, useContext } from "react";
import { FaHome, FaBriefcase, FaUsers } from "react-icons/fa";
import { AddressContext } from "../../contexts/AddressContext";
import { addressInsert } from "../../services/Address";

const AddressForm = () => {
  const { setAddresses } = useContext(AddressContext);
  const [addressDetails, setAddressDetails] = useState({
    houseNo: "",
    area: "",
    category: "Home",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  const handleCategoryChange = (category) => {
    setAddressDetails({
      ...addressDetails,
      category,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Address Details Submitted:", addressDetails);
    try {
      const { status, data } = await addressInsert(addressDetails);
      console.log(status);

      if (status === 201) {
        setAddresses((prevAddresses) => [...prevAddresses, data]);
        alert("Address added successfully!");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address");
    }
  };

  return (
    <div className="address-form-container">
      <h2>Delivery Address Form</h2>
      <hr />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="houseNo">House/Flat/Block No.</label>
          <input
            type="text"
            id="houseNo"
            name="houseNo"
            placeholder="House/Flat/Block No."
            value={addressDetails.houseNo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">Apartment/Road/Area</label>
          <input
            type="text"
            id="area"
            name="area"
            placeholder="Apartment/Road/Area"
            value={addressDetails.area}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="category-selection">
          <div className="category-options">
            <button
              type="button"
              className={`${
                addressDetails.category === "Home" ? "selected" : ""
              } addressformbtn`}
              onClick={() => handleCategoryChange("Home")}
            >
              <FaHome size={25} />
            </button>
            <button
              type="button"
              className={`${
                addressDetails.category === "Office" ? "selected" : ""
              } addressformbtn`}
              onClick={() => handleCategoryChange("Office")}
            >
              <FaBriefcase size={25} />
            </button>
            <button
              type="button"
              className={`${
                addressDetails.category === "Friends & Family" ? "selected" : ""
              } addressformbtn`}
              onClick={() => handleCategoryChange("Friends & Family")}
            >
              <FaUsers size={25} />
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="addressformbtn">
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
