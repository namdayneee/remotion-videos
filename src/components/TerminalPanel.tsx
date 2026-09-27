import {interpolate} from 'remotion';
import {dockerSteps,FRAMES_PER_STEP} from '../data/dockerSteps';
import {theme} from '../theme/tokens';
export const TerminalPanel = ({activeStep,frame}:{activeStep:number;frame:number})=>{const step=dockerSteps[activeStep];const local=frame-activeStep*FRAMES_PER_STEP;const count=Math.floor(interpolate(local,[3,49],[0,step.command.length],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));const opacity=interpolate(local,[49,67],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
return <div style={{height:300,background:theme.panel,border:`2px solid ${theme.border}`,borderRadius:20,overflow:'hidden',boxShadow:'0 14px 38px #0007'}}>
  <div style={{height:53,borderBottom:`1px solid ${theme.border}`,background:'#0b1a26',display:'flex',alignItems:'center',padding:'0 19px',gap:9}}>{['#ff675e','#ffbd49','#27d8a3'].map(color=><span key={color} style={{width:11,height:11,background:color,borderRadius:10}}/>)}<span style={{marginLeft:'auto',fontSize:17,fontFamily:theme.mono,color:theme.dim}}>~/docker-demo</span></div>
  <div style={{padding:'27px 24px',fontFamily:theme.mono,fontSize:20,lineHeight:1.55,whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}><div><span style={{color:theme.green}}>$ </span>{step.command.slice(0,count)}<span style={{color:theme.cyan,opacity:local%30<20?1:.2}}>▌</span></div><div style={{opacity,marginTop:20,color:theme.muted}}>{step.output}</div></div>
</div>};
