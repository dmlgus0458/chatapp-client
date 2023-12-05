import {io} from "socket.io-client";
const socker = io("http://localhost:5001");
export default socker;