import React from 'react';
import './GlareHover.css';

export default function GlareHover({width='500px',height='500px',background='#000',borderRadius='0px',borderColor='#2b3432',children,glareColor='#efffc8',glareOpacity=.2,glareAngle=-30,glareSize=260,transitionDuration=760,playOnce=false,className='',style={}}){
  const hex=glareColor.replace('#','');
  let rgba=glareColor;
  if(/^[0-9a-f]{6}$/i.test(hex)){const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);rgba=`rgba(${r}, ${g}, ${b}, ${glareOpacity})`;}
  else if(/^[0-9a-f]{3}$/i.test(hex)){const r=parseInt(hex[0]+hex[0],16),g=parseInt(hex[1]+hex[1],16),b=parseInt(hex[2]+hex[2],16);rgba=`rgba(${r}, ${g}, ${b}, ${glareOpacity})`;}
  const vars={'--gh-width':width,'--gh-height':height,'--gh-bg':background,'--gh-br':borderRadius,'--gh-angle':`${glareAngle}deg`,'--gh-duration':`${transitionDuration}ms`,'--gh-size':`${glareSize}%`,'--gh-rgba':rgba,'--gh-border':borderColor};
  return <div className={`glare-hover ${playOnce?'glare-hover--play-once':''} ${className}`} style={{...vars,...style}}>{children}</div>;
}
