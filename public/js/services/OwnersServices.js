((app)=>{
  'use strict'
  app.service('OwnersServices', ['$http', '$cookies', '$window', '$q', class OwnersServices {

          constructor($http, $cookies, $window, $q) {
              this.$http = $http
              this.$cookies = $cookies
              this.$window = $window
              this.$q = $q
              this.currentUser = null
          }

          create(owner) {
              return this.$http.post('/api/owners', owner)
          }

          update(owner) {
              return this.$http.put('/api/owners/' + owner._id, owner)
          }

          connect(data) {
              return this.$http.post('/api/auth', data).then((res) => {
                  this.currentUser = res.data.user
                  console.log(this.currentUser);
                  this.$cookies.put('token', res.data.token)
              })
          }

          disconnect() {
              return new Promise((resolve, reject) => {
                  this.$cookies.remove("token")
                  this.currentUser = null
                  resolve()
              })
          }
          getCurrent() {
              let deferred = this.$q.defer()
              if (!this.$cookies.get('token')) {
                  deferred.reject()
              } else {
                  if (!this.currentUser) {
                      let payload = this.$cookies.get('token').split('.')[1]
                      payload = this.$window.atob(payload)
                      payload = JSON.parse(payload)
                      this.currentUser = payload._doc
                      if (Math.round(new Date().getTime() / 1000) > payload.exp)
                          return this.disconnect()
                  }
                  deferred.resolve(this.currentUser)
              }

              return deferred.promise
          }

          setToken(token) {
              return new Promise((resolve, reject) => {
                  this.$cookies.put('token', token)
                  let payload = token.split('.')[1]
                  payload = this._decodePayload(payload)
                  this.currentUser = payload._doc
                  resolve(this.currentUser)
              })
          }

          //Private methods
          _decodePayload(payload) {
              return JSON.parse(decodeURI(this._base64ToUTF8(this._urlBase64Decode(payload))))
          }

          _base64ToUTF8(str) {
              return decodeURIComponent(escape(window.atob(str)));
          }

          _urlBase64Decode(str) {
              var output = str.replace('-', '+').replace('_', '/');
              switch (output.length % 4) {
                  case 0:
                      break;
                  case 2:
                      output += '==';
                      break;
                  case 3:
                      output += '=';
                      break;
                  default:
                      throw 'Illegal base64url string!';
              }
              //return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
              return output
          }

      }])

})(angular.module('app.services'))
