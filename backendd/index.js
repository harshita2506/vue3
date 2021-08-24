const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

// connect to db
mongoose.connect(
  "mongodb+srv://dg_2107:ZEns@r123@ros.vwsf7.mongodb.net/ros",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const authRoutes = require("./routes/auth");
const leaves = require("./routes/leaves");
const verifyToken = require("./routes/validate-token");
const leavestatus=require("./routes/leave.status")
const report = require("./routes/report")
const reportList =require("./routes/reportList")
const basicInformation = require("./routes/basicInformation")


// middlewares
app.use(express.json()); // for body parser
app.use(cors());

// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/leaves", verifyToken, leaves);
app.use("/api/leavesStatus", verifyToken, leavestatus);
app.use("/api/reports", verifyToken, report);
app.use("/api/reportList", verifyToken, reportList);
app.use("/api/basicInformation", verifyToken, basicInformation);



app.listen(3000, () => console.log("server is running..."));
