import { AreaTop } from "../../components";
import "./index.css";
import { SideM, Card } from "../../components";
import HM from "../../assets/images/HM.png";
import MT from "../../assets/images/MT.png";
import RM from "../../assets/images/RM.jpg";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";

const Maintenance = () => {
  const [data, setdata] = useState();
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  console.log(selectedType);

  useEffect(() => {
    const socket = io(backend_url_socket, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
        "Another-Header": "HeaderValue",
      },
    });

    socket.on("connect", () => {});

    socket.on("getData", (data) => {
      setdata(data[0]);
    });
  }, []);

  const getColor = (failure) => {
    if (failure === 0) return "green";
    if (failure === 1) return "red";
    return "orange";
  };

  const filteredData = data
    ? data.filter((item) => {
        const itemColor = getColor(item.failure);
        return (
          (selectedType === "" || item.id.slice(0, 2) === selectedType) &&
          (selectedColor === "" || itemColor === selectedColor)
        );
      })
    : [];

  return (
    <div className="content-area">
      <AreaTop />
      <SideM
        setSelectedType={setSelectedType}
        setSelectedColor={setSelectedColor}
      />
      {/* <Machines result={result} /> */}
      <section className="card-container">
        {filteredData.map((item, id) => (
          <Card
            key={item.id}
            img={
              item.id.slice(0, 2) === "HM"
                ? HM
                : item.id.slice(0, 2) === "RM"
                ? RM
                : MT
            }
            id={item.id}
            airTemperature={item.airTemperature}
            color={
              item.failure === 0
                ? "green"
                : item.failure === 1
                ? "red"
                : "orange"
            }
            type={
              item.id.slice(0, 2) === "HM"
                ? "Hydrolic Machine"
                : item.id.slice(0, 2) === "RM"
                ? "Rotational Machine"
                : "Machine Tool"
            }
            temp={Number(item.airTemperature).toFixed(2)}
          />
        ))}
      </section>
    </div>
  );
};

export default Maintenance;
