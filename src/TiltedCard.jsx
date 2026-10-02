import React, { useRef } from 'react';
import './TiltedCard.css';

export default function TiltedCard({imageSrc,altText='Tilted card image',captionText='',rotateAmplitude=8,scaleOnHover=1.035,showTooltip=false,overlayContent=null,displayOverlayContent=false,className=''}){
  const figureRef=useRef(null);
  const innerRef=useRef(null);
  const captionRef=useRef(null);
  const frameRef=useRef(null);
  const move=event=>{const figure=figureRef.current;if(!figure)return;const rect=figure.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top,rx=((y/rect.height)-.5)*-rotateAmplitude*2,ry=((x/rect.width)-.5)*rotateAmplitude*2;cancelAnimationFrame(frameRef.current);frameRef.current=requestAnimationFrame(()=>{if(innerRef.current)innerRef.current.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) scale(${scaleOnHover})`;if(captionRef.current){captionRef.current.style.left=`${x}px`;captionRef.current.style.top=`${y}px`;}});};
  const enter=()=>{innerRef.current?.classList.add('is-hovered');captionRef.current?.classList.add('is-visible');};
  const leave=()=>{cancelAnimationFrame(frameRef.current);if(innerRef.current){innerRef.current.classList.remove('is-hovered');innerRef.current.style.transform='rotateX(0deg) rotateY(0deg) scale(1)';}captionRef.current?.classList.remove('is-visible');};
  return <figure ref={figureRef} className={`tilted-card-figure ${className}`} onPointerMove={move} onPointerEnter={enter} onPointerLeave={leave}>
    <div ref={innerRef} className="tilted-card-inner"><img src={imageSrc} alt={altText} className="tilted-card-img"/>{displayOverlayContent&&overlayContent&&<div className="tilted-card-overlay">{overlayContent}</div>}</div>
    {showTooltip&&<figcaption ref={captionRef} className="tilted-card-caption">{captionText}</figcaption>}
  </figure>;
}
