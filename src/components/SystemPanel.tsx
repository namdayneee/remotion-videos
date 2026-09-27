import {Node} from './Node';
import {Connection} from './Connection';
import {StatusBadge} from './StatusBadge';
import {dockerSteps,FRAMES_PER_STEP} from '../data/dockerSteps';
import {theme} from '../theme/tokens';

const Panel=({title,badge,children,height}:{title:string;badge:string;children:React.ReactNode;height:number})=><div style={{height,position:'relative',overflow:'hidden',background:theme.panel,border:`2px solid ${theme.border}`,borderRadius:20,boxSizing:'border-box'}}><div style={{position:'absolute',top:20,left:22,fontSize:20,fontWeight:800,letterSpacing:1.2,color:theme.muted,textTransform:'uppercase'}}>{title}</div><div style={{position:'absolute',top:15,right:18}}><StatusBadge label={badge}/></div>{children}</div>;
export const SystemPanel=({activeStep,frame,fps}:{activeStep:number;frame:number;fps:number})=>{const build=activeStep===2||activeStep===3;const running=activeStep>=4&&activeStep<9;return <div style={{display:'flex',flexDirection:'column',gap:16}}>
  <Panel title="01 / Build pipeline" badge={activeStep>=3?'IMAGE READY':'PREPARING'} height={320}>
    <Connection x1={154} y1={185} x2={215} y2={185} start={2*FRAMES_PER_STEP} frame={frame} active={build}/><Connection x1={365} y1={185} x2={425} y2={185} start={2*FRAMES_PER_STEP+20} frame={frame} active={build} color={theme.green}/>
    <Node x={22} y={145} width={132} title="Source" detail="app.js" active={activeStep===0} visibleFrom={0} frame={frame} fps={fps}/>
    <Node x={215} y={145} width={150} title="Dockerfile" detail="instructions" active={activeStep===1||activeStep===2} visibleFrom={FRAMES_PER_STEP} frame={frame} fps={fps}/>
    <Node x={425} y={145} width={130} title="Image" detail="my-app" active={activeStep===3} visibleFrom={3*FRAMES_PER_STEP-30} frame={frame} fps={fps}/>
    <div style={{position:'absolute',bottom:20,left:24,fontFamily:theme.mono,fontSize:17,color:build?theme.cyan:theme.dim}}>context → instructions → layers → image</div>
  </Panel>
  <Panel title="02 / Container runtime" badge={activeStep===9?'STOPPED':running?'RUNNING':'WAITING'} height={450}>
    <Connection x1={146} y1={198} x2={215} y2={198} start={4*FRAMES_PER_STEP} frame={frame} active={activeStep===4} height={450}/>
    <Connection x1={367} y1={198} x2={439} y2={198} start={6*FRAMES_PER_STEP} frame={frame} active={activeStep===6} color={theme.green} height={450}/>
    <Node x={22} y={157} width={124} title="Image" detail="template" active={activeStep===4} visibleFrom={3*FRAMES_PER_STEP-30} frame={frame} fps={fps}/>
    <Node x={215} y={157} width={152} title="Container" detail="app :3000" active={running&&activeStep!==6} visibleFrom={4*FRAMES_PER_STEP} visibleUntil={9*FRAMES_PER_STEP+35} frame={frame} fps={fps}/>
    <Node x={439} y={157} width={116} title="Host" detail=":8080" active={activeStep===6} visibleFrom={6*FRAMES_PER_STEP} frame={frame} fps={fps}/>
    <div style={{position:'absolute',left:22,bottom:22,display:'flex',gap:9,flexWrap:'wrap'}}><StatusBadge label="PORT 8080 → 3000" active={activeStep>=6&&activeStep<9}/><StatusBadge label="VOLUME app-data" active={activeStep>=7}/><StatusBadge label="NETWORK app-net" active={activeStep===8}/></div>
  </Panel>
  <Panel title="03 / Host foundation" badge="SHARED KERNEL" height={155}>
    <div style={{position:'absolute',left:22,right:22,top:75,padding:'13px 10px',border:`1px solid ${activeStep>=5?theme.green:theme.border}`,background:theme.raised,borderRadius:12,color:activeStep>=5?theme.green:theme.muted,fontSize:19,fontWeight:700,textAlign:'center'}}>Docker Engine · Host kernel · CPU / RAM / disk</div>
  </Panel>
  <div style={{color:theme.dim,fontFamily:theme.mono,fontSize:16,textAlign:'right'}}>STEP {String(activeStep+1).padStart(2,'0')} / {dockerSteps.length}</div>
</div>};
