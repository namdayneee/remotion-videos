import {spring} from 'remotion';
import {dockerSteps, FRAMES_PER_STEP} from '../data/dockerSteps';
import {theme} from '../theme/tokens';
export const StepRail = ({activeStep,frame,fps}:{activeStep:number;frame:number;fps:number}) => <div style={{width:320,flexShrink:0,display:'flex',flexDirection:'column',gap:12}}>
  {dockerSteps.map((step,i)=>{const active=i===activeStep, complete=i<activeStep; const p=spring({frame:frame-i*FRAMES_PER_STEP,fps,config:{damping:20,stiffness:160}});
    return <div key={step.id} style={{height:103,boxSizing:'border-box',padding:'14px 12px',borderRadius:16,border:`1px solid ${active?theme.cyan:complete?'#195143':'#142632'}`,background:active?'#0b4360':complete?'#0a231f':'#08111b',boxShadow:active?`0 0 ${28*p}px #22c9ff55`:undefined,transform:`scale(${active?.975+.025*p:1})`,opacity:active||complete?1:.67,display:'flex',alignItems:'center',gap:10}}>
      <span style={{background:active?theme.cyan:complete?theme.green:'#182b38',color:active||complete?'#02101b':theme.dim,borderRadius:10,width:35,height:35,flexShrink:0,display:'grid',placeItems:'center',fontSize:20,fontWeight:800}}>{complete?'✓':i+1}</span>
      <div style={{minWidth:0}}><div style={{fontSize:22,fontWeight:800,color:active?theme.text:complete?theme.green:theme.muted,whiteSpace:'nowrap'}}>{step.title}</div><div style={{fontSize:16,marginTop:3,color:active?'#b6eaff':theme.dim}}>{step.detail}</div></div>
    </div>;})}
</div>;
