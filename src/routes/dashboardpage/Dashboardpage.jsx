import { Link, useNavigate } from "react-router-dom";
import "./dashboardpage.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const Dashboardpage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="dashboardpage">
      <div className="options">
        <Link className="option" to="/subscription">
          <img src="/subscription.png" alt="Subscription" />
          <span>See your subscriptions</span>
        </Link>

        <Link className="option" to="/search-page">
          <img src="/magnifyingglass.jpg" alt="Search" />
          <span>Find a Movie</span>
        </Link>

        <Link className="option" to="/alerts">
          <img src="/notification.png" alt="Alerts" />
          <span>Get Alerts</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboardpage;
