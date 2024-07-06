const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    subject:{
        type:String,
        required:true
    }  ,     
    marks:{
        type:Number,
        required: true
    },

})

const studentModel = new mongoose.model('student',studentSchema,'student')

module.exports = studentModel