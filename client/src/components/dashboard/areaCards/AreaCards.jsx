import React from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import socket from "../../../socket"; // Import the socket module

const AreaCards = () => {
  const [stats, setstats] = React.useState({});

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
          title: "En marche",
          value: stats.marche,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={(stats.danger * 100) / 16}
        cardInfo={{
          title: "En danger",
          value: stats.danger,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#b30000"]}
        percentFillValue={(stats.panne * 100) / 16}
        cardInfo={{
          title: "En panne",
          value: stats.panne,
        }}
      />
    </section>
  );
};

export default AreaCards;
