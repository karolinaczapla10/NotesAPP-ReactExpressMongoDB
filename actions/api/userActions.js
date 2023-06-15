/*const User = require('../../db/models/auth');
const bcrypt = require("bcrypt");

async function registerUser(username, password) {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      const user = new User({ username, password });
      await user.save();
      console.log('User registered successfully');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username});
    console.log(user);
      
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password)
      console.log('User logged in successfully');
      console.log(validPassword)
      if(validPassword){
        return (user)
      }
    } else {
      console.log('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
  }
}




  
  module.exports = { registerUser, loginUser};
*/
const User = require('../../db/models/auth');
const bcrypt = require('bcrypt');

async function registerUser(username, password) {
  try {
    // Validate username and password
    if (!username || !password) {
      console.error('Username and password are required');
      return { success: false, message: 'Username and password are required' };
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('User already exists');
      return { success: false, message: 'User already exists' };
    }

    const user = new User({ username, password });
    await user.save();
    console.log('User registered successfully');
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loginUser(username, password) {
  try {
    // Validate username and password
    if (!username || !password) {
      console.error('Username and password are required');
      return { success: false, message: 'Username and password are required' };
    }

    const user = await User.findOne({ username });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      console.log('User logged in successfully');
      console.log(validPassword);
      if (validPassword) {
        return { success: true, message: 'User logged in successfully', user };
      } else {
        console.error('Invalid username or password');
        return { success: false, message: 'Invalid username or password' };
      }
    } else {
      console.error('Invalid username or password');
      return { success: false, message: 'Invalid username or password' };
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { registerUser, loginUser };
