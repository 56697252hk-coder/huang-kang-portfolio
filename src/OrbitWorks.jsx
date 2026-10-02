import React, { useEffect, useRef, useState } from 'react';
import './OrbitWorks.css';
import VideoPreview from './VideoPreview.jsx';

export default function OrbitWorks({projects,onSelect}){
  const total=projects.length;
  const stageRef=useRef(null);
  const dragRef=useRef(null);
  const draggedRef=useRef(false);
  const [activeIndex,setActiveIndex]=useState(0);
  const [isVisible,setIsVisible]=useState(true);
  useEffect(()=>{
    const node=stageRef.current;if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setIsVisible(entry.isIntersecting),{threshold:.01});
    observer.observe(node);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!isVisible)return undefined;
    let frame,lastUpdate=0;
    const updateActive=now=>{
      if(now-lastUpdate>180&&stageRef.current){
        const cards=[...stageRef.current.querySelectorAll('.orbit-work')];
        let closest=0,best=Infinity;
        cards.forEach((card,index)=>{
          // Rebase by whole cycles so reverse playback never reaches time zero.
          card.getAnimations().filter(item=>item.animationName==='orbit-travel'||item.animationName==='orbit-depth').forEach(item=>{
            const duration=Number(item.effect.getComputedTiming().duration);
            if(item.playbackRate<0&&duration>0&&Number(item.currentTime)<duration){
              const wasFinished=item.playState==='finished';
              const time=Number(item.currentTime)||0;
              item.currentTime=duration*2+((time%duration)+duration)%duration;
              if(wasFinished)item.play();
            }
          });
          const animation=card.getAnimations().find(item=>item.animationName==='orbit-travel');
          if(!animation)return;
          const timing=animation.effect.getComputedTiming();
          const progress=timing.progress;
          if(progress===null)return;
          const distance=Math.min(Math.abs(progress-.25),1-Math.abs(progress-.25));
          if(distance<best){best=distance;closest=index;}
        });
        setActiveIndex(current=>current===closest?current:closest);
        lastUpdate=now;
      }
      frame=requestAnimationFrame(updateActive);
    };
    frame=requestAnimationFrame(updateActive);
    return()=>cancelAnimationFrame(frame);
  },[total,isVisible]);
  const getOrbitAnimations=()=>[...stageRef.current.querySelectorAll('.orbit-work')].flatMap(item=>item.getAnimations().filter(animation=>animation.animationName==='orbit-travel'||animation.animationName==='orbit-depth'));
  const setLoopTime=(animation,value)=>{const duration=Number(animation.effect.getComputedTiming().duration)||42000;animation.currentTime=duration*2+((value%duration)+duration)%duration;};
  const updateDrag=()=>{const drag=dragRef.current;if(!drag)return;drag.smoothDx+=(drag.targetDx-drag.smoothDx)*.13;drag.animations.forEach((animation,index)=>setLoopTime(animation,drag.times[index]+drag.smoothDx*28));if(Math.abs(drag.targetDx-drag.smoothDx)>.08){drag.frame=requestAnimationFrame(updateDrag);}else{drag.smoothDx=drag.targetDx;drag.animations.forEach((animation,index)=>setLoopTime(animation,drag.times[index]+drag.targetDx*28));drag.frame=null;if(drag.released){drag.animations.forEach((animation,index)=>{animation.playbackRate=drag.nextRate??drag.rates[index];animation.play();});dragRef.current=null;}}};
  const pointerDown=event=>{if(event.pointerType==='mouse'&&event.button!==0)return;if(dragRef.current){cancelAnimationFrame(dragRef.current.frame);dragRef.current.animations.forEach(animation=>animation.play());}const animations=getOrbitAnimations(),now=performance.now(),item=event.target.closest('.orbit-work');dragRef.current={pointerId:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,lastAt:now,velocity:0,targetDx:0,smoothDx:0,times:animations.map(animation=>animation.currentTime||0),rates:animations.map(animation=>animation.playbackRate||1),animations,frame:null,nextRate:null,itemIndex:item?Number(item.dataset.index):-1};draggedRef.current=false;animations.forEach(animation=>animation.pause());stageRef.current.setPointerCapture(event.pointerId);};
  const pointerMove=event=>{const drag=dragRef.current;if(!drag||drag.released||drag.pointerId!==event.pointerId)return;if(event.pointerType==='mouse'&&!(event.buttons&1)){drag.released=true;if(!drag.frame)drag.frame=requestAnimationFrame(updateDrag);return;}const now=performance.now(),elapsed=Math.max(8,now-drag.lastAt),instant=(event.clientX-drag.lastX)/elapsed;drag.velocity=drag.velocity*.68+instant*.32;drag.lastX=event.clientX;drag.lastAt=now;drag.targetDx=event.clientX-drag.x;if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>5)draggedRef.current=true;if(!drag.frame)drag.frame=requestAnimationFrame(updateDrag);};
  const pointerUp=event=>{const drag=dragRef.current;if(!drag||drag.released||drag.pointerId!==event.pointerId)return;const cancelled=event.type==='pointercancel';const moved=draggedRef.current||Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>5;draggedRef.current=moved||cancelled;if(moved){const inertia=Math.max(-260,Math.min(260,drag.velocity*460));drag.targetDx+=inertia;const direction=Math.abs(drag.velocity)>.015?drag.velocity:drag.targetDx;drag.nextRate=direction<0?-1:1;}else if(!cancelled&&drag.itemIndex>=0&&projects[drag.itemIndex]?.video){onSelect?.(projects[drag.itemIndex]);}drag.released=true;if(!drag.frame)drag.frame=requestAnimationFrame(updateDrag);if(stageRef.current.hasPointerCapture(event.pointerId))stageRef.current.releasePointerCapture(event.pointerId);};
  return <div ref={stageRef} className={`orbit-works${isVisible?'':' is-paused'}`} aria-label="首页精选作品环绕展示" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onDragStart={event=>event.preventDefault()}>
    <div className="orbit-path" aria-hidden="true"/>
    <div className="orbit-center" aria-hidden="true"><span>SELECTED WORKS</span><strong>{String(total).padStart(2,'0')}</strong><small>VIDEO · MOTION · AIGC</small></div>
    <div className="orbit-stage">
      {projects.map((project,index)=><button type="button" className="orbit-work" data-index={index} key={project.n} style={{'--orbit-index':index,'--orbit-total':total}} onClick={event=>{if(event.detail===0&&project.video)onSelect?.(project);}} aria-label={`${project.title}，查看项目`}>
        <span className="orbit-work-media">{project.video?<VideoPreview poster={project.poster} src={project.video} previewAt={project.previewAt} previewSecond={project.previewSecond}/>:<span className="orbit-placeholder"/>}</span>
      </button>)}
    </div>
    {projects[activeIndex]&&<button key={activeIndex} type="button" className="orbit-featured" onPointerDown={event=>event.stopPropagation()} onClick={()=>projects[activeIndex].video&&onSelect?.(projects[activeIndex])} aria-label={`查看${projects[activeIndex].title}`}>
      <span className="orbit-featured-thumb"><VideoPreview key={projects[activeIndex].video} poster={projects[activeIndex].poster} src={projects[activeIndex].video} previewAt={projects[activeIndex].previewAt} previewSecond={projects[activeIndex].previewSecond}/></span>
      <strong>{projects[activeIndex].title}</strong><span aria-hidden="true">↗</span>
    </button>}
  </div>;
}



