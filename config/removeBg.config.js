const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs').promises;


async function removeBg(filePath) {
  try {
    const fileBlob = await fs.readFile(filePath)
    const formData = new FormData()
    formData.append('size', 'auto')
    formData.append('image_file', fileBlob, { filename: 'image.png' })

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': process.env.REMOVE_BG_API_KEY },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Remove.bg API Error: ${response.status} ${response.statusText}`)
    }

    const buffer = await response.buffer()
    const tempFilePath = './temp-no-bg.png'
    await fs.writeFile(tempFilePath, buffer)

    return tempFilePath
  } catch (error) {
    throw new Error(`Failed to process image with Remove.bg: ${error.message}`)
  }
}

module.exports = removeBg
