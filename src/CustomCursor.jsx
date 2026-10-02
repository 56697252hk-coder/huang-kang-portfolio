import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor(){
  const cursor=useRef(null);
  useEffect(()=>{
    if(!window.matchMedia('(pointer: fine)').matches)return undefined;
    document.documentElement.classList.add('has-custom-cursor');
    let targetX=-100,targetY=-100,currentX=-100,currentY=-100,frame;
    const move=e=>{targetX=e.clientX;targetY=e.clientY;cursor.current?.classList.add('is-visible');if(!frame)frame=requestAnimationFrame(tick);};
    const leave=()=>cursor.current?.classList.remove('is-visible');
    const over=e=>{const el=cursor.current;if(!el)return;const isWork=Boolean(e.target.closest('.work-tile,.orbit-work'));el.classList.toggle('is-work',isWork);el.classList.toggle('is-interactive',!isWork&&Boolean(e.target.closest('a,button,[role="button"],input,textarea,select')));};
    let clickTimer;
    const down=()=>cursor.current?.classList.add('is-pressed');
    const up=()=>{const el=cursor.current;if(!el)return;el.classList.remove('is-pressed');el.classList.remove('is-clicked');void el.offsetWidth;el.classList.add('is-clicked');clearTimeout(clickTimer);clickTimer=setTimeout(()=>el.classList.remove('is-clicked'),520);};
    const tick=()=>{currentX+=(targetX-currentX)*.28;currentY+=(targetY-currentY)*.28;if(cursor.current)cursor.current.style.transform=`translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;if(Math.abs(targetX-currentX)>.08||Math.abs(targetY-currentY)>.08)frame=requestAnimationFrame(tick);else frame=null;};
    window.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('pointerover',over,{passive:true});
    window.addEventListener('pointerdown',down,{passive:true});
    window.addEventListener('pointerup',up,{passive:true});
    document.documentElement.addEventListener('mouseleave',leave);
    return()=>{cancelAnimationFrame(frame);clearTimeout(clickTimer);window.removeEventListener('pointermove',move);document.removeEventListener('pointerover',over);window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);document.documentElement.removeEventListener('mouseleave',leave);document.documentElement.classList.remove('has-custom-cursor');};
  },[]);
  return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span/><b>VIEW</b></div>;
}
