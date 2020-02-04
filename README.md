# Utm Parameter to cookies

Read utm parameters from the url and store them in a cookie.

So that you can read them on a different subdomain....

Have fun!

## Install

```
  npm install utm-parameters-toolset --save
  OR
  yarn add utm-parameters-toolset
```

## Use

```
  import { Utm } from 'utm-parameters-toolset'
  // create utm instance (set domain for allowed domains / subdomain)
  const utm = new Utm({
    domain: '.yourdomain.com',  // support subdomain
    expires: 365,
  })
  utm.store()  // simply store everything from window.location to cookies
  utm.get()    // get everything from cookies as object
  utm.clear()  // clear storage
```

### License

MIT

[version]: https://img.shields.io/npm/v/exit-intent.svg
[MIT License]: https://img.shields.io/npm/l/exit-intent.svg
[Standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[Standard Version]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[Size]: https://badges.herokuapp.com/size/npm/exit-intent
[Size gzip]: https://badges.herokuapp.com/size/npm/exit-intent?gzip=true

Inspired by https://github.com/szymansd/utm-params/blob/master/index.js
