import delve from 'dlv'
import cookies from 'browser-cookies' // https://www.npmjs.com/package/browser-cookies
import queryString from 'query-string' // https://www.npmjs.com/package/query-string
// supported parameters
const utmParameters = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_name',
  'utm_term',
  'referer' // special case
]
export class Utm {
  constructor ({expires = 365, domain = 'localhost'}) {
    this.expires = expires
    this.domain = domain
    this.prefix = 'utm_toolkit_'
  }
  stripPrefix (parameterName) {
    return parameterName.substring(this.prefix.length, parameterName.length)
  }
  store () {
    // `window.location`
    const search = delve(window, 'history.location.search')
    const searchAsObject = queryString.parse(search)
    utmParameters.forEach(parameterName => {
      const foundValue = searchAsObject[parameterName]
      if (foundValue) {
        console.log(`found "${foundValue}" for parameterName`)
        cookies.set(`${this.prefix}${parameterName}`, foundValue, {
          expires: this.expires,
          domain: this.domain
        })
      }
    })
    // referer
    const referer = delve(window, 'document.referer')
    if (referer) {
      console.log(`found "${referer}" for referer`)
      cookies.set(`${this.prefix}referer`, referer, {
        expires: this.expires,
        domain: this.domain
      })
    }
  }
  get () {
    // `window.location`
    const returnValue = {}
    utmParameters.forEach(parameterName => {
      const foundValue = cookies.get(`${this.prefix}${parameterName}`)
      if (foundValue) {
        returnValue[this.stripPrefix(parameterName)] = foundValue
      }
    })
  }
}
