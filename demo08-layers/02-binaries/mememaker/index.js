'use strict';
const { randomUUID } = require('node:crypto')
const axios = require('axios');
const { promises: { writeFile, readFile, unlink}} = require('fs')
const mememaker = require('@erickwendel/meme-maker')

class Handler {
  static generateImagePath() {
    const isLocal = process.env.IS_OFFLINE
    return `${isLocal ? "" : "/tmp/"}${randomUUID()}.png`
  }
  static async saveImageLocally(imageUrl, imagePath) {
    const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(data, 'base64')
    return writeFile(imagePath, buffer)
  }
  static async generateImageBbase64(imagePath) {
    return readFile(imagePath, { encoding: 'base64' })
  }
}

module.exports.mememaker = async (event) => {
  const options = event.queryStringParameters
  const imagePath = Handler.generateImagePath()
  console.log('downloading image...')
  await Handler.saveImageLocally(options.image, imagePath)
  const imageOutputPath = Handler.generateImagePath()
  console.log('generating meme image...')
  await mememaker ({
    image: imagePath,
    outfile: imageOutputPath,
    topText: options.topText,
    bottomText: options.bottomText
  })
  console.log('generating base64')
  const imageBuffer = await Handler.generateImageBbase64(imageOutputPath)
  console.log('cleaning up!')
  await Promise.all([
    unlink(imagePath),
    unlink(imageOutputPath)
  ])
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: `<img src="data:image/png;base64,${imageBuffer}" />`
  }

  return response
};
// TODO: 19:58 https://play.ewacademy.com.br/area/produto/item/2981394