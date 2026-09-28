import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
const paths=['/','/about-me','/contact','/page','/projects/tools-power-tools','/projects/industrial-products','/projects/safety-products','/projects/measuring-instruments'];
for(const path of paths)test(`Server-rendered content and SEO: ${path}`,async()=>{
 const response=await fetch(base+path);assert.equal(response.status,200);
 const html=await response.text();
 assert.match(html,/<h1\b/);assert.match(html,/<title>[^<]*KIKAE/);
 assert.match(html,/<meta name="description" content="[^"]+"/);
 assert.match(html,/<link rel="canonical" href="https?:\/\/[^" ]+"/);
 assert.match(html,/property="og:title"/);assert.match(html,/rel="icon"/);
 assert.match(html,/KIKAE home/);
});
test('Unknown product returns 404',async()=>assert.equal((await fetch(base+'/projects/not-a-product')).status,404));
test('Sitemap contains all canonical routes',async()=>{const r=await fetch(base+'/sitemap.xml');assert.equal(r.status,200);const xml=await r.text();assert.equal((xml.match(/<loc>/g)||[]).length,paths.length);for(const path of paths.slice(1))assert.ok(xml.includes(path+'</loc>'))});
test('Robots and favicon assets are served',async()=>{for(const path of ['/robots.txt','/favicon.ico','/icon.png','/apple-icon.png']){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok((await r.arrayBuffer()).byteLength>0)}});
test('Video supports byte-range requests',async()=>{const r=await fetch(base+'/assets/hero.mp4',{headers:{Range:'bytes=0-99'}});assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,100)});
