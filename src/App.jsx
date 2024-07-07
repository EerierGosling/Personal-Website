import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Projects from './Projects.jsx';
import Snowfall from './Snowfall.jsx';
import clouds_texture from './assets/clouds.png';

function App() {

  const [scrollY, setScrollY] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const cloudsScale = viewHeight*15/100/600;

  const cloudsArr = Array.from({ length: (viewWidth/(cloudsScale*2500) + 1) }, (_, index) => (
    <img src={clouds_texture} style={{width: cloudsScale*2500, height: cloudsScale*600}}/>
  ));

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
    <div>
      <div className="App" style={{display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden"}}>
        <div style={{position:"absolute", zIndex: -10, margin:0, padding:0, height:document.body.scrollHeight+10000, top: 0, left: 0}}>
          <Snowfall height={document.body.scrollHeight+10000}/>
        </div>

        <div className="header" style={{display:"flex", flexDirection: "row", position:"absolute", top: 0, left: 0, right: 0, width: "100vw", height: "15vh", overflow:"hidden"}}>
          {cloudsArr}
          <nav>
            <div style={{display:"flex", position:"absolute", justifyContent: "flex-end", alignItems: "center", right: 0, margin:"10px", marginRight:"40px", marginTop:"8px"}}>
                <div className="header-link"><Link to="/"><p className="header-link-text">Home</p></Link></div>
                <div className="header-link"><Link to="/projects"><p className="header-link-text">Projects</p></Link></div>
                {/* Add more navigation links as needed */}
            </div>
          </nav>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home scrollY={scrollY} viewHeight={viewHeight} viewWidth={viewWidth} />} />
          <Route path="/projects" element={<Projects scrollY={scrollY} viewHeight={viewHeight} viewWidth={viewWidth} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
