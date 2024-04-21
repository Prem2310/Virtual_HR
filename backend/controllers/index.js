const { default: mongoose, get } = require("mongoose");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

require("dotenv").config();
const signup = async (req, res) => {
  try {
    const { name, role, mobileNumber, email, password, gender } = req.body;
    if (!name || !role || !mobileNumber || !email || !password || !gender) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const existuser = await Employee.findOne({ email });
    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await Employee.create({
      name: name,
      role: role,
      mobileNumber: mobileNumber,
      email: email,
      gender: gender,
      password: hashedPassword,
    });
    console.log(newEmployee);
    if (newEmployee) {
      return res.status(201).json({ message: "Employee created successfully" });
    } else {
      return res.status(400).json({ message: "Failed to create employee" });
    }
  } catch (error) {
    console.log("Error creating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    //get data from req body
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    //validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "AlL fields are required",
      });
    }
    //user check exist or not
    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }
    console.log(user);
    //password match
    //generate JWT
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("hrr");
    console.log(req.body);
    const { answers } = req.body;
    // if (!answers) {
    //   return res.status(400).json({ message: "Please enter all fields" });
    // }
    const employee = await Employee.findById(new mongoose.Types.ObjectId(id));
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    employee.Information = answers;
    await employee.save();
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.log("Error updating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(new mongoose.Types.ObjectId(id));
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.log("Error getting employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees) {
      return res.status(404).json({ message: "Employees not found" });
    }
    return res.status(200).json(employees);
  } catch (error) {
    console.log("Error getting employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const questions = [
  "Tell me about yourself",
  "What was your percentage in the last semester?",
  "What's the project you have done?",
  "Why should we hire you?",
  "Do you have any experience or internship done for the same role?",
];
const getquestion = async (req, res) => {
  console.log(req);

  try {
    const { currentQuestionIndex, previousResponse } = req.body;
    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
    });
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an HR manager virtual assistant. Your task is to ask questions to the candidate and evaluate their answers.",
        },
        {
          role: "system",
          content:
            "You always respond with a JSON object with the following format: { 'question': '' }",
        },
        {
          role: "user",
          content: `${
            `${previousResponse}. Next Question` ||
            questions[currentQuestionIndex]
          } `,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: {
        type: "json_object",
      },
    });
    const responseData = JSON.parse(chatCompletion.choices[0].message.content);
    return res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
// console.log("hello");
// const { currentQuestionIndex, previousResponse } = req.body;

// if (currentQuestionIndex >= questions.length) {
//   return res.status(200).json({ message: 'All questions have been answered.' });
// }

// const systemPrompt = 'You are an HR manager conducting an interview. Ask the candidate a question. If you are done with all the question end the interview with just "Thankyou" ';
// const userPrompt = `${previousResponse} . Any other questions ?` || questions[currentQuestionIndex];

// const messages = [
//   { role: 'system', content: systemPrompt },
//   { role: 'user', content: userPrompt },
// ];
// const data = {
//   model: 'gpt-3.5-turbo',
//   messages,
//   temperature: 0.7,
// };

// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
// };

// const response = await axios.post(process.env.OPENAI_API_URL, data, { headers });
// const result = response.data.choices[0].message.content;
//  return res.status(200).json({ question: userPrompt, result });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'An error occurred while fetching the question.' });
//   }
// };
module.exports = {
  login,
  signup,
  updateEmployee,
  getEmployee,
  getEmployees,
  getquestion,
};
