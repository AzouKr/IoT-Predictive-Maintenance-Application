import React from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import socket from "../../../socket"; // Import the socket module
import { useTranslation } from "react-i18next";

const AreaCards = () => {
  const [stats, setstats] = React.useState({});
  const { t } = useTranslation();

  socket.on("getData", (data) => {
    setstats(data[1]);
  });
  return (
    <section className="content-area-cards">
      <AreaCard
        // colors={["#e4e8ef", "#475be8"]}
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={(stats.marche * 100) / 16}
        cardInfo={{
          title: t("Running"),
          value: stats.marche,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={(stats.danger * 100) / 16}
        cardInfo={{
          title: t("In danger"),
          value: stats.danger,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#b30000"]}
        percentFillValue={(stats.panne * 100) / 16}
        cardInfo={{
          title: t("Broken"),
          value: stats.panne,
        }}
      />
    </section>
  );
};

export default AreaCards;
