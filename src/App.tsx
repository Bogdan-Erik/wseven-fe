import React from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Developing from './pages/Developing';
import PageLayout from './layouts/Landing';
import ApplicationLayout from './layouts/Application';
import store from './redux/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';


function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Routes>
          <Route element={<PageLayout><Outlet /></PageLayout>}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route element={<ApplicationLayout><Outlet /></ApplicationLayout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/developing" element={<Developing />} />
          </Route>
        </Routes >
      </Provider>
    </CookiesProvider>
  )
}

export default App
