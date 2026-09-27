import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {StepRail} from './components/StepRail';
import {TerminalPanel} from './components/TerminalPanel';
import {SystemPanel} from './components/SystemPanel';
import {dockerSteps,DURATION,FRAMES_PER_STEP,getStepFromFrame} from './data/dockerSteps';
import {theme} from './theme/tokens';

export const DockerExplainer=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();const activeStep=getStepFromFrame(frame);const local=frame-activeStep*FRAMES_PER_STEP;const opacity=interpolate(local,[0,14,FRAMES_PER_STEP-14,FRAMES_PER_STEP],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
return <AbsoluteFill style={{background:`radial-gradient(ellipse at 72% 40%, #083046 0%, ${theme.bg} 52%)`,color:theme.text,fontFamily:theme.sans,padding:'106px 54px 72px',boxSizing:'border-box'}}>
  <header style={{height:220}}><div style={{fontFamily:theme.mono,fontSize:20,color:theme.cyan,fontWeight:800,letterSpacing:4}}>VISUAL SYSTEMS / 001</div><h1 style={{fontSize:79,lineHeight:1.05,letterSpacing:-3,margin:'27px 0 14px'}}>How <span style={{color:theme.cyan}}>Docker</span> Works</h1><div style={{color:theme.muted,fontSize:27}}>Từ mã nguồn đến ứng dụng đang chạy</div></header>
  <div style={{display:'flex',gap:18,alignItems:'flex-start'}}><StepRail activeStep={activeStep} frame={frame} fps={fps}/><div style={{width:580,display:'flex',flexDirection:'column',gap:16}}><TerminalPanel activeStep={activeStep} frame={frame}/><SystemPanel activeStep={activeStep} frame={frame} fps={fps}/></div></div>
  <div style={{position:'absolute',bottom:77,left:54,right:54,minHeight:116,padding:'24px 27px',boxSizing:'border-box',borderLeft:`5px solid ${theme.cyan}`,background:'#0b1c29',borderRadius:12,opacity,fontSize:26,lineHeight:1.32,fontWeight:600}}>{dockerSteps[activeStep].caption}</div>
  <div style={{position:'absolute',bottom:0,left:0,height:6,width:`${(frame+1)/DURATION*100}%`,background:theme.cyan,boxShadow:`0 0 18px ${theme.cyan}`}}/>
</AbsoluteFill>};
