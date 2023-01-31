import { createSlice } from '@reduxjs/toolkit'
import { gql } from 'graphql-request'
import moment from 'moment'
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
  filteredTips: any
}

export const initialState: MatchSlice = {
  matches: [],
  activeMatches: [],
  filteredTips: [],
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
        matchApiSlice.endpoints.getTipsByDateRange.matchFulfilled,
        (state, action) => {
          console.log(action.payload)


          const tips = action.payload.map((item: any) => {
            return {
              date: moment(item.analyasis.match.date_start).format('YYYY. MMMM DD'),
              time: moment(item.analyasis.match.date_start).format('HH:mm'),
              home: item.analyasis.match.homePlayer ? item.analyasis.match.homePlayer.first_name + ' ' + item.analyasis.match.homePlayer.last_name : item.analyasis.match.homeTeam.name,
              away: item.analyasis.match.awayPlayer ? item.analyasis.match.awayPlayer.first_name + ' ' + item.analyasis.match.awayPlayer.last_name : item.analyasis.match.awayTeam.name,
              winner: 'home',
              odds: item.odds,
              tippString: item.name,
              isWinner: true,
            }
          })

          state.filteredTips = tips;
        },
      ),
      builder.addMatcher(
        matchApiSlice.endpoints.getActiveMatches.matchFulfilled,
        (state, action) => {
          const matches = action.payload?.map(item => {
            return {
              id: item.id,
              home: item.homeTeam ?
                {
                  name: item.homeTeam.name,
                  logo: item.homeTeam.logo ?? 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png'
                }
                : {
                  first_name: item.homePlayer.first_name,
                  last_name: item.homePlayer.last_name,
                  image: item.homePlayer.image,
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
              size: item.is_daily ? 'large' : 'small', //Ha daily
              sportType: 'football',
              sport: item.sport,
              isDaily: item.is_daily,
              location: item.location,
              image: (!item?.image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.image : item.image),
              homeImage: (!item?.home_image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.home_image : item.home_image),
              awayImage: (!item?.away_image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.away_image : item.away_image),
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
              is_daily
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
            matches(order_by: {is_daily: desc, date_start: asc}) {
              id
              date_start
              date_end
              type
              match_cover
              home_image
              is_daily
              away_image
              sport {
                id
                color
                name
              }
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
    getTipsByDateRange: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
        query getTipsByDateRange($dateFrom: timestamp!, $dateTo: timestamp!) {
          tips(where: {analyasis: {match: {_and: {date_start: {_gte: $dateFrom}, date_end: {_lte: $dateTo}}}}}) {
            id
            name
            odds
            rating
            analyasis {
              match {
                date_start
                homePlayer {
                  first_name
                  last_name
                }
                homeTeam {
                  name
                }
                awayPlayer {
                  first_name
                  last_name
                }
                awayTeam {
                  name
                }
              }
            }
          }
        }        
        `,
        variables: {
          dateFrom: arg.dateFrom,
          dateTo: arg.dateTo,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.tips,
    }),
    getMatch: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
        query getMatch($matchId: uuid!) {
           matches_by_pk(id: $matchId) {
            id
            date_start
            date_end
            type
            match_cover
            home_image
            is_daily
            away_image
            location
            weather {
              name
            }
            sport {
              id
              color
              name
            }
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
            analyses {
              id
              analyses
              tips {
                id
                name
                odds
                rating
                tet
              }
            }
            match_datas {
              key
              side
              value
            }
            }
        }        
        `,
        variables: {
          matchId: arg.id,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => {
        const item = response.matches_by_pk;
        return {
          id: item.id,
          home: item.homeTeam ?
            {
              name: item.homeTeam.name,
              logo: item.homeTeam.logo ?? 'https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png'
            }
            : {
              first_name: item.homePlayer.first_name,
              last_name: item.homePlayer.last_name,
              image: item.homePlayer.image,
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
          size: item.is_daily ? 'large' : 'small', //Ha daily
          sportType: 'football',
          sport: item.sport,
          isDaily: item.is_daily,
          location: item.location,
          weather: item.weather,
          analyses: item.analyses.length > 0 ? item.analyses?.[0] : [],
          image: (!item?.image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.match_cover : item.match_cover),
          homeImage: (!item?.home_image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.home_image : item.home_image),
          awayImage: (!item?.away_image?.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + item.away_image : item.away_image),
          matchDatas: item.match_datas,
        }
      },
    }),
  }),
})

export const {
  useLazyGetMatchesByDateQuery,
  useGetActiveMatchesQuery,
  useLazyGetTipsByDateRangeQuery,
  useGetMatchQuery,
} = matchApiSlice

export const { setActiveMatches } = matchSlice.actions

export default matchSlice.reducer
