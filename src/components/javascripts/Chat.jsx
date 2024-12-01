import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import RideShareContract from '../../contracts/RideShare.json';
import axios from 'axios';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FaPaperPlane, FaSearch, FaUserCircle } from 'react-icons/fa';
import { BsChatDotsFill } from 'react-icons/bs';

const socket = io('http://localhost:4000');

function Chat({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([username]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = RideShareContract.networks[networkId];
        
        const contractInstance = new web3Instance.eth.Contract(
          RideShareContract.abi,
          deployedNetwork.address
        );

        setWeb3(web3Instance);
        setContract(contractInstance);
      }
    };

    initWeb3();
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      try {
        if (contract) {
          const accounts = await web3.eth.getAccounts();
          await contract.methods.storeMessage(
            room,
            messageData.message
          ).send({ from: accounts[0] });
        }

        await axios.post('http://localhost:4000/messages', messageData);
        await new Promise((resolve) => {
          socket.emit("send_message", messageData, resolve);
          setCurrentMessage("");
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const receiveMessageHandler = (data) => {
    setMessageList((prevList) => [...prevList, data]);
    console.log('event receive message init');
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/messages/${room}`)
      .then((response) => {
        setMessageList(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving chat history:', error);
      });

    socket.on("receive_message", receiveMessageHandler);

    socket.on('user_entered', (data) => {
      setUsersInRoom((users) => {
        if (!users.includes(data)) {
          return [...users, data];
        }
        return users;
      });
    });

    socket.on('users_in_room', (users) => {
      setUsersInRoom(users);
    });

    socket.emit('join_room', { room, username });

    return () => {
      socket.off('receive_message', receiveMessageHandler);
      socket.off("user_entered");
    };
  }, [room, username]);

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <div style={{height:"85vh", width:"40vw"}}>
        <div className="friendlist" style={{marginTop:'2vh', paddingBottom:'2vh', marginLeft:'2vh'}}>
          <div style={{ position: "relative" }}>
            <input
              type='text'
              placeholder='Search for fellow Peers on Ride'
              style={{
                marginLeft: "17px",
                height: "40px",
                width: "35vw",
                padding: "10px",
                paddingLeft: "40px",
                fontSize: "20px",
                marginTop: '2vh'
              }}
            />
            <span style={{
              position: "absolute",
              top: "50%",
              left: "2vw",
              transform: "translateY(-50%)",
              color: "#999",
              fontSize: "20px"
            }}>
              <FaSearch />
            </span>
          </div>

          <div className='friendlist-names' style={{overflowY:"scroll", height:'60vh'}}>
            {usersInRoom.map((user, index) => (
              <div key={index} className={username === user ? 'G2 currentUser' : 'G2'}>
                <FaUserCircle style={{fontSize:"40px", marginRight:"10px"}}/>{user}
              </div>    
            ))}            
          </div>
          <div>
            {usersInRoom.length > 1 && (
              <div className='G2'>
                {`${usersInRoom.length - 1} Other User${usersInRoom.length-1 > 1 ? 's' : ''} online`}
              </div> 
            )}
          </div>
        </div>
      </div>

      <div style={{height:"85vh", width:"58vw", marginLeft:'2vw'}}>
        <div className='chat-window'>
          <div className='chat-header'>
            <p><BsChatDotsFill style={{color:"white", fontSize:"30px", marginRight:"10px"}}/>Live Chat</p>
          </div>
          <div className='chat-body' style={{height:"70vh"}}>
            <ScrollToBottom className='message-container'>
              {messageList.map((messageContent, index) => (
                <div key={index} className='message' id={username === messageContent.author ? "other" : "you"}>
                  <div>
                    <div className='message-content'>
                      <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                      <div id="time">{messageContent.time}</div>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <div className='chat-footer'>
            <input 
              type="text" 
              value={currentMessage} 
              placeholder='Type your message'
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}
            />
            <button onClick={sendMessage}><FaPaperPlane/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
