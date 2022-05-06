import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Scan from './pages/Scan';
import Scanned from './pages/Scanned';
import UploadImage from './pages/UploadImage';

export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="scan" element={<Scan />} />
          <Route path="create" element={<Create />} />
          <Route path="scanned/:data" element={<Scanned />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
