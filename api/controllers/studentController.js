const { default: mongoose } = require('mongoose');
const studentModel = require('../models/studentModel');

const studentController = {};

studentController.getAllStudents = async (req, res, next) => {
    try {
        let students = await studentModel.find({});
        res.status(200).send({ status: 200, message: "All students fetched successfully", data: students });
    } catch (error) {
        console.log("🚀 ~ studentController.getAllStudents= ~ error:", error)
        res.status(500).send({ status: 500, message: "Server error", error });
    }
}

studentController.getStudentById = async (req, res, next) => {
    try {
        let student = await studentModel.findById(req.params.id);
        res.status(200).send({ status: 200, message: "Student fetched successfully", data: student });
    } catch (error) {
        res.status(500).send({ status: 500, message: "Server error", error });
    }
}

studentController.createStudent = async (req, res, next) => {
    try {
        let reqBody = req.body;
        reqBody.marks = parseFloat(reqBody.marks); // Convert marks to number

        let studentExists = await studentModel.findOne({ name: reqBody.name, subject: reqBody.subject });

        if (studentExists) {
            // Update marks if student exists
            studentExists.marks += reqBody.marks;
            let updatedStudent = await studentModel.findByIdAndUpdate(studentExists._id, studentExists);
            return res.status(200).send({ status: 200, message: "Student updated successfully", data: updatedStudent });
        }

        // Create new student if not exists
        let newStudent = await studentModel.create(reqBody);
        res.status(200).send({ status: 200, message: "Student added successfully", data: newStudent });
    } catch (error) {
        console.error("Error creating/updating student:", error);
        res.status(500).send({ status: 500, message: "Server error", error });
    }
};

studentController.updateStudent = async (req, res, next) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        let query = { _id: new mongoose.Types.ObjectId(reqBody._id) };
        let updateObj = {
            name: reqBody.name,
            subject: reqBody.subject,
            marks: reqBody.marks
        }
        let student = await studentModel.findByIdAndUpdate(query, updateObj);
        res.status(200).send({ status: 200, message: "Student updated successfully", data: student });
    }
    catch (error) {
        console.log("🚀 ~ studentController.updateStudent= ~ error:", error)
        res.status(500).send({ status: 500, message: "Server error", error });
    }
}

studentController.deleteStudent = async (req, res, next) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        let query = { _id: new mongoose.Types.ObjectId(reqBody._id) };
        let student = await studentModel.findByIdAndDelete(query);
        res.status(200).send({ status: 200, message: "Student deleted successfully", data: student });
    } catch (error) {
        console.log("🚀 ~ studentController.deleteStudent ~ error:", error)
        res.status(500).send({ status: 500, message: "Server error", error });
    }
}


module.exports = studentController;