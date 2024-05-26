import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";
import Maintenance from "./maintenance-overview";

const index = () => {
  const socket = io(backend_url_socket, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
      "Another-Header": "HeaderValue",
    },
  });
  socket.on("connect", () => {});
  return <Maintenance />;
};

export default index;
