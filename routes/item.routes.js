const express=require("express")

const router=express.Router();
const {getItem,createItem,updateItem,deleteItem}=require("../controller/item.controller")

router.get("/getItem",getItem);
router.post("/createItem",createItem);
router.put("/updateItem/:id",updateItem);
router.delete("/deleteItem/:id",deleteItem);


module.exports=router;