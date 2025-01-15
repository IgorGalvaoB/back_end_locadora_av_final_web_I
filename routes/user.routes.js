const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../models/User.model.js')
const verifyExist = require('../controllers/verifyExist.controller.js')
const validateInputs = require('../controllers/validateInputs.controller.js')

const router = Router()


router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {

    validateInputs(username, password)


    await verifyExist(username)

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)


    const newUser = await User.create({
      username,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User created successfully',
      username: newUser.username,
    })
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ place: 'Error on signup', error: error.message })
  }
})


router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {

    const user = await User.findOne({ username })

    if (!user) {
      const error = new Error('Username or password is incorrect')
      error.status = 401
      throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      const error = new Error('Username or password is incorrect')
      error.status = 401
      throw error
    }

    const payload = {
      id: user._id,
      username: user.username,
    }


    
    token = jwt.sign(payload, process.env.SECRET_JWT)
    

    res.status(200).json({
      message: 'Login successful',
      username: user.username,
      token,
      userId: user._id,
    })
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ place: 'Error on login', error: error.message })
  }
})

module.exports = router
