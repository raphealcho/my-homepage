import test from 'node:test';
import assert from 'node:assert/strict';
import {gridTarget} from '../lib/grid-physics.ts';

test('Grid returns to its resting geometry when interaction ends',()=>{
 for(const [x,y] of [[0,0],[180,240],[500,300]]){
  const p=gridTarget(x,y,{x:200,y:250},0);
  assert.equal(p.x,x);assert.equal(p.y,y);
 }
});
test('Pointer directly on a grid node never produces NaN',()=>{
 const p=gridTarget(240,300,{x:240,y:300},1);
 assert.equal(p.x,240);assert.equal(p.y,300);assert.ok(Number.isFinite(p.influence));
});
test('Distortion is local and cannot pull nodes beyond 20 pixels',()=>{
 const pointer={x:500,y:500};
 for(let x=0;x<1000;x+=10)for(let y=0;y<1000;y+=10){
  const p=gridTarget(x,y,pointer,1);
  assert.ok(Math.hypot(p.x-x,p.y-y)<=20);
  if(Math.hypot(x-500,y-500)>205){assert.equal(p.x,x);assert.equal(p.y,y)}
 }
});
test('Grid bends toward the cursor symmetrically',()=>{
 const left=gridTarget(440,500,{x:500,y:500},1);
 const right=gridTarget(560,500,{x:500,y:500},1);
 assert.ok(left.x>440&&right.x<560);
 assert.ok(Math.abs(left.x+right.x-1000)<1e-8);
});
