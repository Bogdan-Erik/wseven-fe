// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import moment from "moment";
import { hasuraApiSlice } from "./hasuraApiSlice";
import store, { RootState } from "./store";
import NameGetter from "./../utils/NameGetter";
import _ from "lodash";

export interface Datas {
  id: string;
  key: string;
  value: string;
}

export interface TeamObject {
  id: string;
  name: string;
  // logo: string
  // datas: Datas[]
}

export interface PlayerObject {
  id: string;
  first_name: string;
  last_name: string;
  // image: string
  // datas: Datas[]
}

export interface MatchObject {
  id: string;
  homeTeam: TeamObject | null;
  awayTeam: TeamObject | null;
  homePlayer: PlayerObject | null;
  awayPlayer: PlayerObject | null;
  date_start: string;
  date_end: string;
}

export interface MatchSlice {
  matches: any;
  activeMatches: any;
  filteredTips: any;
  calendar: any;
}

export const initialState: MatchSlice = {
  matches: [],
  activeMatches: [],
  filteredTips: [],
  calendar: [],
};

export const matchSlice = createSlice({
  name: "matchSlice",
  initialState: initialState,
  reducers: {
    setActiveMatches: (state: MatchSlice, action) => {
      state.activeMatches = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      matchApiSlice.endpoints.getMatchesByDate.matchFulfilled,
      (state, action) => {
        const payload = action.payload;
        let matchList = [];
        let ticketMatchList = [];

        payload.tickets.map((item: any) => {
          item?.ticket_tips?.map((ticketItem: any) => {
            if (ticketItem.match) {
              //Meccshez van kötve
              const matchItem = ticketItem.match;
              ticketMatchList.push({
                id: matchItem.id,
                title:
                  NameGetter(matchItem, "home") +
                  " - " +
                  NameGetter(matchItem, "away"),
                start: matchItem.date_start,
                end: matchItem.date_end,
                extendedProps: {
                  tv: {
                    name: matchItem?.tv_channel?.name,
                    logo: matchItem?.tv_channel?.logo
                      ? import.meta.env.VITE_DO_IMAGE_HOST +
                        matchItem.tv_channel?.logo
                      : null,
                  },
                },
                className: ["event", matchItem.sport?.value ?? "football"],
              });
            } else {
              //Nem meccshez van kötve
              ticketMatchList.push({
                title: ticketItem.title,

                start: ticketItem.date_start,
                end: ticketItem.date_end,
                extendedProps: {
                  tv: {
                    name: ticketItem?.tv_channel?.name,
                    logo: ticketItem?.tv_channel?.logo
                      ? import.meta.env.VITE_DO_IMAGE_HOST +
                        ticketItem.tv_channel?.logo
                      : null,
                  },
                },
                className: [
                  "event",
                  ticketItem?.league?.sport?.value ?? "football",
                ],
              });
            }
          });
        });
        matchList = payload?.matches.map((item: any) => {
          return {
            id: item.id,
            title: NameGetter(item, "home") + " - " + NameGetter(item, "away"),
            start: item.date_start,
            end: item.date_end,
            extendedProps: {
              tv: {
                name: item?.tv_channel?.name,
                logo: item?.tv_channel?.logo
                  ? import.meta.env.VITE_DO_IMAGE_HOST + item.tv_channel?.logo
                  : null,
              },
            },
            className: ["event", item.sport?.value ?? "football"],
          };
        });

        const sum = [
          ...matchList,
          ...ticketMatchList.filter(
            (obj2) => !matchList.find((obj1) => obj1.id === obj2.id)
          ),
        ];

        state.calendar = sum;
      }
    ),
      builder.addMatcher(
        matchApiSlice.endpoints.getTipsByDateRange.matchFulfilled,
        (state, action) => {
          const tips = action.payload.map((item: any) => {
            const winningPrice = (item.tet * item.odds - item.tet).toFixed(2);

            return {
              matchId: item.analyasis.match.id,
              date: moment(item.analyasis.match.date_start).format(
                "YYYY. MMMM D."
              ),
              time: moment(item.analyasis.match.date_start).format("HH:mm"),
              home: item.analyasis.match.homePlayer
                ? item.analyasis.match.homePlayer.first_name +
                  " " +
                  item.analyasis.match.homePlayer.last_name
                : item.analyasis.match.homeTeam.name,
              homeNameExtension: item.analyasis.match?.homeTeam?.name_extension,
              away: item.analyasis.match.awayPlayer
                ? item.analyasis.match.awayPlayer.first_name +
                  " " +
                  item.analyasis.match.awayPlayer.last_name
                : item.analyasis.match.awayTeam.name,
              awayNameExtension: item.analyasis.match?.awayTeam?.name_extension,
              winner: "home",
              odds: item.odds,
              tippString: item.name,
              isWinner: item.result,
              winningPrice:
                item.result !== "loose"
                  ? `+${winningPrice} egység`
                  : `-${item.tet} egység`,
              logo:
                import.meta.env.VITE_DO_IMAGE_HOST +
                item.analyasis.match.league.image,
            };
          });

          state.filteredTips = tips;
        }
      ),
      builder.addMatcher(
        matchApiSlice.endpoints.getActiveMatches.matchFulfilled,
        (state, action) => {
          const matches = action.payload?.map((item) => {
            return {
              id: item.id,
              home: item.homeTeam
                ? {
                    name: item.homeTeam.name,
                    nameExtension: item.homeTeam?.name_extension,
                    logo: item.homeTeam.logo
                      ? import.meta.env.VITE_DO_IMAGE_HOST + item.homeTeam.logo
                      : "https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png",
                  }
                : {
                    first_name: item.homePlayer.first_name,
                    last_name: item.homePlayer.last_name,
                    image: item.homePlayer.image,
                  },
              away: item.awayTeam
                ? {
                    name: item.awayTeam.name,
                    nameExtension: item.awayTeam?.name_extension,
                    logo: item.awayTeam.logo
                      ? import.meta.env.VITE_DO_IMAGE_HOST + item.awayTeam.logo
                      : "https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png",
                  }
                : {
                    first_name: item.awayPlayer.first_name,
                    last_name: item.awayPlayer.last_name,
                    image:
                      import.meta.env.VITE_DO_IMAGE_HOST +
                      item.awayPlayer.image,
                  },
              dateStart: item.date_start,
              colorScheme: item.sport?.color,
              size: item.is_daily ? "large" : "small", //Ha daily
              sportType: item.sport?.value,
              sport: item.sport,
              isDaily: item.is_daily,
              location: item.location,
              image: import.meta.env.VITE_DO_IMAGE_HOST + item.image,
              homeImage:
                item.home_image !== null
                  ? import.meta.env.VITE_DO_IMAGE_HOST + item.home_image
                  : "https://w7tips.fra1.digitaloceanspaces.com/images%2Fmock-images%2Ffootball-siluett.png",
              awayImage:
                item.away_image !== null
                  ? import.meta.env.VITE_DO_IMAGE_HOST + item.away_image
                  : "https://w7tips.fra1.digitaloceanspaces.com/images%2Fmock-images%2Ffootball-siluett.png",
              league: {
                image: item?.league?.image ?? null,
              },
            };
          });

          state.activeMatches = matches;
        }
      );
  },
});

