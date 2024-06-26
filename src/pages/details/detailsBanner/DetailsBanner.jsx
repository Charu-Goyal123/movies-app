import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import { PlayIcon } from "../Playbtn.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.jpg";
import VideoPopup from "../../../components/vedioPopup/VedioPopup.jsx";

const DetailsBanner = ({ video, crew }) => {

    const [show, setShow ] = useState(false);
    const [vedioId, setVedioId] = useState(null);

    const {mediaType, id}= useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=>state.home)

    const _genres = data?.genres?.map((g)=>g.id);

    const director =  crew?.filter((f)=>f.job === "Director");
    const writer = crew?.filter((f)=>f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    console.log(url?.images?.base_url+'w500'+ data?.poster_path)
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                        
                    <div className="backdrop_img">
                        <Img src={url.backdrop + data?.backdrop_path}></Img>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.poster_path ? (
                                    <Img className="posterImg" src={url?.images?.base_url+'w500'+ data?.poster_path}></Img>
                                ) : (<Img className="posterImg" src={PosterFallback}></Img>)}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    {data?.tagline}
                                </div>
                                <Genres data={_genres}></Genres>
                                <div className="row">
                                    <CircleRating rating={data.vote_average.toFixed()}></CircleRating>
                                    <div className="playbtn" onClick={()=>{setShow(true)
                                         setVedioId(vedio.key)}}>
                                        <PlayIcon></PlayIcon>
                                    <span className="text">Watch Trailer</span>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div className="description">{data.overview}</div>
                                </div>
                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status: {" "}
                                            </span>
                                            <span className="text">{data.status}</span>
                                        </div>
                                    )}
                                    {data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Release Date: {" "}
                                            </span>
                                            <span className="text">{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                        </div>
                                    )}
                                    {data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Runtime: {" "}
                                            </span>
                                            <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                        </div>
                                    )}
                                </div>
                                {director.length >0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{""}
                                        </span>
                                        <span className="text">
                                            {director?.map((d, i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length - 1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writer.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Writer:{""}
                                        </span>
                                        <span className="text">
                                            {writer?.map((d, i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {writer.length - 1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                    {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{""}
                                        </span>
                                        <span className="text">
                                            {data?.created_by?.map((d, i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {data?.created_by.length - 1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup show={show} setShow={setShow} vedioId={vedioId} setVideoId={setVedioId}></VideoPopup>
                    </ContentWrapper>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
