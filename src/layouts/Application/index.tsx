import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Footer, MobileMenuBar, SideMenuBar } from '../../components';
import { useGetNotificationsQuery } from '../../redux/NotificationSlice';
import { Header } from './../../components/Header';
import './index.scss';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useSubscription } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import store from '../../redux/store';
import { useNotification } from '../../hooks/useNotification';
import _ from 'lodash';
import { useGetBankQuery } from '../../redux/BankSlice';

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element | string
}

const Layout = ({ children }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState();
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const [initNotifications, setInitNotifications] = useState(false);
  const location = useLocation();


  const { newPushToast } = useNotification({
    theme: 'colored',
  })
  const { loading, error, data } = useSubscription(
    gql`
      subscription getNotifications {
        notifications(order_by: {created_at: desc}) {
              id
              type
              title
              content
              action
              read
              read_at
              created_at
              updated_at
            }
      }
    `
  );


  useEffect(() => {
    if (data) {
      if (initNotifications === false) {
        setCurrentNotifications(data?.notifications);
        setInitNotifications(true);
      }



      if (initNotifications) {
        _.differenceBy(data?.notifications, currentNotifications, 'id').map((item: any) => {
          newPushToast(item.title, item.content)
        });
        

        setCurrentNotifications(data?.notifications)
      }
    }

  }, [data])
  const { isLoading, data: ASD, refetch } = useGetNotificationsQuery({});

  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add('app-body');
  }, [])


  return (
    <>
      <div className="text-white flex bg app-body min-h-[100vh]">
        <div className="hidden md:block w-[200px] lg:w-[320px]">
          <SideMenuBar />
        </div>
        <main className="relative sm:flex-2 pb-footerHeight flex flex-col sm:w-[300px] sm:px-0 w-full">
          <Header variant={'secondary'} notifications={currentNotifications} />
          <MobileMenuBar visible={showMenu} />
          <div>
            {children}
          </div>
        </main>
      </div>
      <></>
    </>
  )
}
export default ({ children }: LayoutProps) => {
  const token = store.getState().auth.accessToken

  const client = new ApolloClient({
    link: new WebSocketLink({
      uri: import.meta.env.VITE_HASURA_URL_WS,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Notifications: {
          keyFields: ["id"],
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>{children}</Layout>
    </ApolloProvider>

  )
}