import React, { useEffect, useRef, useState } from 'react';

export default function VideoPreview({src,poster,previewAt=.28,previewSecond,className=''}){
  const ref=useRef(null);
  const [shouldLoad,setShouldLoad]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setShouldLoad(true);observer.disconnect();}
    },{rootMargin:'320px'});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  const seek=event=>{
    const video=event.currentTarget;
    if(Number.isFinite(video.duration)&&video.duration>1) video.currentTime=Math.min(previewSecond??video.duration*previewAt,video.duration-.2);
  };
  if(poster) return <img className={className} src={poster} alt="" loading="lazy" decoding="async"/>;
  return <video ref={ref} className={className} src={shouldLoad?src:undefined} muted playsInline preload={shouldLoad?'metadata':'none'} onLoadedMetadata={seek}/>;
}
