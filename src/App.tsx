import React from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Developing from './pages/Developing';
import Analyses from './pages/Analyses';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Rewards from './pages/Rewards';
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
import { ChartProvider } from './providers/ChartProvider'

function App() {
  return (
    <CookiesProvider>
      <ChartProvider>
      <Provider store={store}>
        <Routes>
          <Route element={<PageLayout><Outlet /></PageLayout>}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route element={<ApplicationLayout><Outlet /></ApplicationLayout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/developing" element={<Developing />} />
            <Route path="/analyses" element={<Analyses />} />
            <Route path="/challenges" element={<Challenge />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/informations" element={<Informations />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes >
      </Provider>
      </ChartProvider>
    </CookiesProvider>
  )
}

export default App
