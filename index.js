require('dotenv').config()
const fs = require('fs')
const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET)

let ipfsHashData = []
let i = 0
let endNum = 1

async function pinning(i) {
  const readableStreamForFile = fs.createReadStream(`./img/${i + 1}.jpg`)
  const options = {
    pinataMetadata: {
      name: `NFT-${i + 1}-img`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  }
  const result = await pinata.pinFileToIPFS(readableStreamForFile, options)
  ipfsHashData[i] = result.IpfsHash
  console.log(i + 1, result)
  fs.writeFileSync('hashdata.txt', ipfsHashData.toString())
  i = i + 1
  if (i === endNum) {
    return true
  }
  pinning(i)
}

pinning(i)
