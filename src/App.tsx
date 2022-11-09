// @ts-ignore
import React from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Landing from './pages/Landing';
import LandingSuccess from './pages/LandingSuccess';
import Dashboard from './pages/Dashboard';
import Developing from './pages/Developing';
import Analyses from './pages/Analyses';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Live from './pages/Live';
import Challenge from './pages/Challenge';
import Bank from './pages/Bank';
import Marketplace from './pages/Marketplace';
import Informations from './pages/Informations';
import Settings from './pages/Settings';
import PageLayout from './layouts/Landing';
import ApplicationLayout from './layouts/Application';
import store from './redux/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {

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
        <Provider store={store}>
          <Routes>

            <Route element={<PageLayout><Outlet /></PageLayout>}>
              <Route path="/" element={<Landing />} />
              <Route path="/subscribe-success" element={<LandingSuccess />} />
            </Route>
            <Route element={<ApplicationLayout><Outlet /></ApplicationLayout>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/developing" element={<Developing />} />
              <Route path="/analyses" element={<Analyses />} />
              <Route path="/challenges" element={<Challenge />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/live" element={<Live />} />
              <Route path="/bank" element={<Bank />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/informations" element={<Informations />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes >
        </Provider>
      </CookiesProvider>
    </HelmetProvider>
  )
}

export default App
