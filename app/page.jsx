import './globals.css';
import Image from 'next/image';
import github_logo from './assets/github_logo.svg';
import itchio_logo from './assets/itchio_logo.svg';
import devpost_logo from './assets/devpost_logo.svg';

export default function Home() {
  
  return (
    <div className="Home" style={{display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden"}}>
      <div className="all-content" style={{position:"absolute", top: 0, left: 0}}>
        <div className="title" style={{textAlign:"left", color:"white", padding:"100px", padding:"180px", textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)"}}>
          <h1>Hey!</h1>
          <h1>I'm Sofia Egan</h1>
          <h2 style={{width:"50vw"}}>My username is EerierGosling - you might see that around on my profiles!</h2>
          <p style={{width:"50vw"}}>
            I'm a high schooler in the Boston area.
            I go to a lot of hackathons and I've run some of my own! I ran <a href="https://hacknight.co/">HacKnight</a> and was an organizer for <a href="https://counterspell.hackclub.com">Counterspell</a> globally and <a href="https://counterspell.hackclub.com/boston">Counterspell Boston</a>.
            I enjoy working with a diverse range of platforms and technologies, including apps, websites, games, and random ML and data analysis projects in Python.
          </p>
          <div>
            <a href="https://github.com/EerierGosling">
              <Image className="social-link" src={github_logo} alt="GitHub Logo" width={50} height={50} />
            </a>
            <a href="https://eeriergosling.itch.io/">
              <Image className="social-link" src={itchio_logo} alt="Itch.io Logo" width={50} height={50} />
            </a>
            <a href="https://devpost.com/segan">
              <Image className="social-link" src={devpost_logo} alt="Devpost Logo" width={50} height={50} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
