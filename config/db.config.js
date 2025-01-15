const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Database connected: ${connection.connections[0].name}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
};

module.exports = connect