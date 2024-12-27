import React, { useState,useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';


const Devices = () => {

  useEffect(()=>{
  
    const devicesStatus= async()=>{
     try {
      const res = await fetch('http://194.163.170.219:3000/whatsapp/get-all-status?key=h3techs.com');
  
      const data = await res.json();

      console.log(data)
  
      setDevices(data?.users)
     } catch (error) {
      console.log(error);
      
     }   
  
    }
    devicesStatus()
  
    
  },[])
  const [devices, setDevices] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortDevices = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedDevices = [...devices].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setDevices(sortedDevices);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };


  const handleDeleteClient = async(key) =>{

    try {
      const res = await fetch('http://194.163.170.219:3000/whatsapp/delete-client',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({apiKey:key})
      });
  
      const data = await res.json();

      console.log(data)
  
     } catch (error) {
      console.log(error);
      
     }   
  }

  return (
    <div className="devices">
      <h2>Devices</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortDevices('id')}>
              Device ID {getSortIcon('id')}
            </th>
            <th onClick={() => sortDevices('name')}>
              Device Name {getSortIcon('name')}
            </th>
            <th onClick={() => sortDevices('number')}>
              Phone {getSortIcon('number')}
            </th>
            <th onClick={() => sortDevices('status')}>
              Status {getSortIcon('status')}
            </th>
            <th onClick={() => sortDevices('Active_At')}>
              Active_At {getSortIcon('Active_At')}
            </th>
            <th onClick={() => sortDevices('location')}>
              Disconnected_at{getSortIcon('location')}
            </th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device._id}>
              <td>{device._id}</td>
              <td>{device.name}</td>
              <td>{device.phone}</td>
              <td>
                <span className={`status-badge ${device.status.toLowerCase()}`}>
                {device.status}
                </span>
              </td>
              <td>{device.connected_At?new Date(device.connected_At).toLocaleString() : '--'}</td>
              <td>{device.disconnected_At ? new Date(device.disconnected_At).toLocaleString() : '--'}</td>
          
              <td>
                
                <button className="action-button" onClick={()=>handleDeleteClient(device.apikey)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Devices;

