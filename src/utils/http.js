/* globals Vue $ */

import NProgress from 'nprogress'
import { event, ls } from './utils'

var http = {

  post (path, data, successCallback, errorCallback) {
    Vue.http.post(path, data).then(function (response) {
      successCallback(response)
    }, function (response) {
      if (errorCallback) {
        errorCallback(response)
      }
    })
  },

  delete (path, successCallback, errorCallback) {
    Vue.http.delete(path).then(function (response) {
      successCallback(response)
    }, function (response) {
      if (errorCallback) {
        errorCallback(response)
      }
    })
  },

  get (path, successCallback, errorCallback) {
    Vue.http.get(path).then(function (response) {
      successCallback(response)
    }, function (response) {
      if (errorCallback) {
        errorCallback(response)
      }
    })
  },

  getQuery (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[[]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  /**
   * Init the service.
   */
  init () {
    $(document).ajaxComplete((e, r, settings) => {
      NProgress.done()

      if (r.status === 400 || r.status === 401) {
        if (!(settings.method === 'POST' && /\/api\/me\/?$/.test(settings.url))) {
          // This is not a failed login. Log out then.
          event.emit('logout')
          return
        }
      }

      const token = r.getResponseHeader('Authorization')
      if (token) {
        ls.set('jwt-token', token)
      }

      if (r.responseJSON && r.responseJSON.token && r.responseJSON.token.length > 10) {
        ls.set('jwt-token', r.responseJSON.token)
      }
    })
  }
}

export { http }
