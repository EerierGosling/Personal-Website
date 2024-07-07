import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import github_logo from './assets/github_logo.svg';
import itchio_logo from './assets/itchio_logo.svg';
import devpost_logo from './assets/devpost_logo.svg';

function Home({scrollY, viewHeight, viewWidth}) {

  return (
    <div className="Home" style={{display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden"}}>

      <div className="all-content" style={{position:"absolute", top: 0, left: 0}}>
        <div className="title" style={{height:"100vh", textAlign:"left", color:"white", margin:"100px", marginTop:"180px", textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)"}}>
          <h1>Hi!</h1>
          <h1>I'm Sofia Egan</h1>
          <p style={{width:"40vw"}}>I'm a high schooler in the Boston area. I go to a lot of hackathons and I ran my own this spring, called <a href="https://hacknight.co">HacKnight</a>! <br></br>I enjoy working with a diverse range of platforms and technologies, including apps, websites, games, and random ML and data analysis projects in Python.</p>
          <div>
            <a href="https://github.com/EerierGosling"> <img className="social-link" src={github_logo}></img> </a>
            <a href="https://eeriergosling.itch.io/"> <img className="social-link" src={itchio_logo}></img> </a>
            <a href=" https://devpost.com/segan"> <img className="social-link" src={devpost_logo}></img> </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
