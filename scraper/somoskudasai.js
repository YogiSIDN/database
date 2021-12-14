const axios = require('axios')
const cheerio = require('cheerio')

function somoskudasai(url){
	return axios.get(url).then(res => {
		let $ = cheerio.load(res.data)
		let data = []
		let article = $('article').each((i, res)=>{
			let header = $(res).find('header')
			let figure = $(res).find('figure')
			let title = $(header).find('h2').text()
			let tag = $(header).find('.typ').text()
			let date = $(header).find('.db').text().trim()
			let link = $(res).find('a').attr('href')
			let img = $(figure).find('img').attr('src')

			data.push({
				title,
				tag,
				date,
				link,
				img
			})
		})

		return data
	})
}

module.exports.somoskudasai = somoskudasai
