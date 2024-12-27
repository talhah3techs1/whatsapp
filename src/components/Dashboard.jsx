import React, { useEffect, useState } from 'react';
import { FaTablet, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const DashboardBox = ({ icon, title, value, color }) => (
  <div className={`dashboard-box ${color}`}>
    <div className="dashboard-box-icon">{icon}</div>
    <div className="dashboard-box-content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [active, setActive] = useState(0);
  const [disconnect, setDisconnect] = useState(0);
  const [allDevices, setAllDevices] = useState(0);


useEffect(()=>{

  const devicesStatus= async()=>{
   try {
    const res = await fetch('http://194.163.170.219:3000/whatsapp/get-all-status?key=h3techs.com');

    const data = await res.json();

    console.log(data);
    

    setAllDevices(data?.totalDevices);
    setActive(data?.activeDev)
    setDisconnect(data?.disconnectDev)
   


    
    
    
   } catch (error) {
    console.log(error);
    
   }


    

  }
  devicesStatus()

  
},[])


  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-boxes">
       {allDevices && <> <DashboardBox icon={<FaTablet />} title="Total Devices" value={allDevices} color="blue" />
        <DashboardBox icon={<FaCheckCircle />} title="Active Devices" value={active} color="green" />
        <DashboardBox icon={<FaTimesCircle />} title="Disconnected Devices" value={disconnect} color="red" /></>}
      </div>
      <div className="dashboard-charts">
        <div className="chart">
          <h3>Device Activity</h3>
          <p>Chart placeholder</p>
        </div>
        <div className="chart">
          <h3>Network Usage</h3>
          <p>Chart placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

