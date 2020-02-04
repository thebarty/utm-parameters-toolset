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
  constructor (options = {}) {
    this.expires = options.expires || 365
    this.domain = options.domain || 'localhost'
    this.prefix = 'utm_toolkit_'
  }
  /**
   * Store utm_parameters to cookie
   */
  store () {
    try {
      // `window.location`
      const search = delve(window, 'location.search')
      const searchAsObject = queryString.parse(search)
      utmParameters.forEach(parameterName => {
        const foundValue = searchAsObject[parameterName]
        if (foundValue) {
          cookies.set(`${this.prefix}${parameterName}`, foundValue, {
            expires: this.expires,
            domain: this.domain
          })
        }
      })
      // referer
      const referer = delve(window, 'document.referer')
      if (referer) {
        cookies.set(`${this.prefix}referer`, referer, {
          expires: this.expires,
          domain: this.domain
        })
      }
    } catch (e) {
      console.log('[Utm.store] error', e)
    }
  }
  /**
   * Read utm_parameters from cookie
   * @returns Object
   */
  get () {
    try {
      // `window.location`
      const returnValue = {}
      utmParameters.forEach(parameterName => {
        const cookieKey = `${this.prefix}${parameterName}`
        const foundValue = cookies.get(cookieKey)
        if (foundValue) {
          returnValue[parameterName] = foundValue
        }
      })
      return returnValue
    } catch (e) {
      console.log('[Utm.store] error', e)
    }
  }
  /**
   * Clear utm_parameters from cookie
   */
  clear () {
    try {
      const returnValue = {}
      utmParameters.forEach(parameterName => {
        const cookieKey = `${this.prefix}${parameterName}`
        cookies.erase(cookieKey)
      })
      return returnValue
    } catch (e) {
      console.log('[Utm.clear] error', e)
    }
  }
}
