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

  if(!isLoaded) return <div>Loading....</div>;

  return (
    <div className="dashboardpage">
    
    <div className="options">

        <div className="option">
          <img src="/subscription.png" alt="" />
          <Link to="/subscription">See your subscriptions</Link>
        </div>

        <div className="option">
          <img src="/magnifyingglass.jpg" alt="" />
          { <Link className="navlink" to="/search-page">Find a Movie</Link> }
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

