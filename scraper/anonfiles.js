const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

function anondl(url){
	return axios.get(url).then(res => {
		let $ = cheerio.load(res.data)
		let img = $('#download-url').attr('href')
		let size = $('#download-url').text().split(/\n/)[1].trim().replace(/\(|\)/g,'')
		let title = $('h1').text()
		return { img, title, size }
	})
}

function anonuploads(filepath, capt)  {
    return new Promise(async (resolve, reject) => {
    try {
        let { ext } = await fromBuffer(filepath)
        console.log('Uploading file to server anonfiles.com')
        let form = new FormData()
        form.append('file', filepath, `${capt ? `${capt}` : `[YunaBOT] File upload by AnonFiles`}.` + ext)
        await fetch('https://api.anonfile.com/upload', {
            method: 'POST',
            body: form
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) return reject(res.error)
            resolve(res.data.file.url.short)
        })
        .catch(err => reject(err))
    } catch (e) {
        return console.log(e)
    }
})
}

module.exports.anondl = anondl
module.exports.anonuploads = anonuploads
