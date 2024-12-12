const Student = require('../models/Student');

// Controller to create a new student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', data: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Error creating student', details: error.message });
  }
};

// Controller to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving students', details: error.message });
  }
};

// Controller to get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving student', details: error.message });
  }
};

// Controller to update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Error updating student', details: error.message });
  }
};

// Controller to delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student', details: error.message });
  }
};
