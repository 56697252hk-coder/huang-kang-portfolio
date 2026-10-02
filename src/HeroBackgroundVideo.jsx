import React, { useEffect, useRef } from 'react';

export default function HeroBackgroundVideo(){
  const ref=useRef(null);
  useEffect(()=>{
    const video=ref.current;if(!video)return;
    const update=visible=>{if(visible&&document.visibilityState==='visible')video.play().catch(()=>{});else video.pause();};
    const observer=new IntersectionObserver(([entry])=>update(entry.isIntersecting),{threshold:.05});
    const onVisibility=()=>update(document.visibilityState==='visible'&&video.getBoundingClientRect().bottom>0);
    observer.observe(video);document.addEventListener('visibilitychange',onVisibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);};
  },[]);
  return <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.svg"><source src="https://videos.pexels.com/video-files/3130284/3130284-sd_640_360_30fps.mp4" type="video/mp4"/><source src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4" type="video/mp4"/></video>;
}
