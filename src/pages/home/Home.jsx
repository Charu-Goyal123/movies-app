import React from 'react';
import "./style.scss"
import HeroBanner from './homeBanner/HeroBanner';
import Trending from './trending/Trending';
import TopRated from './topRated/TopRated';
import Popular from './popular/Popular';

const Home = () => {
  return (
    <div className='homePage'><HeroBanner></HeroBanner>
    <Trending></Trending>
    <Popular></Popular>
    <TopRated></TopRated>
    {/* <div style={{height:1000}}></div> */}
    </div>
  )
}

export default Home