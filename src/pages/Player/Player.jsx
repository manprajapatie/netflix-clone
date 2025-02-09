import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();

  {/* navigate hook is use for backward and forward like back and forward */ }
  const navigate = useNavigate();

console.log("Id" + id)

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTQyMzE2MDM4YWM0MzMyY2Y0OTRkNjI5N2JhOTA2MyIsIm5iZiI6MTczMzMyOTM2MS4wMTQwMDAyLCJzdWIiOiI2NzUwODFkMTVmNzQ0YmYxNzQxZTEwNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Dhxl2xRg08LeNCNEG_ToACsJHAzrISrOcnegRyQ6_UQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [])


  return (
    <div className='player'>

      {/* this is how we use navigate hook */}
      <img src={back_arrow_icon} alt="" onClick={() => {
        navigate(-1)
      }} />
      <iframe width='90%' height='90%' src={`https:/www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0"></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
