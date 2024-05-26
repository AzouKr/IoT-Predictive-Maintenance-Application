import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = ({ id }) => {
  return (
    <nav>
      <div className="profile-container">
        <Link to={`/machine-overview/${id}`}>
          <button>Overview</button>
        </Link>
        <Link to={`/machine-overview/${id}/AlarmMachine`}>
          <button>Alarms</button>
        </Link>
        <Link to={`/machine-overview/${id}/referenceSystem`}>
          <button>Reference system</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
