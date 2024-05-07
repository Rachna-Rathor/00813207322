const item = require("../modal/item.modal")

const getItem = async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).json(items); // Send JSON response with status code 200
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createItem = async (req, res) => {
  try {
    const {  productName, price, rating,discount,availibility } = req.body;

    const response = await item.create({
        productName,
        rating,
        discount,
        availibility,
        price,
      
    });
    res.status(201).json({
      message: "Item created successfully",
      item: response,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    let { id } = req.params; // Extract item ID from request parameters
    id = id.trim(); // Trim any whitespace around the ID

    // Validate the ObjectId to prevent malformed IDs from causing errors
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid item ID format" });
    }

    const { roductName,rating,  discount,  availibility, price } = req.body; // Extract updated item data from request body

    // Find the item by ID and update its fields
    const updatedItem = await item.findByIdAndUpdate(
      id,
      {
        roductName,
        rating,
        discount,
        availibility,
        price,
      },
      { new: true }
    ); // Set { new: true } to return the updated item
    // Check if the item was found and updated successfully
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  };


  const deleteItem = async (req, res) => {
    try {
      let { id } = req.params;
      id = id.trim(); // Trim whitespace to ensure clean input
  
      // Validate the ObjectId to prevent malformed IDs from causing errors
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: "Invalid item ID format"
        });
      }
  
      const deletedItem = await item.findByIdAndDelete(id);
  
      // Check if the item was actually found and deleted
      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        deletedItem
      });
  
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };
module.exports = {
  getItem,
  createItem,
  updateItem,
  deleteItem
};


