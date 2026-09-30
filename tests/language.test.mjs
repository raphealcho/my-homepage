import test from 'node:test';
import assert from 'node:assert/strict';
import {japanese} from '../lib/translations.ts';

const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
const paths=['/','/about-me','/contact','/page','/projects/tools-power-tools','/projects/industrial-products','/projects/safety-products','/projects/measuring-instruments'];
const visibleText=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/\s+/g,' ');

test('Japanese is server-rendered on every route, including metadata; artwork is unchanged',async()=>{
  for(const path of paths){
    const [en,jp]=await Promise.all([
      fetch(base+path).then(r=>r.text()),
      fetch(base+path,{headers:{Cookie:'kikae-language=jp'}}).then(r=>r.text()),
    ]);
    assert.match(jp,/<html lang="ja"/);
    assert.match(en,/<html lang="en"/);
    assert.match(jp,/content="ja_JP"/);
    assert.match(jp,/<title>[^<]*[\u3040-\u9fff]/);
    const text=visibleText(jp);
    for(const english of Object.keys(japanese).filter(key=>key.length>12)){
      assert.ok(!text.includes(english),`${path} still contains: ${english}`);
    }
    const images=html=>[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(m=>m[1]);
    assert.deepEqual(images(jp),images(en),`${path}: image sources changed`);
  }
});

test('An invalid preference falls back to English without affecting other requests',async()=>{
  const invalid=await fetch(base+'/page',{headers:{Cookie:'kikae-language=invalid'}}).then(r=>r.text());
  assert.match(invalid,/<html lang="en"/);
  assert.match(invalid,/WATCH OUR STORY/);
});

test('Japanese unknown product keeps the 404 status and translated recovery link',async()=>{
  const response=await fetch(base+'/projects/not-a-product',{headers:{Cookie:'kikae-language=jp'}});
  assert.equal(response.status,404);
  assert.match(await response.text(),/ページが見つかりません/);
});
