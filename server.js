const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors =require('cors')

app.use(cors());
// middle wares
app.use(bodyParser.json());
app.use(express.json())
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// connect with database

const dbConnect=require("./config/database")
dbConnect();

// router
const router=require("./routes/item.routes")
app.use("/item/v1",router)

const userrouter=require("./routes/user.routes")
app.use("/user/v2",userrouter)


