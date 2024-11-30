import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";
import { gsap } from "gsap";

const Homepage = () => {
  
  useEffect(() => {
    // GSAP animation for text
    gsap.fromTo(
      ".animate-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power4.in" }
    );
  }, []);
  
  return (
    <div className="homepage">
      <img src="/bg3.jpg" className="orbital" alt="" />
      <div className="left">
        <h1 className="animate-text">StreamManage</h1>
        <h2 className="animate-text" id="tagline">Effortless Subscription Management, All in One Place</h2>
        <h3 className="animate-text" id="para">
          Manage your digital subscriptions with ease. Streamline your
          entertainment choices, track payments, and get personalized content
          suggestions—all from a single platform.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>

      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/homepageimg.jpg" className="ottImage" alt="" />
          <div className="chat">
            <TypeAnimation
              sequence={[
                "See your subscriptions",
                2000,
                "Find a Movie",
                2000,
                "Get Alerts",
                2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
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

export default Homepage;