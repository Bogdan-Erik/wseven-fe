import { createSlice } from '@reduxjs/toolkit'
import { gql } from 'graphql-request'
import { hasuraApiSlice } from './hasuraApiSlice'
import store, { RootState } from './store'

export interface Datas {
  id: string
  key: string
  value: string
}

export interface TeamObject {
  id: string
  name: string
  // logo: string
  // datas: Datas[]
}

export interface PlayerObject {
  id: string
  first_name: string
  last_name: string
  // image: string
  // datas: Datas[]
}

export interface MatchObject {
  id: string
  homeTeam: TeamObject | null
  awayTeam: TeamObject | null
  homePlayer: PlayerObject | null,
  awayPlayer: PlayerObject | null,
  date_start: string,
  date_end: string,
}

export interface MatchSlice {
  matches: any
  activeMatches: any
}

export const initialState: MatchSlice = {
  matches: [],
  activeMatches: [],
}

export const matchSlice = createSlice({
  name: 'matchSlice',
  initialState: initialState,
  reducers: {
    setActiveMatches: (state: MatchSlice, action) => {
      state.activeMatches = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      matchApiSlice.endpoints.getMatchesByDate.matchFulfilled,
      (state, action) => {
        console.log(action.payload)
      },
    ),
      builder.addMatcher(
        matchApiSlice.endpoints.getActiveMatches.matchFulfilled,
        (state, action) => {
          const matches = action.payload?.map(item => {
            return {
              home: item.homeTeam ?
                {
                  name: item.homeTeam.name,
                  logo: item.homeTeam.logo ?? 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png'
                }
                : {
                  first_name: item.homePlayer.first_name,
                  last_name: item.homePlayer.last_name,
                  image: item.homePLayer.image,
                },
              away: item.awayTeam ? {
                name: item.awayTeam.name,
                logo: item.awayTeam.logo ?? 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png'
              } : {
                first_name: item.awayPlayer.first_name,
                last_name: item.awayPlayer.last_name,
                image: item.awayPlayer.image,
              },
              dateStart: item.date_start,
              colorScheme: 'blue',
              size: 'small', //Ha daily
              sportType: 'football',
              image: item.image
            }
          })

          state.activeMatches = matches;
        },
      )
  }
})

export const matchApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatchesByDate: builder.query<any, any>({
      query: (data: any) => ({
        body: gql`
          query get_matches_by_date($dateFrom: timestamp!, $dateEnd: timestamp!) {
            matches(where: {date_start: {_gte: $dateFrom}, date_end: {_lte: $dateEnd}}) {
              id
              date_start
              date_end
              homeTeam {
                id
                name
                logo
              }
              awayTeam {
                id
                name
                logo
              }
              homePlayer {
                id
                first_name
                last_name
                image
              }
              awayPlayer {
                id
                first_name
                last_name
                image
              }
            }
          }
        `,
        variables: {
          dateFrom: `${data.dateFrom}`,
          dateEnd: `${data.dateEnd}`,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response,
    }),
    getActiveMatches: builder.query<any, any>({
      query: () => ({
        body: gql`
          query {
            matches(where: { type: {_eq: 1}}) {
              id
              date_start
              date_end
              type
              image
              homeTeam {
                id
                name
                logo
              }
              awayTeam {
                id
                name
                logo
              }
              homePlayer {
                id
                first_name
                last_name
                image
              }
              awayPlayer {
                id
                first_name
                last_name
                image
              }
              league {
                id
                image
                name
              }
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.matches,
    }),
  }),
})

export const {
  useLazyGetMatchesByDateQuery,
  useGetActiveMatchesQuery,
} = matchApiSlice

export const { setActiveMatches } = matchSlice.actions

export default matchSlice.reducer
