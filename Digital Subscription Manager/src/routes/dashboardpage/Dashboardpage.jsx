import {Link, useNavigate } from "react-router-dom";
import "./dashboardpage.css"
import {useAuth} from "@clerk/clerk-react";
import { useEffect} from "react";

const Dashboardpage = () => {

  const {userId, isLoaded} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in");
    }
  },[isLoaded, userId, navigate]);

  if(!isLoaded) return "Loading....";

  return (
    <div className="dashboardpage">
    
    <div className="options">
        <div className="option">
          <img src="/subscription.png" alt="" />
          {/* <Link to="/subscription">See your subscriptions</Link> */}
          <span>See your subscriptions</span>
        </div>
        <div className="option">
          <img src="/magnifyingglass.jpg" alt="" />
          <span>Find a Movie</span>
        </div>
        <div className="option">
          <img src="/notification.png" alt="" />
          <span>Get Alerts</span>
        </div>
      </div>
     </div>  
  )
}

export default Dashboardpage

