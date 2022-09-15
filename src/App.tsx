import React from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import PageLayout from './layouts/Landing';
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes >
      </PageLayout>
    </Provider>

  )
}

export default App
