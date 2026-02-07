import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
//take authorization token from .env file
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const Player = () => {

  const { id } = useParams();

  {/* navigate hook is use for backward and forward like back and forward */ }
  const navigate = useNavigate();

  console.log("Id" + id)

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id])


  return (
    <div className='player'>

      {/* this is how we use navigate hook */}
      <img src={back_arrow_icon} alt="" onClick={() => {
        navigate(-1)
      }} />
      {apiData.key && (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        />
      )}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
