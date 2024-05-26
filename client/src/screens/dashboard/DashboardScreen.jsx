// import React from "react";
import { AreaCards, AreaTable, AreaTop, AreaTable2 } from "../../components";
import { io } from "socket.io-client";
// import { getData } from "../../Hooks/GetData";
// import AreaTableRM from "../../components/dashboard/areaTable/AreaTableRM";
// import AreaTableMT from "../../components/dashboard/areaTable/AreaTableMT";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";
// import socket from "../../socket";

// const Dashboard = () => {
//   const [hm, sethm] = React.useState([]);
//   const [rm, setrm] = React.useState([]);
//   const [mt, setmt] = React.useState([]);
//   const [stats, setstats] = React.useState({});
//   const socket = io(backend_url_socket);

//   const fetchData = async () => {
//     const data = await getData();
//     sethm(data[0]);
//     setrm(data[1]);
//     setmt(data[2]);
//     setstats(data[3]);
//   };

//   React.useEffect(() => {
//     fetchData();
//   }, []);

//   socket.on("getData", (data) => {
//     sethm(data[0]);
//     setrm(data[1]);
//     setmt(data[2]);
//     setstats(data[3]);
//   });

//   const HM_TABLE_HEADS = [
//     //ask azouuuu if we should add more details
//     "ID",
//     "Air Temp (K)",
//     "Process Temp (K)",
//     "Rotational speed",
//     "Torque",
//     "Tool Wear",
//     "Status",
//   ];
//   const RM_TABLE_HEADS = [
//     //ask azouuuu if we should add more details
//     "ID",
//     "Air Temp (K)",
//     "Process Temp (K)",
//     "Rotational speed",
//     "Torque",
//     "Tool Wear",
//     "Status",
//   ];
//   const MT_TABLE_HEADS = [
//     //ask azouuuu if we should add more details
//     "ID",
//     "Air Temp (K)",
//     "Process Temp (K)",
//     "Rotational speed",
//     "Torque",
//     "Tool Wear",
//     "Status",
//   ];
//   return (
//     <div className="content-area">
//       <AreaTop />
//       <AreaCards data={stats} />
//       <AreaTableRM name="Rotating Machines" data={rm} head={RM_TABLE_HEADS} />
//       <AreaTableMT name="Machine Tools" data={mt} head={MT_TABLE_HEADS} />
//       <AreaTable name="Hydrolic Machines" data={hm} head={HM_TABLE_HEADS} />
//     </div>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  const socket = io(backend_url_socket, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
      "Another-Header": "HeaderValue",
    },
  });
  socket.on("connect", () => {});

  // socket.on("getData", (data) => {
  //   console.log(data);
  // });
  // socket.on("getMachineAlerts", (data) => {
  //   console.log(data);
  // });
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaTable />
      <AreaTable2 />
    </div>
  );
};

export default Dashboard;
