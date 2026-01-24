require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: 'admin',
      password: 'admin123', // Will be hashed by the User model pre-save hook
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
