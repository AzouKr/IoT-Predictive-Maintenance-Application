import CircularM from "./CircularM";
import "./CircularCharts.scss";

const CircularCharts = ({ state }) => {
  return (
    <div className="flex flex-col gap-1 ">
      <section className="content-area-charts w-full ">
        <CircularM
          percentFillValue={((state.airTemperature * 100) / 400).toFixed(0)}
          cardInfo={{
            title: "Temperature",
            value: Number(state.airTemperature).toFixed(2),
          }}
        />
        <CircularM
          percentFillValue={(
            (state.currentRotatinalSpeed * 100) /
            2000
          ).toFixed(0)}
          cardInfo={{
            title: "Rotation speed",
            value: state.currentRotatinalSpeed,
          }}
        />
      </section>
      <section className="content-area-charts">
        <CircularM
          percentFillValue={((state.torque * 100) / 90).toFixed(0)}
          cardInfo={{
            title: "Torque",
            value: Number(state.torque).toFixed(2),
          }}
        />
        <CircularM
          percentFillValue={((state.toolWear * 100) / 80).toFixed(0)}
          cardInfo={{
            title: "Tool wear",
            value: Number(state.toolWear).toFixed(2),
          }}
        />
      </section>
    </div>
  );
};

export default CircularCharts;
