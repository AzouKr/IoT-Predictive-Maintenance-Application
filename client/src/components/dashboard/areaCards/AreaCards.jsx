import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = ({ data }) => {
  const calculatePercentage = (number) => {
    return (number * 100) / 16;
  };
  return (
    <section className="content-area-cards">
      <AreaCard
        // colors={["#e4e8ef", "#475be8"]}
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={calculatePercentage(data.marche)}
        cardInfo={{
          title: "En marche",
          value: data.marche,
          text: "########",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={calculatePercentage(data.danger)}
        cardInfo={{
          title: "En danger",
          value: data.danger,
          text: "#######",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#b30000"]}
        percentFillValue={calculatePercentage(data.panne)}
        cardInfo={{
          title: "En panne",
          value: data.panne,
          text: "#######",
        }}
      />
    </section>
  );
};

export default AreaCards;
