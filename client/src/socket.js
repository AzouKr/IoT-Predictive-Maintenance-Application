import { io } from "socket.io-client";
import { backend_url_socket } from "./Hooks";
import secureLocalStorage from "react-secure-storage";

const socket = io(backend_url_socket, {
  withCredentials: true,
  extraHeaders: {
    Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
    "Another-Header": "HeaderValue",
  },
});

export default socket;
