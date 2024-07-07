import React from 'react';
import clouds_texture from './assets/clouds.png';

const Header = ({viewHeight, viewWidth}) => {
const cloudsScale = viewHeight*15/100/600;

  const cloudsArr = Array.from({ length: (viewWidth/(cloudsScale*2500) + 1) }, (_, index) => (
    <img src={clouds_texture} style={{width: cloudsScale*2500, height: cloudsScale*600}}/>
  ));

  return (
    <div className="header" style={{display:"flex", position:"absolute", top: 0, left: 0, width: "100vw", height: "15vh", overflow:"hidden"}}>
      {cloudsArr}
      <div>

      </div>
    </div>
  );
};

export default Header;