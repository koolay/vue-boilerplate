/* globals localStorage */
import { http } from './utils'

const auth = {
  login (username, password, cb) {
    if (localStorage.token) {
      if (cb) cb(true)
      return
    }
    pretendRequest(username, password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
  },

  loggedIn () {
    return !!localStorage.token
  },
  onChange (loggedIn) {}

}

function pretendRequest (username, password, cb) {
  http.post('/api/login', {
    'username': username,
    'password': password
  }, function (response) {
    if (response.data.result) {
      cb({
        authenticated: true,
        token: response.data.token
      })
    } else {
      cb({
        authenticated: false
      })
    }
  })
}

export { auth }
