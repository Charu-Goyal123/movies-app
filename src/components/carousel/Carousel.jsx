import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.jpg";
import "./style.scss";
import Genres from "../genres/Genres";

const Carousel = ({data,loading, endpoint, title}) => { 

    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home);
    //const url = useSelector((state) => state.Home.url.poster);
    const navigate = useNavigate();
    const navigation = (dir) =>{
      const container = carouselContainer.current;
      const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left:scrollAmount,
        behavior: "smooth",

      })
  }
  const skItem = () =>{
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    )
  }
  //console.log(item)
  return (
    <div className="carousel">
        <ContentWrapper>
          {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=> navigation("left")}></BsFillArrowLeftCircleFill>
            <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={()=> navigation("right")}></BsFillArrowRightCircleFill>
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
              {data?.map((item)=>{
                //const posterUrl =url?.images?.base_url&& item?.poster_path ?  url?.images?.base_url+'w500'+ item?.poster_path:  PosterFallback;
                const posterUrl =url?.images?.base_url&& item?.poster_path ?  url?.images?.base_url+'w500'+ item?.poster_path:  PosterFallback;
                // const posterUrl = item.poster_path
                // ? url + item.poster_path
                // : PosterFallback;

                console.log(item,url)
                return (
                  <div className="carouselItem" key={item?.results?.id} onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                    <div className="posterBlock">
                      <Img src={posterUrl}></Img>
                      <CircleRating rating={item?.vote_average?.toFixed(1)}></CircleRating>
                      <Genres data={item?.genre_ids.slice(0,2)}></Genres>
                    </div>
                    <div className="textBlock">
                      <span className="title">{item?.title || item?.name}</span>
                      <span className="date">{dayjs(item?.release_Date).format("MMM D, YYYY")}</span>
                    </div>
                  </div>
                )
              })}
          </div>
        ):(
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )
        }
        </ContentWrapper>
    </div>
  )
}

export default Carousel;