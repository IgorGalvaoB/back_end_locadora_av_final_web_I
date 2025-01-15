const fs = require('fs').promises;
const cloudinary = require('../config/cloudinary.config.js');
const removeBg = require('../config/removeBg.config.js');


const uploadCloud = async (req, res, next) => {
  try {
    const filePath = req.file.path

    
    const noBgFilePath = await removeBg(filePath)

  
    const result = await cloudinary.uploader.upload(noBgFilePath, {
      folder: 'Locadora',
      resource_type: 'image',
    })

    
    req.cloudinaryUrl = result.secure_url

   
    await fs.unlink(filePath)
    await fs.unlink(noBgFilePath)

    next()
  } catch (error) {
      console.log('aa')
    res.status(500).json({ error: error.message })
  }
}

module.exports = uploadCloud
