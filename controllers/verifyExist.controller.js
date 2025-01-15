const User = require('../models/User.model')
const verifyExist = async (username) => {
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    const error = new Error('Username already exists')
    error.status = 400
    throw error
  }
}
module.exports = verifyExist