import "./Nav.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Nav = ({ id }) => {
  const { t } = useTranslation();

  return (
    <nav>
      <div className="profile-container">
        <Link to={`/machine-overview/${id}`}>
          <button>{t("Overview")}</button>
        </Link>
        <Link to={`/machine-overview/${id}/AlarmMachine`}>
          <button>{t("Alarms")}</button>
        </Link>
        <Link to={`/machine-overview/${id}/referenceSystem`}>
          <button>{t("Reference system")}</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
