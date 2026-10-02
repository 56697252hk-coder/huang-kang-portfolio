import React, { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

const positions=['80% 55%','69% 34%','8% 6%','41% 38%','86% 85%','82% 18%','51% 4%'];
const colorMap=[0,1,2,0,1,2,1];
function variables(colors,intensity){const vars={};positions.forEach((p,i)=>vars[`--gradient-${i+1}`]=`radial-gradient(at ${p}, ${colors[colorMap[i]]} 0, transparent 50%)`);[['',100],['-60',60],['-40',40],['-30',30],['-20',20],['-10',10]].forEach(([k,o])=>vars[`--glow-color${k}`]=`hsl(76deg 78% 72% / ${Math.min(o*intensity,100)}%)`);return vars;}

export default function BorderGlow({children,className='',edgeSensitivity=26,backgroundColor='#0b1112',borderRadius=18,glowRadius=30,glowIntensity=.72,coneSpread=22,animated=true,colors=['#d8ef80','#64d8b2','#edf7c6'],fillOpacity=.28}){
  const ref=useRef(null);
  const move=useCallback(e=>{const card=ref.current;if(!card)return;const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2,dx=x-cx,dy=y-cy,kx=dx?cx/Math.abs(dx):Infinity,ky=dy?cy/Math.abs(dy):Infinity;let angle=Math.atan2(dy,dx)*180/Math.PI+90;if(angle<0)angle+=360;card.style.setProperty('--edge-proximity',(Math.min(Math.max(1/Math.min(kx,ky),0),1)*100).toFixed(3));card.style.setProperty('--cursor-angle',`${angle.toFixed(3)}deg`);},[]);
  useEffect(()=>{const card=ref.current;if(!animated||!card||matchMedia('(prefers-reduced-motion: reduce)').matches)return;card.classList.add('sweep-active');const start=performance.now();let frame;const tick=now=>{const p=Math.min((now-start)/1900,1);card.style.setProperty('--edge-proximity',(Math.sin(p*Math.PI)*100).toFixed(2));card.style.setProperty('--cursor-angle',`${110+p*355}deg`);if(p<1)frame=requestAnimationFrame(tick);else card.classList.remove('sweep-active');};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[animated]);
  return <div ref={ref} onPointerMove={move} className={`border-glow-card ${className}`} style={{'--card-bg':backgroundColor,'--edge-sensitivity':edgeSensitivity,'--border-radius':`${borderRadius}px`,'--glow-padding':`${glowRadius}px`,'--cone-spread':coneSpread,'--fill-opacity':fillOpacity,...variables(colors,glowIntensity)}}><span className="edge-light" aria-hidden="true"/><div className="border-glow-inner">{children}</div></div>;
}
