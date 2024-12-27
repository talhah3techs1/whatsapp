import React, { useEffect, useState ,useRef } from 'react';
import { FaPaperPlane, FaSearch, FaArrowLeft, FaPhone } from 'react-icons/fa';
import io from 'socket.io-client';





const Chats = () => {

  const token = JSON.parse(localStorage.getItem('token'));
  const [users, setUsers] = useState([]);
  const [clients,setClients] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKey, setApiKey] = useState('');
  const clientsRef = useRef(clients); 



  useEffect(() => {
    // Update the ref whenever `clients` changes
    clientsRef.current = clients;
  }, [clients]);
  

  useEffect(()=>{
    

    const getMsgs = async() =>{
  
      try {
        let res = await fetch('http://localhost:5000/chats/getall',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({token:token})
          

        });
        
      if(res.ok){
        const data = await res.json();
        setClients(data?.message);
        console.log(data?.message);
        
      }
      } catch (error) {
        console.log(error);   
      }
  
  
    }
  
    getMsgs();
  
    
  
  },[])
  
  useEffect(()=>{
    const socket = io('http://localhost:5000');
    // http://194.163.170.219:3000

    // Listen for messages from the server
    
    socket.on('new-message', (data) => {
      console.log('new-message ', data);
  
    
      let updatedClients = [...clientsRef.current];  // Create a copy of clients list
      console.log('updated ', updatedClients);
    
      let findClient = updatedClients.find(client => client.clientNum == data.to);  // Find client by `to`
    
      if (findClient) {
        let userFind = findClient.messages.find(client => client.userNum == data.from);  // Check if sender exists
    
        if (userFind) {
          userFind.message.push({
            to: data.to,
            msg: data.body,
            from: data.from,
            _id: `${Math.random() * 9}`,
            currentTime: new Date(Date.now()),
          });
        } else {
     
          findClient.messages.push({
            userNum: data.from,
            message: [{
              to: data.to,
              msg: data.body,
              from: data.from,
              _id: `${Math.random() * 9}`,
              currentTime: new Date(Date.now()),
            }]
          });
        }
    
        setClients(updatedClients);  // Update the state with the new `clients` array
      }
    });
    
    socket.on('new-message-from-me', (data) => {
      console.log('new-message-from-me',data);
      console.log("clients ",clients);
      console.log("user ",users);
      let updatedClients = [...clientsRef.current];  // Create a copy of clients list
      console.log('updated ', updatedClients);
    
      let findClient = updatedClients.find(client => client.clientNum == data.from);  // Find client by `to`
    
      if (findClient) {
        let userFind = findClient.messages.find(client => client.userNum == data.to);  // Check if sender exists
    
        if (userFind) {
          userFind.message.push({
            to: data.to,
            msg: data.body,
            from: data.from,
            _id: `${Math.random() * 9}`,
            currentTime: new Date(Date.now()),
          });
        } else {
     
          findClient.messages.push({
            userNum: data.to,
            message: [{
              to: data.to,
              msg: data.body,
              from: data.from,
              _id: `${Math.random() * 9}`,
              currentTime: new Date(Date.now()),
            }]
          });
        }
    
        setClients(updatedClients);  // Update the state with the new `clients` array
      }
      
      
      
    });
   

    return () => {
        socket.disconnect();
    };

  },[])


  const selectUser = (id,key) => {
    console.log(id);
    console.log(key)
    setApiKey(key)
    
    
    
    let selectedClient = clients.filter((client)=> client._id === id);

    console.log(selectedClient);
    
    
    setSelectedUser(selectedClient[0]);
    setSelectedContact(null);
  };

  const selectContact = (contact) => {
    console.log(contact);
    
    setSelectedContact(contact);
   
  };

  const sendMessage = (contact) => {
    console.log(contact);
    let result = contact.userNum.replace(/@c\.us$/, '');
  
    
    
    
    fetch('http://localhost:5000/whatsapp/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({apiKey,to:result,message:newMessage}),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  
    if (newMessage.trim() && selectedContact) {
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          const updatedContacts = user.contacts.map((contact) => {
            if (contact.id === selectedContact.id) {
              return {
                ...contact,
                messages: [
                  ...contact.messages,
                  { text: newMessage, sent: true, timestamp: new Date().toLocaleString() }
                ],
              };
            }
            return contact;
          });
          return { ...user, contacts: updatedContacts };
        }
        return user;
      });
      setUsers(updatedUsers);
      setNewMessage('');
    }
  };

  const filteredUsers = users.filter((user) =>{
    console.log(user);

   return user.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
   
    
  );

  return (
    <div className="chats">
      <div className="chat-list">
        <div className="chat-list-header">
          <h3>Users</h3>
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ul>
          {clients.map((client) => (
            <li
              key={client._id}
              onClick={() => selectUser(client._id,client.apiKey)}
              className={`chat-item ${selectedUser && selectedUser?.id === selectedUser?.id ? 'active' : ''}`}
            >
              
              <div className="chat-item-avatar">talha</div>
              <div className="chat-item-info">
                <span className="chat-item-name">{client?.clientNum}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        {selectedUser && !selectedContact && (
          <>
            <div className="chat-header">
              <button className="back-button" onClick={() => setSelectedUser(null)}>
                <FaArrowLeft />
              </button>
              {console.log(selectedUser)}
              <h3>{selectedUser.clientNum}'s Contacts</h3>
            </div>
            <ul className="contact-list">
              {selectedUser.messages.map((msg) => (
                <li
                  key={msg._id}
                  onClick={() => selectContact(msg)}
                  className="chat-item"
                >
                  <div className="chat-item-avatar">
                    <FaPhone />
                  </div>
                  <div className="chat-item-info">
                    <span className="chat-item-number">{msg.userNum}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        
        {selectedContact && (
          <>
            <div className="chat-header">
              <button className="back-button" onClick={() => setSelectedContact(null)}>
                <FaArrowLeft />
              </button>
              <h3>Chat with {selectedContact.userNum}</h3>
            </div>
            <div className="messages">
              {selectedContact.message.map((msg, index) => (
                <div key={index} className={`message ${msg.from !== selectedContact.userNum ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    <p>{msg.msg}</p>
                    <span className="message-timestamp">{ new Date(msg.currentTime).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyUp={(e) => e.key === 'Enter' && sendMessage(selectedContact)}
              />
              <button onClick={()=>sendMessage(selectedContact)}>
                <FaPaperPlane />
              </button>
            </div>
          </>
        )}
        {!selectedUser && (
          <div className="no-chat-selected">
            <p>Select a user to view their contacts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;

