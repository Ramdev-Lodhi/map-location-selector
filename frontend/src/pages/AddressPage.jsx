import AddressCard from "../components/UI/AddressCard";
import AddressForm from "../components/UI/AddressForm";
import { AddressProvider } from "../contexts/AddressContext";
const AddressPage = () => {
  return (
    <div className="address-section">
      <AddressProvider>
        <AddressForm />
        <AddressCard />
      </AddressProvider>
    </div>
  );
};

export default AddressPage;
