import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';

function App() {

  const [scrollY, setScrollY] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('rezize', handleResize);
    };

  }, [scrollY]);
  
  return (
    <div className="App" style={{display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden"}}>
      <Header viewHeight={viewHeight} viewWidth={viewWidth} />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;
