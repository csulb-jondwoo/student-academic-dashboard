import mongoose from 'mongoose';

const userSchema = mongoose.Scheme({
  name: String,
  studentId: Number,
  email: String,
  gpa: Number,
  currentSchedule: [String],
  RemainingGeCourses: [String],
  RemaningMajorCourses: [String],
  Roadmap: [String],
  MajorHistory: [String],
  GeHistory: [String],
});

const User = mongoose.model('User', userSchema);

export default User;
