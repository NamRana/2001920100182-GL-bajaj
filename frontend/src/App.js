import logo from './logo.svg';
import './App.css';
import { useGetTrains } from './hooks/useGetTrains';
import { useEffect, useState } from 'react';
import TrainTable from './components/train';

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
      {trains && <TrainTable trainsData={trains}/>}
    </div>
  );
}

export default App;
