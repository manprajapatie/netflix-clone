import React, { useEffect, useState } from 'react'
import './Player.css'
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
      <div className='player-yt'>


        {/* this is how we use navigate hook */}
        <img src={back_arrow_icon} alt="Back" onClick={() => {
          navigate(-1)
        }} />
        {apiData.key && (
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="trailer"
            allowFullScreen
          />
        )}
      </div>

      <div className="move-detail-fullwidth">
        <div className="move-content-wrapper">
          {/* Highlighted Move Name */}
          <div className="move-main">
            <span className="badge-status">Active Move</span>
            <h2 className="move-title-large">{apiData.name}</h2>
          </div>

          {/* Metadata Details */}
          <div className="move-stats-row">
            <div className="stat-group">
              <span className="stat-label">Published Date</span>
              <p className="stat-value text-highlight">{apiData.published_at?.slice(0, 10)}</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-group">
              <span className="stat-label">Classification</span>
              <p className="stat-value tag-style">{apiData.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
