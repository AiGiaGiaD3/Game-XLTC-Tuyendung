// Logic tests in a Node VM with a minimal DOM stub; no browser automation.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map();const noop=()=>{};
const element=key=>{if(!elements.has(key))elements.set(key,{style:{},classList:{add:noop,remove:noop,toggle:noop},dataset:{},focus:noop,addEventListener:noop,setPointerCapture:noop,isConnected:true,tagName:'DIV',innerHTML:'',textContent:'',querySelectorAll:()=>[],getContext:()=>({})});return elements.get(key)};
function queryAll(selector){
 const attr=selector.match(/^\[data-([a-z]+)\]$/)?.[1];if(!attr)return [];
 return [...element('#modal').innerHTML.matchAll(new RegExp('data-'+attr+'="([^"]+)"','g'))].map(match=>{const e=element(attr+':'+match[1]);e.dataset[attr]=match[1];return e});
}
const context=vm.createContext({console,Math,JSON,performance:{now:()=>1},setInterval:()=>1,clearInterval:noop,requestAnimationFrame:noop,localStorage:{getItem:()=>null,setItem:noop},document:{querySelector:element,querySelectorAll:queryAll,body:{style:{}},activeElement:element('active'),addEventListener:noop,hidden:false},window:{matchMedia:()=>({matches:false}),addEventListener:noop}});
vm.runInContext(fs.readFileSync(__dirname+'/check.js','utf8')+`\nthis.api={openMission,renderMission,missionDone, get mission(){return mission}, get missions(){return MISSION_DATA},startLevel,physics,answer,finishQuiz,ask,optionsFor,hurt,respawn,timeoutQuiz,resume,goHome, get p(){return player},get w(){return world}, get q(){return quiz},get state(){return state},get save(){return save}, get cases(){return CASES}, tick(dt,input,jump=false){clock+=dt;keys=input;jumpQueued=jump;physics(dt)},setMode(m){save.mode=m}, setReturn(s){returnState=s}}`,context);
const a=context.api;
assert.equal(a.cases.length,30);
for(let i=0;i<30;i++)for(let s=0;s<4;s++){const o=a.optionsFor(i,s);assert.equal(o.filter(x=>x.ok).length,1);assert.equal(o.find(x=>x.ok).text,a.cases[i].s[s][0]);assert.equal(new Set(o.map(x=>x.text)).size,3)}
a.startLevel(0);
a.ask(0,1,'exit');
a.answer(a.q.options.findIndex(x=>!x.ok));
assert.equal(a.q.answered,true);
assert.equal(a.save.completed[1],undefined);
a.q.answered=false;
a.answer(a.q.options.findIndex(x=>x.ok));
const firstWorld = a.w;
a.finishQuiz();
assert.equal(a.w,firstWorld,'checkpoints continue in the same district');
assert.equal(a.w.track.index,1);
assert.equal(a.w.shield,0,'retry must not grant first-try shield');
const restPoint = a.w.checkpoint;
a.w.invuln=0;
a.hurt();
assert.equal(a.state,'quiz');
a.answer(a.q.options.findIndex(x=>x.ok));
a.finishQuiz();
assert.equal(a.p.x,restPoint);
assert.equal(a.w.shield,1);
a.w.invuln=0;
a.hurt(a.w.hazards[0]);
assert.equal(a.w.shield,0);
assert.equal(a.w.falls,1);
a.setMode('arcade');a.ask(0,2,'exit');a.timeoutQuiz();assert.equal(a.q.answered,true);assert.ok(element('#feedback').innerHTML.includes('Hết giờ'));a.setMode('chill');
// A simple scripted player uses actual movement/gravity/collisions, answers
// prompts, and jumps near hazards/gaps. It may fall, but must never softlock.
const results=[];
const layoutPatterns = new Set();
for(let i=0;i<30;i++){
 a.startLevel(i);
 const route=a.w.track.route;
 layoutPatterns.add(JSON.stringify([route.grounds,route.platforms,route.hazards,route.papers,route.springs]));
 assert.equal(a.w.stars.length,5);
 let ticks=0,rescues=0,landing=null;
 while(a.state!=='win'&&a.w.track.index===i&&ticks++<12000){
  if(a.state==='mission'){a.missionDone();continue;}
  if(a.state==='quiz'){
   if(a.q.kind==='rescue')rescues++;
   a.answer(a.q.options.findIndex(x=>x.ok));
   a.finishQuiz();
   landing=null;
   continue;
  }
  const p=a.p,w=a.w;
  const ground=w.grounds.find(([start,end])=>p.x+14>=start&&p.x+14<end);
  const edge=p.support?(p.support.drawX??p.support.x)+p.support.w:ground?.[1];
  const springAhead=w.springs.some(s=>Math.abs(s.x+s.w-edge)<1);
  const nextFloor=w.grounds.find(([start])=>start>=edge&&start>p.x+20);
  const gapAhead=!p.support&&nextFloor&&nextFloor[0]>edge+1;
  const nearGap=(p.support||gapAhead)&&edge-p.x<36&&!springAhead;
  const nearHazard=!p.support&&w.hazards.some(h=>!h.cleared&&h.type!=='pulse'&&(h.drawX??h.x)-p.x>68&&(h.drawX??h.x)-p.x<102);
  const stair=w.grounds.some(([start,end,y])=>start>p.x&&start-p.x<65&&y<p.y+p.h-4);
  const jumping=p.ground&&(nearGap||nearHazard||stair);
  if(p.ground)landing=null;
  if(jumping&&nearGap){
   const candidate=w.platforms.find(s=>s.t<.65&&(s.drawX??s.x)>p.x+26&&(s.drawX??s.x)<p.x+167);
   if(candidate)landing=candidate;
  }
  const right=!landing||p.x<(landing.drawX??landing.x)+landing.w*.53;
  a.tick(1/60,{ArrowRight:right,Space:true},jumping);
 }
 assert.ok(a.state==='win'||a.w.track.index===i+1,`checkpoint ${i+1}: x=${a.p.x} y=${a.p.y} rescues=${rescues}`);
 results.push({checkpoint:i+1,seconds:Math.round(ticks/60),rescues});
}
assert.equal(layoutPatterns.size,30);
assert.equal(a.missions.length,30);
assert.equal(a.save.unlocked,30);assert.equal(Object.keys(a.save.completed).length,30);
// Exercise the real mission button handlers, including retry and budget rules.
for(let i=0;i<30;i++){
 a.startLevel(i);a.openMission();const z=Math.floor(i/6),d=a.missions[i];
 assert.equal(a.state,'mission');
 if(z===0){element('#checkMission').onclick();assert.equal(a.state,'mission');for(const j of d[3]){element('clue:'+j).onclick();element('clue:'+j).onclick();}element('#checkMission').onclick();}
 if(z===1||z===4){element('pick:'+((d[3]+1)%3)).onclick();assert.equal(a.state,'mission');element('pick:'+d[3]).onclick();}
 if(z===2){element('chat:1').onclick();assert.equal(a.mission.phase,0);element('chat:0').onclick();assert.equal(a.mission.phase,1);element('chat:0').onclick();}
 if(z===3){element('#checkMission').onclick();assert.equal(a.state,'mission');d[2].forEach((v,j)=>element('sort:'+j+'-'+v).onclick());element('#checkMission').onclick();}
 if(z===4){element('#approvePlan').onclick();assert.equal(a.state,'mission');element('budget:0:1').onclick();element('budget:1:1').onclick();element('budget:2:1').onclick();element('budget:2:1').onclick();assert.equal(a.mission.tokens.reduce((x,y)=>x+y,0),3);element('#approvePlan').onclick();}
 assert.equal(a.state,'quiz','mission '+(i+1)+' must lead to source case');assert.equal(a.w.missionDone,true);
}
// Sổ tay from a completed level must return to actual home, not a frozen canvas.
a.setReturn('home');a.resume();assert.equal(a.w,null);assert.equal(a.state,'home');
console.log(JSON.stringify({passed:true,cases:30,questionVariants:120,checks:['content mapping','wrong answer retry','shield','checkpoint rescue','timeout','30 distinct routes and reachable checkpoints','unlock progression','home return'],results},null,2));
