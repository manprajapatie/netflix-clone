import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom';





const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTQyMzE2MDM4YWM0MzMyY2Y0OTRkNjI5N2JhOTA2MyIsIm5iZiI6MTczMzMyOTM2MS4wMTQwMDAyLCJzdWIiOiI2NzUwODFkMTVmNzQ0YmYxNzQxZTEwNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Dhxl2xRg08LeNCNEG_ToACsJHAzrISrOcnegRyQ6_UQ'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }


  useEffect(() => {
    {/*data fetch from tmdb api*/ }
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>

        {/*----------------- map the data-----------------*/}

        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>

            {/*we use it https://image.tmdb.org/t/p/w500 because api not giving us whole path*/}
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
