import { Link } from "react-router-dom"
import "./homepage.css"
// import { TypeAnimation } from "react-type-animation";
// import { useState } from "react";

const Homepage = () => {

  // const [typingStatus,setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      <img src="/orbital.png"  className="orbital" alt="" />
      <div className="left">
        <h1>StreamManage</h1>
        <h2>Effortless Subscription Management, All in One Place</h2>
        <h3>Manage your digital subscriptions with ease. Streamline your entertainment choices, track payments, and get personalized content suggestions—all from a single platform.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/homepageimg.jpg" className="bot" alt="" />
          {/* <div className="chat">
            <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "bot2.png"} alt="" />
          <TypeAnimation
            sequence={[
              'Can you share a motivational quote?',
              2000, ()=>{
                setTypingStatus("bot")
              },
              'The only way to do great work is to love what you do.',
              2000,()=>{
                setTypingStatus("human1")
              },
              ' What’s the translation for “hello” in French?',
              2000,()=>{
                setTypingStatus("bot")
              },
              ' “Hello” in French is “Bonjour"',
              2000,()=>{
                setTypingStatus("human2")
              },
            ]}
            wrapper = "span"
            repeat = {Infinity}
            cursor = {true}
            omitDeletionAnimation = {true}
    />
          </div> */}
        </div>
      </div>

      <div className="terms">
        <img src="/logo.avif" alt="" />
        <div className="links">
          <Link to="/">Terms of Services</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
          <span>|</span>
          <a href="mailto:aggarwalsachin1818@gmail.com">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Homepage