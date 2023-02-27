// @ts-ignore
// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import Landing from './pages/Landing';
import LandingSuccess from './pages/LandingSuccess';
import Dashboard from './pages/Dashboard';
import Developing from './pages/Developing';
import Analyses from './pages/Analyses';
import AnalysesOverview from './pages/AnalysesOverview';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Live from './pages/Live';
import Challenge from './pages/Challenge';
import Bank from './pages/Bank';
import Tickets from './pages/Tickets';
import Marketplace from './pages/Marketplace';
import Informations from './pages/Informations';
import Settings from './pages/Settings';
import PageLayout from './layouts/Landing';
import ApplicationLayout from './layouts/Application';
import AuthLayout from './layouts/Auth';
import store from './redux/store'
import { Provider, useSelector } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from './utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify'

//Auth
import LoginPage from './pages/Auth/Login';
import { setAuthToken } from './redux/authSlice';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import moment from 'moment';

import 'moment/locale/hu'  // without this line it didn't work


const App = () => {
  moment.locale('hu') // can pass in 'en', 'fr', or 'es'

  const token = store.getState().auth.accessToken
  const workerRef = useRef<SharedWorker>()
  const navigate = useNavigate();


  useEffect(() => {
    const accessToken = store.getState().auth.accessToken
    const refreshToken = store.getState().auth.refreshToken

    if (accessToken && workerRef.current === undefined) {
      const mutations = {
        SET_TOKENS: 'SET_TOKENS',
        OTHER: 'OTHER',
        CLOSE: 'CLOSE',
      }

      workerRef.current = new SharedWorker('src/sw.js', { name: 'authWorker' })
      workerRef.current?.port.postMessage({
        mutation: 'SET_URL',
        data: {
          url: `/${import.meta.env.VITE_BASE_URL}/auth-token`,
        },
      })

      workerRef.current.port.addEventListener(
        'message',
        function (eventM) {
          const data = eventM.data
          const { mutation, data: dat } = data

          switch (mutation) {
            case mutations.SET_TOKENS:
              store.dispatch(setAuthToken(dat.accessToken))
              if (dat.accessToken === null) {
                return navigate('/login');
              }
              break
            case mutations.OTHER:
              break
          }
        },
        false,
      )
      workerRef.current.port.start()

      workerRef.current?.port.postMessage({
        mutation: 'SET_TOKENS',
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      })

      workerRef.current.port.addEventListener(
        'error',
        function (e) {
          console.error(e)
          throw new Error(
            'workerRef.current Error: could not open SharedWorker',
          )
        },
        false,
      )

      workerRef.current.port.addEventListener('beforeunload', function () {
        workerRef.current?.port.postMessage({ mutation: 'CLOSE' })
      })
    }
  }, [token])

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <HelmetProvider>
        <CookiesProvider>
          <Helmet>
            {import.meta.env.VITE_DEBUG === "false" && (
              <>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-4Z8GTLCFJZ"></script>
                <script async src={"https://w7tips.fra1.digitaloceanspaces.com/js/gtag.js"}></script>
                <script async src={"https://w7tips.fra1.digitaloceanspaces.com/js/hotjar.js"}></script>
                <script async src={"https://w7tips.fra1.digitaloceanspaces.com/js/pixel.js"}></script>
                <meta name="facebook-domain-verification" content="88eyjaqvfvh5biu683977wqlrwq8di" />
              </>
            )}

          </Helmet>
          {import.meta.env.VITE_ENV === 'dev' && (<div className="absolute right-[-50px] z-[1000] top-[40px] bg-yellow px-[50px] py-[5px] font-[600] rotate-45">DEVELOPMENT</div>)}
          <Provider store={store}>
            
              <ToastContainer
                hideProgressBar={true}
                limit={3}
                newestOnTop={true}
                position="bottom-left"
                pauseOnFocusLoss={true}
                pauseOnHover={true}
                toastClassName={({ type }) => "bg-gradient-to-br from-[#393946] to-[#1C1C2D] relative flex px-[16px] py-[10px] min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mb-[15px]"
                }
              />
              <Routes>

                <Route element={<PageLayout><Outlet /></PageLayout>}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/subscribe-success" element={<LandingSuccess />} />
                </Route>
                <Route element={<AuthLayout><Outlet /></AuthLayout>}>
                  <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedRoute><ApplicationLayout><Outlet /></ApplicationLayout></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/developing" element={<Developing />} />
                  <Route path="/analyses-overview/:id" element={<AnalysesOverview />} />
                  <Route path="/analyses-overview" element={<AnalysesOverview />} />
                  <Route path="/analyses/:id" element={<Analyses />} />
                  <Route path="/challenges" element={<Challenge />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/live" element={<Live />} />
                  <Route path="/bank" element={<Bank />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/informations" element={<Informations />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/:id" element={<Settings />} />
                </Route>
              </Routes >
          </Provider>
        </CookiesProvider>
      </HelmetProvider>
    )
  }
}

export default App