export const matchApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatchesByDate: builder.query<any, any>({
      query: (data: any) => ({
        body: gql`
          query get_matches_by_date(
            $dateFrom: timestamp!
            $dateEnd: timestamp!
            $customerId: uuid
          ) {
            matches(
              where: {
                date_start: { _gte: $dateFrom }
                date_end: { _lte: $dateEnd }
                analyses: {
                  tips: { customer_tips: { customer_id: { _is_null: false } } }
                }
              }
            ) {
              id
              date_start
              date_end
              is_daily
              sport {
                id
                color
                name
                value
              }
              homeTeam {
                id
                name
                name_extension
                logo
              }
              awayTeam {
                id
                name
                name_extension
                logo
              }
              homePlayer {
                id
                first_name
                last_name
                image
              }
              tv_channel {
                logo
                name
              }
              awayPlayer {
                id
                first_name
                last_name
                image
              }
              analyses {
                tips {
                  customer_tips {
                    id
                  }
                }
              }
            }
            tickets(
              where: {
                start_date: { _gte: $dateFrom }
                customer_tickets: { customer_id: { _eq: $customerId } }
              }
            ) {
              id
              is_premium
              number
              start_date
              ticket_tips(where: {show_calendar: {_eq: 1}}) {
                title
                date_start
                date_end
                league {
                  image
                  name
                  sport {
                    color
                    name
                    value
                  }
                }
                tv_channel {
                  logo
                  name
                }
                match {
                  date_start
                  date_end
                  id
                  sport {
                    id
                    color
                    name
                    value
                  }
                  homeTeam {
                    id
                    name
                    name_extension
                    logo
                  }
                  awayTeam {
                    id
                    name
                    name_extension
                    logo
                  }
                  homePlayer {
                    id
                    first_name
                    last_name
                    image
                  }
                  tv_channel {
                    logo
                    name
                  }
                  awayPlayer {
                    id
                    first_name
                    last_name
                    image
                  }
                }
              }
            }
          }
        `,
        variables: {
          dateFrom: `${data.dateFrom}`,
          dateEnd: `${data.dateEnd}`,
          customerId: `${data.customerId}`,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response,
    }),
    getActiveMatches: builder.query<any, any>({
      query: (args) => ({
        body:
          args?.sportId !== null && args?.sportId !== undefined
            ? gql`
                query ($sportId: uuid) {
                  matches(
                    order_by: { is_daily: desc, date_start: asc }
                    where: {
                      is_closed: { _eq: false }
                      sport: { id: { _eq: $sportId } }
                    }
                  ) {
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
                      value
                    }
                    homeTeam {
                      id
                      name
                      name_extension
                      logo
                    }
                    awayTeam {
                      id
                      name
                      name_extension
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
              `
            : `query {
        matches(order_by: {is_daily: desc, date_start: asc} where: {is_closed: {_eq:false}}) {
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
            value
          }
          homeTeam {
            id
            name
            name_extension
            logo
          }
          awayTeam {
            id
            name
            name_extension
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
            image
          }
        }
      }
      `,
        token: store.getState().auth.accessToken,
        variables: args.sportId
          ? {
              sportId: args.sportId,
            }
          : null,
      }),
      transformResponse: (response) => response.matches,
    }),
    getSportCategories: builder.query<any, any>({
      query: () => ({
        body: gql`
          query GetSports {
            sports {
              id
              name
              value
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.sports,
    }),
    getTipsByDateRange: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
          query getTipsByDateRange($dateFrom: timestamp!, $dateTo: timestamp!) {
            tips(
              where: {
                analyasis: {
                  match: {
                    _and: {
                      date_start: { _gte: $dateFrom }
                      date_end: { _lte: $dateTo }
                      is_closed: { _eq: true }
                    }
                  }
                }
              }
              order_by: { analyasis: { match: { date_start: desc } } }
            ) {
              id
              name
              odds
              rating
              tet
              result
              analyasis {
                match {
                  id
                  date_start
                  homePlayer {
                    first_name
                    last_name
                  }
                  homeTeam {
                    name
                    name_extension
                  }
                  awayPlayer {
                    first_name
                    last_name
                  }
                  awayTeam {
                    name
                    name_extension
                  }
                  league {
                    image
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
              is_closed
              away_image
              location
              field_type
              weather {
                name
                icon
              }
              sport {
                id
                color
                name
                value
              }
              homeTeam {
                id
                name
                name_extension
                logo
              }
              awayTeam {
                id
                name
                name_extension
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
              tv_channel {
                name
                logo
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
                  result
                  customer_tips {
                    id
                    odds
                    tet
                  }
                  customer_tips_aggregate {
                    aggregate {
                      count
                    }
                  }
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
          home: item.homeTeam
            ? {
                name: item.homeTeam.name,
                nameExtension: item.homeTeam?.name_extension,
                logo: item.homeTeam.logo
                  ? import.meta.env.VITE_DO_IMAGE_HOST + item.homeTeam.logo
                  : "https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png",
              }
            : {
                first_name: item.homePlayer.first_name,
                last_name: item.homePlayer.last_name,
                image:
                  import.meta.env.VITE_DO_IMAGE_HOST + item.homePlayer.image,
              },
          away: item.awayTeam
            ? {
                name: item.awayTeam.name,
                nameExtension: item.awayTeam?.name_extension,
                logo: item.awayTeam.logo
                  ? import.meta.env.VITE_DO_IMAGE_HOST + item.awayTeam.logo
                  : "https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png",
              }
            : {
                first_name: item.awayPlayer.first_name,
                last_name: item.awayPlayer.last_name,
                image:
                  import.meta.env.VITE_DO_IMAGE_HOST + item.awayPlayer.image,
              },
          dateStart: item.date_start,
          colorScheme: item.sport?.color ?? "blue",
          size: item.is_daily ? "large" : "small", //Ha daily
          sportType: item.sport.type,
          sport: item.sport,
          isDaily: item.is_daily,
          isClosed: item.is_closed,
          location: item.location,
          weather: {
            name: item.weather?.name,
            icon: item.weather?.icon
              ? import.meta.env.VITE_DO_IMAGE_HOST + item.weather.icon
              : "",
          },
          analyses: item.analyses.length > 0 ? item.analyses?.[0] : [],
          image: import.meta.env.VITE_DO_IMAGE_HOST + item.match_cover,
          homeImage:
            item.home_image !== null
              ? import.meta.env.VITE_DO_IMAGE_HOST + item.home_image
              : "https://w7tips.fra1.digitaloceanspaces.com/images%2Fmock-images%2Ffootball-siluett.png",
          awayImage:
            item.away_image !== null
              ? import.meta.env.VITE_DO_IMAGE_HOST + item.away_image
              : "https://w7tips.fra1.digitaloceanspaces.com/images%2Fmock-images%2Ffootball-siluett.png",
          matchDatas: item.match_datas,
          fieldType: item?.field_type
            ? import.meta.env.VITE_DO_IMAGE_HOST + item.field_type
            : null,
          league: {
            image: item.league?.image ?? null,
          },
          tv: {
            name: item?.tv_channel?.name,
            logo: item?.tv_channel?.logo
              ? import.meta.env.VITE_DO_IMAGE_HOST + item.tv_channel?.logo
              : null,
          },
        };
      },
    }),
    addTipForCustomer: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation InsertTipsMutation(
            $customerId: uuid!
            $tipId: uuid!
            $odds: float8
            $bet: float8
            $betMinus: float8
            $sourceType: String!
            $description: String!
            $createdAt: timestamp!
          ) {
            insert_customer_tips(
              objects: {
                customer_id: $customerId
                tip_id: $tipId
                odds: $odds
                tet: $bet
                created_at: $createdAt
              }
            ) {
              returning {
                id
              }
            }
            insert_customer_transactions(
              objects: {
                amount: $betMinus
                customer_id: $customerId
                source_id: $tipId
                source_type: $sourceType
                description: $description
                created_at: $createdAt
              }
            ) {
              returning {
                description
                source_type
                amount
                customer_id
                source_id
                created_at
              }
            }
          }
        `,
        variables: {
          customerId: arg.customerId,
          tipId: arg.tipId,
          odds: arg.odds,
          bet: arg.bet,
          betMinus: -arg.bet,
          sourceType: arg.sourceType,
          description: arg.description,
          createdAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.insert_customer_tips,
    }),
  }),
});

export const {
  useLazyGetMatchesByDateQuery,
  useGetMatchesByDateQuery,
  useGetActiveMatchesQuery,
  useLazyGetTipsByDateRangeQuery,
  useGetMatchQuery,
  useAddTipForCustomerMutation,
  useLazyGetSportCategoriesQuery,
} = matchApiSlice;

export const { setActiveMatches } = matchSlice.actions;

export default matchSlice.reducer;
