const express = require("express");
const dbConnect = require("./utils/dbConnect");
const cors = require("cors");
const axios = require("axios");
const  {signup,login, updateEmployee, getEmployee, getEmployees,getquestion } = require("./controllers/index");
const {auth,isEmployee,isAdmin} = require("./middleware/indexx");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
    }
); 
app.post("/api/v1/signup",signup);
app.get("/api/v1/login",login);
app.post("/api/v1/getquestion", getquestion);
app.put("/api/v1/updateemployee",auth,isEmployee,updateEmployee);
app.get('/api/v1/getemployee/:id',auth,isAdmin,getEmployee);
app.get('/api/v1/getemployees',auth,isAdmin,getEmployees);
dbConnect();

   