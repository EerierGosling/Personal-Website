"use client"

import "./globals.css";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clouds_texture from './assets/clouds.png';
import Snowfall from './components/Snowfall.jsx';

export default function Layout({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const [scrollHeight, setScrollHeight] = useState(0);

  const cloudsScale = viewHeight * 15 / 100 / 600;

  const cloudsArr = Array.from({ length: (viewWidth / (cloudsScale * 2500) + 1) }, (_, index) => (
    <Image key={index} src={clouds_texture} width={cloudsScale * 2500} height={cloudsScale * 600} alt="clouds" />
  ));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
      setScrollHeight(document.documentElement.scrollHeight);

      console.log(document.documentElement.scrollHeight)
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <html>
      <body>
        <div className="App" style={{ display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", zIndex: -10, margin: 0, padding: 0, top: 0, left: 0 }}>
            <Snowfall />
          </div>

          <div className="header" style={{ display: "flex", flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, width: "100vw", height: "15vh", overflow: "hidden" }}>
            {cloudsArr}
            <nav>
              <div style={{ display: "flex", position: "absolute", justifyContent: "flex-end", alignItems: "center", right: 0, margin: "10px", marginRight: "40px", marginTop: "8px" }}>
                <div className="header-link"><Link href="/"><p className="header-link-text">Home</p></Link></div>
                <div className="header-link"><Link href="/projects"><p className="header-link-text">Projects</p></Link></div>
              </div>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>

  );
}