/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { address, addressDelete, addressUpdate } from "../services/Address";

export const AddressContext = createContext();
export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await address();
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);


  const deleteAddress = async (addressId) => {
    try {
      await addressDelete({ addressId });
      setAddresses(addresses.filter((address) => address._id !== addressId));
      alert("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  const updateAddress = async (updatedAddress) => {
    try {
      const { addressId } = updatedAddress;
      await addressUpdate(updatedAddress);
      setAddresses(
        addresses.map((address) =>
          address._id === addressId ? updatedAddress : address
        )
      );
      alert("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address");
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        setAddresses,
        deleteAddress,
        updateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
