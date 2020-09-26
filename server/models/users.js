import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String, required: false },
});

export default mongoose.model('users', userSchema);
