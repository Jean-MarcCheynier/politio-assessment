import { WebPageRetriever } from './web-page-retriever'
import * as cheerio from 'cheerio'

const PAGE_TO_SCRAPE = 'https://www.europarl.europa.eu/meps/en/full-list/all'
export const scrapeEULegislators = async () => {
  const WebPageRetrieverInstance = new WebPageRetriever(PAGE_TO_SCRAPE)

  const page = await WebPageRetrieverInstance.retrieve()

  //To move to a dedicated function
  const $ = cheerio.load(page, {
    normalizeWhitespace: true,
    xmlMode: true,

  })

  const res = $('.erpl_member-list-item', '.erpl_member-list').map((index, element) => {
    const nameElement = $(element).find('.erpl_title-h4')
    const additionalInfo = $(element).find('.sln-additional-info')
    const imgElement = $(element).find('.erpl_image-frame span img')
    const partyGroupElement = $(additionalInfo.get(0))
    const countryElement = $(additionalInfo.get(1))
    const urlElement = $(element).find('a')

    console.log(partyGroupElement)



    //
    const name = nameElement.text()
    const { lastName, firstName } = extractNames(name)
    const partyGroup = partyGroupElement.text()
    const country = countryElement.text()
    const image = $(imgElement).attr('src')
    const url = urlElement.attr('href')
    const fullUrl = url.concat(`/${firstName.toUpperCase()}_${lastName}/home`)

    return {
      name,
      lastName,
      partyGroup,
      country,
      url: fullUrl,
      image,
    }
  }).get()

  console.log(res[0])
  console.log(res[res.length - 1])

  return res
}

function extractNames(fullName) {
  const words = fullName.split(' ')

  let lastNameIndex = words.findIndex(word => word === word.toUpperCase())

  if (lastNameIndex === -1) {
    throw new Error('Last name in full capital letters not found')
  }

  const firstName = words.slice(0, lastNameIndex).join(' ')
  const lastName = words.slice(lastNameIndex).join(' ')

  return {
    firstName,
    lastName
  }
}


/* {
  name: "Name of the MEP",
  lastName: "Last name of the MEP",
  partyGroup: "Name of the party group",
  country: "Name of the country they're from",
  url: "The URL to the MEP biography page",
  image: "The URL to the image of the MEP",
} */


