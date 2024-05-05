import React, { useState } from "react";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
//import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
//import { PlayIcon } from "../Playbtn";
//import VideoPopup from "../../../components/videoPopup/VideoPopup";
import VideoPopup from "../vedioPopup/VedioPopup";
import { PlayIcon } from "../../pages/details/Playbtn";
//import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((vedio)=>(
                            <div key={vedio.id} className="vedioItem" onClick={()=>{
                                setVideoId(video.key)
                                setShow(true)
                            }}>
                                {/* <div className="vedioThumbnail">
                                    <Img src="" alt="/"></Img>
                                </div> */}
                                <div className="vedioTitle">{vedio.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;