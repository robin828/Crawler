import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import Testing from './Testing'


const Publish = (props) => {
  const [city, setCity] = useState([])
  const [district1, setDistrict1] = useState([])
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [district, setDistrict] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')


  const publishWebsite = (e) => {
    e.preventDefault()
    fetch('http://3.7.205.75:8080/publish/website', {
    method: 'post',
    body: JSON.stringify({
        category: category,
        location: location,
        district: district,
        url: url,
        title: title,
        userId: sessionStorage.getItem('userId'),
    }),
        
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json.status)) 
}
  useEffect(()=>{
    const fetchState = async () => {
      const {data : {states}} = await Axios.get(`http://3.7.205.75:8080/states`); 
      setCity(states)       
    }
    fetchState()
    },[setCity])
const handleState = (e)=>{
  setLocation(e.target.value)
  city.map((cities) => {
      if(e.target.value===cities.state){
          setDistrict1(cities.districts)
      }
  })
}
const handleCategory = (e) => {
  setCategory(e.target.value)
}
const handleDistrict = (e) => {
  setDistrict(e.target.value)
}
const handleUrl = (e) => {
  setUrl(e.target.value)
}
const handleTitle = (e) => {
  setTitle(e.target.value)
}

  
    return (
    <Testing 
    publishWebsite={publishWebsite}
    handleTitle={handleTitle}
    handleUrl={handleUrl}
    handleDistrict={handleDistrict}
    handleCategory={handleCategory}
    handleState={handleState}
    district1={district1}
    category={category}
    location={location}
    district={district}
    url={url}
    title={title}
    city={city}
    

    />
);

    }

export default Publish
