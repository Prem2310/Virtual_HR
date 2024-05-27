const mongoose = require('mongoose');
const informationSchema = new mongoose.Schema({
  question: {
    type: String,
    
  },
  answer: {
    type: String,
    
  }
});
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true
    },
    role: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    
    email:{
         type: String,
        required: true
    
    },
    gender:{
        type: String,
        required: true
    },
    Information:[informationSchema],
    password:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        default: 0,
    }
    
});
module.exports = mongoose.model('Employee', EmployeeSchema);