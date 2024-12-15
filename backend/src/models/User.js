const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'admin', 'university', 'recruiter', 'user'],
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware for hashing the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method for password validation
UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Add a method to exclude sensitive data like password
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password field
  return user;
};

module.exports = mongoose.model('User', UserSchema);
