import axios from 'axios'

export class WebPageRetriever {
  constructor(url) {
    this.url = url
  }

  async retrieve() {
    try {
      const response = await axios.get(this.url)
      return response.data
    } catch (error) {
      console.error(`Error retrieving the web page: ${error}`)
      throw error
    }
  }
}
