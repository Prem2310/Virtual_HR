const mongoose = require('mongoose');
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
    Information:[{
        type: Object,
        
    }],
    password:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    
});
module.exports = mongoose.model('Employee', EmployeeSchema);