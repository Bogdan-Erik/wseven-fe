import React from 'react';
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SportCard } from './components/SportCard';
import { Routes, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import PageLayout from './layouts/Landing';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/wseven-fe/" element={<Landing />} />
        <Route path="/" element={<Landing />} />
      </Routes >
    </PageLayout>
  )
}

export default App
