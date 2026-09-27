import assert from 'node:assert/strict';
import test from 'node:test';
import {webVisitSteps,DURATION,FRAMES_PER_STEP,getStepFromFrame} from '../src/data/webVisitSteps.ts';

test('every frame maps to the intended step, including boundaries',()=>{
  assert.equal(DURATION,webVisitSteps.length*FRAMES_PER_STEP);
  for(let i=0;i<webVisitSteps.length;i++){
    assert.equal(getStepFromFrame(i*FRAMES_PER_STEP),i);
    assert.equal(getStepFromFrame((i+1)*FRAMES_PER_STEP-1),i);
  }
});
test('steps have unique ids with caption and narration',()=>{
  assert.equal(new Set(webVisitSteps.map(s=>s.id)).size,webVisitSteps.length);
  for(const step of webVisitSteps){assert.ok(step.caption);assert.ok(step.narration)}
});