const { Router } = require('express')
const upload = require('../middlewares/multer.js')
const uploadCloud = require('../middlewares/uploadCloud.js')
const Carro = require('../models/Carro.model.js') 

const router = Router()


router.post('/addCar', upload.single('image'), uploadCloud, async (req, res) => {
  try {
    const { marca, modelo, ano_fabricacao, cor, tipo, quilometragem, num_portas } = req.body

    if (!req.cloudinaryUrl) {
      return res.status(400).json({ error: 'Image processing failed' })
    }


    const novoCarro = await Carro.create({
      marca,
      modelo,
      ano_fabricacao: parseInt(ano_fabricacao, 10),
      cor,
      tipo,
      quilometragem: parseInt(quilometragem, 10),
      num_portas: parseInt(num_portas, 10),
      imagem: req.cloudinaryUrl, 
    })

    res.status(201).json({
      message: 'Carro adicionado com sucesso!',
      carro: novoCarro,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.delete('/deleteCar/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const carro = await Carro.findById(id)
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' })
    }

    await carro.excluirCarro()

    res.status(200).json({
      message: `Carro ${carro.modelo} excluído com sucesso!`,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router