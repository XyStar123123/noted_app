import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return; // Just return, don't call anything

    this.password = await bcrypt.hash(this.password, 10);
    // No next() here!
});

export const User = mongoose.model('User', userSchema);