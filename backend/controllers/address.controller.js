const User = require("../models/user.model");
const addressInsert = async (req, res) => {
  try {
    const { houseNo, area, category } = req.body;
    const { userId } = req.user;
    if (!userId || !houseNo || !area || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newAddress = {
      houseNo,
      area,
      category,
    };
    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json({
      message: "Address saved successfully!",
      user,
    });
  } catch (error) {
    console.error("Error inserting address:", error);
    res.status(500).json({ message: "Server error while saving address" });
  }
};

const address = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.addresses);

    res.json(user.addresses);
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    res.status(500).json({ message: "Server error while fetching addresses" });
  }
};

const addressUpdate = async (req, res) => {
  try {
    const { addressId, houseNo, area, category } = req.body;
    const { userId } = req.user;
    if (!userId || !addressId || !houseNo || !area || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    address.houseNo = houseNo;
    address.area = area;
    address.category = category;
    await user.save();
    res.json({ message: "Address updated successfully!", user });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error while updating address" });
  }
};

const addressDelete = async (req, res) => {
  try {
    const { addressId } = req.body;
    const { userId } = req.user;
    console.log(userId);

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "User ID and Address ID are required" });
    }

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.pull({ _id: addressId });
    await user.save();

    res.json({ message: "Address deleted successfully!" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error while deleting address" });
  }
};
module.exports = {
  addressInsert,
  address,
  addressUpdate,
  addressDelete,
};
