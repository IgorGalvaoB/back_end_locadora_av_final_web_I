const { Router } = require('express')
const Carro = require('../models/Carro.model.js') 

const router = Router()


router.get('/getCars', async (req, res) => {
    try {
      const carros = await Carro.find()
      if (carros.length === 0) {
        return res.status(404).json({ message: 'Nenhum carro encontrado' })
      }
      res.status(200).json(carros)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  module.exports = router