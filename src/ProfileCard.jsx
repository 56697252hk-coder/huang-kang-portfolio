import React, { useRef } from 'react';
import './ProfileCard.css';

export default function ProfileCard({avatarUrl,name='黄康',title='VIDEO · MOTION · AIGC',className=''}){
  const cardRef=useRef(null);
  const frameRef=useRef(null);
  const move=event=>{
    const card=cardRef.current;if(!card)return;
    const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
    cancelAnimationFrame(frameRef.current);
    frameRef.current=requestAnimationFrame(()=>{
      card.style.setProperty('--pointer-x',`${x*100}%`);card.style.setProperty('--pointer-y',`${y*100}%`);
      card.style.setProperty('--rotate-x',`${(y-.5)*-11}deg`);card.style.setProperty('--rotate-y',`${(x-.5)*13}deg`);
    });
  };
  const leave=()=>{cancelAnimationFrame(frameRef.current);const card=cardRef.current;if(!card)return;card.style.setProperty('--pointer-x','50%');card.style.setProperty('--pointer-y','50%');card.style.setProperty('--rotate-x','0deg');card.style.setProperty('--rotate-y','0deg');};
  return <div className={`profile-card-wrap ${className}`} onPointerMove={move} onPointerLeave={leave}>
    <div className="profile-card-glow"/><article ref={cardRef} className="profile-card"><div className="profile-card-gradient"/><div className="profile-card-shine"/><div className="profile-card-glare"/><img src={avatarUrl} alt={`${name}的个人照片`} loading="lazy" decoding="async"/><div className="profile-card-top"><span>HK / PROFILE</span><span>01</span></div><div className="profile-card-info"><div><strong>{name}</strong><small>{title}</small></div><span className="profile-card-status"><i/>AVAILABLE</span></div></article>
  </div>;
}
