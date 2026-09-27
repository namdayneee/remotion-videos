import {spring} from 'remotion';
import {theme} from '../theme/tokens';

export type RailStep = {id: string; title: string; detail: string};

// Generic step rail — same look as StepRail but driven by any steps array.
export const StepList = ({steps, activeStep, frame, fps, framesPerStep}: {steps: readonly RailStep[]; activeStep: number; frame: number; fps: number; framesPerStep: number}) => (
  <div style={{width: 292, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
    {steps.map((step, i) => {
      const active = i === activeStep;
      const complete = i < activeStep;
      const p = spring({frame: frame - i * framesPerStep, fps, config: {damping: 20, stiffness: 160}});
      return (
        <div key={step.id} style={{height: 84, boxSizing: 'border-box', padding: '10px 12px', borderRadius: 14, border: `1px solid ${active ? theme.cyan : complete ? '#195143' : '#142632'}`, background: active ? '#0b4360' : complete ? '#0a231f' : '#08111b', boxShadow: active ? `0 0 ${24 * p}px #22c9ff55` : undefined, opacity: active || complete ? 1 : 0.62, display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{background: active ? theme.cyan : complete ? theme.green : '#182b38', color: active || complete ? '#02101b' : theme.dim, borderRadius: 9, width: 32, height: 32, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 800}}>{complete ? '✓' : i + 1}</span>
          <div style={{minWidth: 0}}>
            <div style={{fontSize: 19, fontWeight: 800, color: active ? theme.text : complete ? theme.green : theme.muted, whiteSpace: 'nowrap'}}>{step.title}</div>
            <div style={{fontSize: 14, marginTop: 2, color: active ? '#b6eaff' : theme.dim}}>{step.detail}</div>
          </div>
        </div>
      );
    })}
  </div>
);