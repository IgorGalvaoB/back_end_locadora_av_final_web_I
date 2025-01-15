const validateInputs = (username, password) => {
    if (!username || !password) {
      throw new Error('All fields are required')
    }
  }
  module.exports = validateInputs