import { Link } from "react-router-dom"
import "./dashboardpage.css"

const Dashboardpage = () => {
  return (
    <div className="dashboardpage">
      <header>
        <Link to="">
            <img src="/logo.avif" alt="" />
            <span>StreamManage</span>
        </Link>
      </header>
    </div>
  )
}

export default Dashboardpage
