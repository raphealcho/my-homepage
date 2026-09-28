'use client';

import {useEffect, useRef} from 'react';
import {gridTarget} from '@/lib/grid-physics';

type Point = {homeX:number;homeY:number;x:number;y:number;vx:number;vy:number;light:number};

/** Decorative canvas only: never intercepts a link, a click, or keyboard focus. */
export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !ctx) return;

    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(pointer: fine)');
    let width = 0, height = 0, columns = 0, rows = 0;
    let points: Point[] = [];
    let frame = 0, lastTime = 0, visible = true, inside = false;
    let strength = 0;
    const pointer = {x: -1000, y: -1000};
    const follow = {x: -1000, y: -1000};
    const spacing = 60;

    function requestFrame() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function draw(time:number) {
      frame = 0;
      const dt = Math.min(2, Math.max(0.1, (time - (lastTime || time - 16.67)) / 16.67));
      lastTime = time;
      const enabled = !motion.matches && finePointer.matches;
      const targetStrength = enabled && inside ? 1 : 0;
      strength += (targetStrength - strength) * (1 - Math.pow(.84, dt));
      follow.x += (pointer.x - follow.x) * (1 - Math.pow(.76, dt));
      follow.y += (pointer.y - follow.y) * (1 - Math.pow(.76, dt));
      let moving = Math.abs(targetStrength - strength) > .002;

      for (const point of points) {
        const target = gridTarget(point.homeX, point.homeY, follow, strength);
        if (!enabled) {
          point.x = point.homeX; point.y = point.homeY;
          point.vx = point.vy = point.light = 0;
        } else {
          point.vx = (point.vx + (target.x - point.x) * .12 * dt) * Math.pow(.68, dt);
          point.vy = (point.vy + (target.y - point.y) * .12 * dt) * Math.pow(.68, dt);
          point.x += point.vx * dt;
          point.y += point.vy * dt;
          point.light += (target.influence * strength - point.light) * (1 - Math.pow(.82, dt));
          if (Math.abs(point.vx) + Math.abs(point.vy) + Math.abs(target.x-point.x) + Math.abs(target.y-point.y) > .015) moving = true;
        }
      }

      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = 1;
      const segment = (a:Point,b:Point) => {
        const glow = Math.max(a.light, b.light);
        ctx!.strokeStyle = `rgba(210,215,216,${.035 + glow * .55})`;
        ctx!.beginPath();ctx!.moveTo(a.x,a.y);ctx!.lineTo(b.x,b.y);ctx!.stroke();
      };
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const i = row * columns + col;
          const point = points[i];
          if (col + 1 < columns) segment(point, points[i+1]);
          if (row + 1 < rows) segment(point, points[i+columns]);
          ctx!.fillStyle = `rgba(235,238,239,${.09 + point.light * .75})`;
          ctx!.beginPath();ctx!.arc(point.x,point.y,1 + point.light * 1.3,0,Math.PI*2);ctx!.fill();
        }
      }
      if (moving) requestFrame();
      else lastTime = 0;
    }

    function resize() {
      width = hero!.clientWidth; height = hero!.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width*dpr);canvas!.height = Math.round(height*dpr);
      ctx!.setTransform(dpr,0,0,dpr,0,0);
      columns = Math.ceil(width/spacing)+2;rows = Math.ceil(height/spacing)+2;
      points = Array.from({length:columns*rows},(_,i)=>{
        const x = (i%columns)*spacing, y = Math.floor(i/columns)*spacing;
        return {homeX:x,homeY:y,x,y,vx:0,vy:0,light:0};
      });
      requestFrame();
    }
    function move(event:PointerEvent) {
      if (event.pointerType === 'touch' || motion.matches || !finePointer.matches) return;
      const rect = hero!.getBoundingClientRect();
      pointer.x = event.clientX-rect.left;pointer.y = event.clientY-rect.top;
      if (!inside) {follow.x = pointer.x;follow.y = pointer.y;}
      inside = true;requestFrame();
    }
    function leave() {inside = false;requestFrame();}
    function visibility() {if(document.hidden){cancelAnimationFrame(frame);frame=0;lastTime=0;}else requestFrame();}
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry])=>{
      visible = entry.isIntersecting;
      if (visible) requestFrame();else {cancelAnimationFrame(frame);frame=0;lastTime=0;inside=false;}
    });
    resizeObserver.observe(hero);intersectionObserver.observe(hero);
    hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);
    motion.addEventListener('change',requestFrame);finePointer.addEventListener('change',requestFrame);
    resize();
    return ()=>{
      cancelAnimationFrame(frame);resizeObserver.disconnect();intersectionObserver.disconnect();
      hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',visibility);
      motion.removeEventListener('change',requestFrame);finePointer.removeEventListener('change',requestFrame);
    };
  },[]);

  return <canvas ref={canvasRef} className="interactive-grid" aria-hidden="true"/>;
}
