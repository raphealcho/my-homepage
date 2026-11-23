/** Local attraction field. Displacement is bounded and zero outside the radius. */
export function gridTarget(x: number, y: number, pointer: {x:number;y:number}, strength: number) {
  const dx = pointer.x - x;
  const dy = pointer.y - y;
  const distance = Math.hypot(dx, dy);
  const radius = 205;
  const influence = Math.max(0, 1 - distance / radius) ** 2;
  const pull = influence * Math.max(0, Math.min(1, strength)) * 0.48;
  return {x: x + dx * pull, y: y + dy * pull, influence};
}
