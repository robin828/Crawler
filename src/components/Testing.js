import React,{useState ,useEffect} from 'react';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/Select';
import Axios from 'axios'




export default function MultipleSelect() {

  const [states, setStates] = useState([])
  const [city, setCity] = useState([])
  const [district1, setDistrict1] = useState([])

  useEffect(()=>{
    const fetchState = async () => {
    
      const {data : {states}} = await Axios.get(`http://3.7.205.75:8080/states`); 
      setCity(states)       
    }
    fetchState()
    },[setCity])
    const handleState = (e)=>{
     // console.log(e.target.value)
      city.map((cities) => {
          //console.log(cities.state)
          //console.log(cities)
          if(e.target.value===cities.state){
            //console.log(cities.districts)
              setDistrict1(cities.districts)
              
          //console.log(district)
          //console.log("district")
          }
      })
    }
    //console.log(district1)
    //console.log(city)
  return (
    <div>
      <Grid>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select State" onChange={handleState}>
            <option value="Select State">Select State</option>
  {city.map((data, i)=> <option key={i} value={data.state}>{data.state}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid>
      <Grid>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select Districts" onChange={handleState}>
            <option value="Select Districts">Select Districts</option>
  {district1.map((data, i)=> <option key={i} value={data}>{data}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid>
      
     
    </div>
  );
}
