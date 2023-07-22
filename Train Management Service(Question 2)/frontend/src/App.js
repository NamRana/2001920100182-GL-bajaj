import logo from './logo.svg';
import './App.css';
import { useGetTrains } from './hooks/useGetTrains';
import { useEffect, useState } from 'react';
import TrainTable from './components/train';
import trainImg from "./../src/img/train.jpg" 

function App() {
  const [trains, setTains] = useState(null);
  const {getTrains, isPending} = useGetTrains();
  useEffect(()=>{
    const fetchTrains = async() => {
    const res = await getTrains();
    console.log(res);
    setTains(res.data);
    }
    fetchTrains();
  },[])
  return (

    <div className="App">
      <h1 style={{color:"black", backgroundColor:"white", padding:"1rem", borderRadius: "8px"}}>Train Schedule</h1>
      {trains && <TrainTable trainsData={trains}/>}
     <img src={trainImg} style={{position: "absolute", height:"100vh", top: 0, left: 0, width: "100%", opacity: 0.7, objectFit: "cover",zIndex:2}} alt="train"/>
    </div>
  );
}

export default App;
