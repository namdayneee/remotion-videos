import assert from 'node:assert/strict';
import test from 'node:test';
import {dockerSteps,DURATION,FRAMES_PER_STEP,getStepFromFrame} from '../src/data/dockerSteps.ts';

test('every frame maps to the intended step, including boundaries',()=>{
  assert.equal(DURATION,dockerSteps.length*FRAMES_PER_STEP);
  for(let i=0;i<dockerSteps.length;i++){
    assert.equal(getStepFromFrame(i*FRAMES_PER_STEP),i);
    assert.equal(getStepFromFrame((i+1)*FRAMES_PER_STEP-1),i);
  }
});
test('commands and explanatory text exist for every step',()=>{
  assert.equal(new Set(dockerSteps.map(s=>s.id)).size,dockerSteps.length);
  for(const step of dockerSteps){assert.ok(step.command);assert.ok(step.output);assert.ok(step.caption)}
});
