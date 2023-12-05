import { useEffect } from "react";
import "./App.css";
import socket from "./server";
import { useState } from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);
  useEffect(()=>{
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUsername( );
  }, []);
  //userName 받아오는 부분
  const askUsername=()=>{
    //promt 창에 입력받은 값을 userName으로 가져온다
    const userName = prompt("당신의 이름을 입력하세요");
    console.log("uuu",userName);
    //userName을 socket로 전송
    socket.emit("login",userName,(res)=>{
      if(res?.ok){
        setUser(res.data);
      }
    });
  };
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      //setMessage 공백 으로 처리해서 input form 비워줌
      setMessage("");
    });
  };
  return (
    <div>
      <div className="App"> 
        <MessageContainer messageList={messageList} user={user}/>
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
