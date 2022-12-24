var ports = []
let connectedPorts = []

let url = null
let tokens = {
  accessToken: {
    token: null,
    tokenObject: null,
  },
  refreshToken: {
    token: null,
    tokenObject: null,
  },
}

const mutations = {
  SET_URL: 'SET_URL',
  SET_TOKENS: 'SET_TOKENS',
  GET_TOKENS: 'GET_TOKENS',
  CLOSE: 'CLOSE',
}

const TIMER_VALUE = 2 * 60 * 1000

self.addEventListener(
  'connect',
  function (eventC) {
    'use strict'

    ports = eventC.ports
    let port = ports[0]

    connectedPorts.push(port)

    port.addEventListener(
      'message',
      function (eventM) {
        let data = eventM.data
        const { mutation, data: dat } = data

        switch (mutation) {
          case mutations.SET_URL: {
            if (url === null) {
              url = dat?.url
            }
            break
          }
          case mutations.SET_TOKENS: {
            if (tokens.accessToken?.token === null) {
              const accessToken = parseJwt(dat?.accessToken)
              const refreshToken = parseJwt(dat?.refreshToken)
              tokens = {
                accessToken: {
                  token: dat?.accessToken,
                  tokenObject: accessToken,
                },
                refreshToken: {
                  token: dat?.refreshToken,
                  tokenObject: refreshToken,
                },
              }

              const expirationDate = new Date(accessToken.exp * 1000)
              const currentTimestamp = Date.now()
              const diff = expirationDate - currentTimestamp - 2 * 60 * 1000 //Minus 2 minutes because of the expiration

              //Token refresh logic with "cron"
              setTimeout(() => {
                fetchDatas(dat?.accessToken, dat?.refreshToken)
              }, diff)
            }
            break
          }
          case mutations.GET_TOKENS:
            connectedPorts?.map((item) => {
              item.postMessage(tokens)
            })
            break
          case mutations.CLOSE:
            connectedPorts.splice(connectedPorts.indexOf(port), 1)
            connectedPorts?.map((item) => {
              item.postMessage('Closed port')
            })
            break
        }
      },
      false,
    )

    port.start()
  },
  false,
)

const fetchDatas = (accessToken, refreshToken) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      const { data: respData } = response

      if (respData.accessToken) {
        connectedPorts?.map((item) => {
          item.postMessage({
            mutation: 'SET_TOKENS',
            data: {
              message: 'accesstoken:' + respData.accessToken,
              accessToken: respData.accessToken,
            },
          })
        })

        const accessToken = parseJwt(respData?.accessToken)
        tokens.accessToken.token = respData?.accessToken
        tokens.accessToken.tokenObject = accessToken

        const refreshToken = tokens.refreshToken.token

        const expirationDate = new Date(accessToken.exp * 1000)
        const currentTimestamp = Date.now()
        const diff = expirationDate - currentTimestamp - TIMER_VALUE //Minus 2 minutes because of the expiration

        setTimeout(() => {
          fetchDatas(respData?.accessToken, refreshToken)
        }, diff)
      } else {
        connectedPorts?.map((item) => {
          setTokensInitial()
          item.postMessage({
            mutation: 'SET_TOKENS',
            data: {
              message: 'logout',
              accessToken: null,
            },
          })
        })
      }
    })
    .catch((error) => {
      connectedPorts?.map((item) => {
        setTokensInitial()

        item.postMessage({
          mutation: 'SET_TOKENS',
          data: {
            message: 'error happened',
            accessToken: null,
          },
        })
      })
    })
}

const setTokensInitial = () => {
  tokens = {
    accessToken: {
      token: null,
      tokenObject: null,
    },
    refreshToken: {
      token: null,
      tokenObject: null,
    },
  }
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
