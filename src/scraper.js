import { extractNames } from './utils/extractNames'
import { generateUserProfileURL } from './utils/generateUserProfileURL'
import { WebPageRetriever } from './web-page-retriever'
import * as cheerio from 'cheerio'

const PAGE_TO_SCRAPE = 'https://www.europarl.europa.eu/meps/en/full-list/all'

export const scrapeEULegislators = async () => {
  const page = await new WebPageRetriever(PAGE_TO_SCRAPE).retrieve()

  const $ = cheerio.load(page)

  const res = $('.erpl_member-list-item', '.erpl_member-list').map((index, element) => {
    const nameElement = $(element).find('.erpl_title-h4')
    const additionalInfo = $(element).find('.sln-additional-info')
    const imgElement = $(element).find('.erpl_image-frame span img')
    const partyGroupElement = $(additionalInfo.get(0))
    const countryElement = $(additionalInfo.get(1))
    const baseUrlElement = $(element).find('a')


    const name = nameElement.text()
    const { lastName } = extractNames(name)
    const partyGroup = partyGroupElement.text()
    const country = countryElement.text()
    const image = imgElement.attr('src')
    const baseUrl = baseUrlElement.attr('href')
    const url = generateUserProfileURL(baseUrl, name)

    return {
      name,
      lastName,
      partyGroup,
      country,
      url,
      image,
    }

  }).get()

  return res
}


