import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../feature/movie/movieSlice';


const TitleCards = ({ title, category }) => {

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies[category] || []);
  const isLoading = useSelector(state => state.movies.isLoading);

  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
     if (movies.length === 0) {
      dispatch(fetchMovies(category));
    }

    cardsRef.current.addEventListener('wheel', handleWheel);
    return () => {
      //cardsRef.current.removeEventListener('wheel', handleWheel);
    };
  }, [dispatch, category, movies.length]);

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {isLoading && <p>Loading...</p>}

        {movies.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards
