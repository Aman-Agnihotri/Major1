import { Outlet, useNavigate } from "react-router-dom";
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
      <Outlet/>
    </div>
  
  )
}

export default Dashboardpage

