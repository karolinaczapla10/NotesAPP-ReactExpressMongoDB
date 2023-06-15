const mongoose = require('mongoose');

const uri = "mongodb+srv://czapla:czapla@cluster0.cyqoydt.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// database connection
connect();

module.exports = connect;
