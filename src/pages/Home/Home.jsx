import React, { useRef } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'


const Home = () => {

  const FooterRef = useRef(null)
  const MovieRef = useRef(null)
  const scrollToFooter = () => {
    FooterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMovieSection = () => {
    MovieRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='Home'>
      {/*------------------ Navbar ------------------*/}
      <Navbar />

      {/*------------------ Hero ------------------*/}
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and  illustrated by Koyoharu Gotouge. It was serialized in Shueisha's shōnen   manga magazine

          </p>


          {/*------------------Add button------------------*/}
          <div className="hero-btns">
            <button className='btn' onClick={scrollToMovieSection}><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn' onClick={scrollToFooter} ><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards category="now_playing" />
        </div>
      </div>
      <div className="more-cards" ref={MovieRef}>
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for you"} category={"now_playing"} />

      </div>
      <div ref={FooterRef}>
        <Footer />
      </div>

    </div>
  )
}

export default Home
