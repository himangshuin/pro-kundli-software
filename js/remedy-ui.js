// Jyotish Kundli v23 - layout, navigation and mobile behaviour of the Remedies tab:
// sticky section bar with scroll-spy, overview with jump chips, collapsible groups, global search, labelled stacked tables.
const RM_GLY={Sun:'☉',Moon:'☽',Mars:'♂',Mercury:'☿',Jupiter:'♃',Venus:'♀',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const rmId=(h,id)=>h?h.replace(/^<div class="card/,`<div id="${id}" class="card`):'';
function rmGroup(id,gl,title,sub,html,open){
 if(!html||!html.replace(/\s/g,''))return'';
 return`<details class="card rm-group" id="rm-g-${id}"${open?' open':''}><summary><span class="rm-gi" aria-hidden="true">${gl}</span><span class="rm-gt"><h2>${tx(title)}</h2>${sub?`<small>${sub}</small>`:''}</span></summary><div class="rm-body">${html}</div></details>`}
function rmChip(id,label,cls,gl){return`<button type="button" class="rm-chip ${cls||''}${String(label).length>24?' rm-wide':''}" onclick="rmGo('${id}')">${gl?`<span class="rm-cg" aria-hidden="true">${gl}</span>`:''}<span class="rm-cl">${label}</span></button>`}
const rmStickyTop=()=>{let o=0;['.top','#tb'].forEach(s=>{const e=document.querySelector(s);if(e&&getComputedStyle(e).position==='sticky')o+=e.offsetHeight});return o};
function rmOff(el){const nav=document.querySelector('.rm-nav');let o=rmStickyTop()+(nav?nav.offsetHeight:0)+8;
 const g=el.closest?el.closest('details.rm-group'):null;if(g&&g!==el&&RM_MOBILE()){const s=g.querySelector(':scope > summary');if(s)o+=s.offsetHeight}return o}
function rmGo(id){const el=document.getElementById(id);if(!el)return;let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement}
 requestAnimationFrame(()=>{const y=el.getBoundingClientRect().top+scrollY-rmOff(el);scrollTo({top:Math.max(0,y),behavior:'smooth'})})}
function rmFocusSearch(){const q=document.querySelector('.rm-q');if(!q)return;rmGo('rm-g-ov');setTimeout(()=>{try{q.focus({preventScroll:true})}catch(e){q.focus()}},350)}
function rmSearch(inp){const q=inp.value.toLowerCase().trim(),sec=inp.closest('section')||document;let total=0;
 sec.querySelectorAll('details.rm-group').forEach(g=>{let any=false;
  g.querySelectorAll(':scope > .rm-body > .card').forEach(cd=>{const hit=!q||cd.textContent.toLowerCase().includes(q);cd.hidden=!hit;if(hit)any=true;
   cd.querySelectorAll('details.px-p, details.bk-cat').forEach(dd=>{const m=!q||dd.textContent.toLowerCase().includes(q);dd.hidden=!m;if(q&&m)dd.open=true});
   cd.querySelectorAll('tr[data-s]').forEach(r=>{r.hidden=!!q&&!r.dataset.s.includes(q)})});
  g.hidden=!!q&&!any;if(q&&any){g.open=true;total++}});
 const n=sec.querySelector('.rm-none');if(n)n.hidden=!(q&&!total);
 sec.querySelectorAll('.rm-nav button[data-g]').forEach(b=>{const g=document.getElementById(b.dataset.g);b.hidden=!!q&&g&&g.hidden})}
function rmAll(open,btn){const sec=btn.closest('section')||document;sec.querySelectorAll('details.rm-group').forEach(g=>{g.open=open})}
function rmCompose(sid,ms,tz,mnk,la,lo,c,d,bc){
 const plan=pxPlanetPlan(c,d.lords),T=pxTransit(c,la,lo),need=plan.filter(x=>x.pri>=3);
 const ksy=bkKalsarpa(c),mng=bkManglik(c),debt=bkDebts(c),pit=bkPitri(c),cau=bk3Cautions(c),mar=bk3Marriage(c),sade=bkSadeCard(c,la,lo);
 const pc=plan.map(x=>rmChip('rm-p-'+x.p,tx(x.p),'rm-c-'+x.mode+(x.pri>=3?' rm-c-hi':''),RM_GLY[x.p])).join('');
 const fl=[];if(T.ss)fl.push(rmChip('rm-c-sade',tx(T.ss),'rm-c-flag','♄'));
 if(ksy)fl.push(rmChip('rm-c-ksy',tx('Kala Sarpa'),'rm-c-flag','☊'));if(mng)fl.push(rmChip('rm-c-mng',tx('Manglik dosha'),'rm-c-flag','♂'));
 if(debt)fl.push(rmChip('rm-c-debt',tx('Lal Kitab debts'),'rm-c-flag','⚑'));if(pit)fl.push(rmChip('rm-c-pit',tx('Pitri dosha'),'rm-c-flag','☉'));
 if(cau)fl.push(rmChip('rm-c-cau',tx('Lal Kitab cautions'),'rm-c-flag','⚑'));if(mar)fl.push(rmChip('rm-c-mar',tx('Marriage notes'),'rm-c-flag','♀'));
 const ov=`<div class="card rm-ov" id="rm-g-ov"><h2>${tx('Your remedy overview')}</h2>
  <p class="w">${need.length?tx('Planets that most need attention')+': '+need.slice(0,4).map(x=>`<b>${tx(x.p)}</b>`).join(', ')+'.':tx('No planet shows a pressing need; routine worship of the dasha lord is enough.')} <span class="rm-hint">${tx('Tap a planet or a flag to jump to it. The sections below open and close.')}</span></p>
  <div class="rm-sect"><span class="rm-lab">${tx('Planets')}</span><div class="rm-chips rm-planets">${pc}</div></div>
  ${fl.length?`<div class="rm-sect"><span class="rm-lab">${tx('Flags in your chart')}</span><div class="rm-chips rm-flags">${fl.join('')}</div></div>`:''}
  <div class="rm-leg"><span class="rm-badge rm-b-appease">${tx('Appease')}</span><span class="rm-lt"> ${tx('worship, charity, no gem')}</span> <span class="rm-badge rm-b-strengthen">${tx('Strengthen')}</span><span class="rm-lt"> ${tx('mantra, yantra, gem if allowed')}</span> <span class="rm-badge rm-b-support">${tx('Support')}</span><span class="rm-lt"> ${tx('routine worship')}</span></div>
  <div class="rm-tools"><input class="rm-q" type="search" enterkeyhint="search" placeholder="${pxEsc(pxTr(tx('Search remedies…')))}" oninput="rmSearch(this)" aria-label="${pxEsc(pxTr(tx('Search all remedies')))}"><button type="button" class="ghost" onclick="rmAll(true,this)">${tx('Expand all')}</button><button type="button" class="ghost" onclick="rmAll(false,this)">${tx('Collapse all')}</button></div>
  <p class="rm-none" hidden>${tx('No remedy matches your search.')}</p>
  <details class="rm-about"><summary>${tx('About these remedies')}</summary><small>${tx('BPHS remedies (Parashara) come first; remedies from the course books RAS (Remedies of Astrological Science) and EAR (Encyclopaedia of Astrological Remedies) are added and labelled. All are traditional practices, not medical, legal or financial advice.')}</small></details></div>`;
 const today=(typeof bk3Today=='function'?bk3Today():'')+(typeof bk3Upcoming=='function'?bk3Upcoming(ms,tz,la,lo):'')+(typeof gxWeekly=='function'?gxWeekly(c,d.lords):'');
 const time=d.html+pxTransitRem(c,la,lo)+rmId(sade,'rm-c-sade');
 const planets=pxPlanetCard(c,d.lords);
 const gems=bkGemCard(c)+bk2Personal(c)+bkRudCard(c);
 const dosh=rmId(ksy,'rm-c-ksy')+rmId(mng,'rm-c-mng')+rmId(debt,'rm-c-debt')+rmId(pit,'rm-c-pit')+rmId(cau,'rm-c-cau')+rmId(mar,'rm-c-mar')+pxCheckCard(bc);
 const home=bk3Home(c)+bk3Vastu(c)+bk3VastuGuide()+bk3Colour(c);
 const lib=pxRefCard()+bkRefCard()+bk2Lib()+bk3Lib();
 const nd=[ksy,mng,debt,pit,cau,mar].filter(Boolean).length;
 const G=[['today','☉','Today','Today and upcoming days',tx('weekday remedy, fasting days, weekly guide'),today,true],
  ['time','⌛','Periods','Dasha, transit and Sade Sati',tx('what to do in the running periods'),time,false],
  ['planets','♃','Planets','Planet-wise remedies',need.length?need.length+' '+tx('need attention'):'',planets,true],
  ['gems','◆','Gems','Gems, Rudraksha and herbs',tx('rules for your Lagna'),gems,false],
  ['doshas','⚑','Doshas','Doshas, cautions and debts',nd?nd+' '+tx('flagged in your chart'):tx('birth-time checks'),dosh,false],
  ['home','⌂','Home','Home, Vastu and colour',tx('directions from your chart'),home,false],
  ['purpose','✦','Purpose','Remedies by purpose',tx('health, children, marriage, debt'),bkPurposeCard(c),false],
  ['lib','☰','Library','Library and reference',tx('yantras, lockets, conch, crystals, vratas'),lib,false]].filter(g=>g[5]&&g[5].replace(/\s/g,''));
 const nav=`<nav class="rm-nav" aria-label="${pxEsc(pxTr(tx('Sections')))}"><button type="button" class="rm-ns" onclick="rmFocusSearch()" aria-label="${pxEsc(pxTr(tx('Search all remedies')))}">⌕</button><button type="button" data-g="rm-g-ov" class="on" onclick="rmGo('rm-g-ov')">${tx('Overview')}</button>${G.map(g=>`<button type="button" data-g="rm-g-${g[0]}" onclick="rmGo('rm-g-${g[0]}')">${tx(g[2])}</button>`).join('')}</nav>`;
 return nav+ov+G.map(g=>rmGroup(g[0],g[1],g[3],g[4],g[5],g[6])).join('')}

// ---- runtime behaviour (runs after the tab HTML is inserted) ----
const RM_MOBILE=()=>matchMedia('(max-width: 760px)').matches;
function rmEnhance(){
 // 1. label every multi-column table so the existing stacked-table CSS (px-st + data-l) can show column names on phones
 document.querySelectorAll('section[data-t="remedy"] .rm-body table').forEach(t=>{
  if(t.dataset.rm)return;t.dataset.rm='1';
  if(t.classList.contains('bk-t')||t.classList.contains('bk-sq')||(t.parentElement&&t.parentElement.classList.contains('rm-pl')))return;
  const rows=[...t.rows];if(rows.length<2)return;
  const hr=rows[0],ths=[...hr.cells];if(ths.length<2||ths.some(c=>c.tagName!=='TH'))return;
  const labels=ths.map(c=>c.textContent.trim());
  rows.slice(1).forEach(r=>[...r.cells].forEach((c,i)=>{if(!c.dataset.l&&labels[i])c.dataset.l=labels[i]}));
  rows.slice(1).forEach(r=>[...r.cells].forEach((c,i)=>{if(i>0&&c.textContent.trim().length<=26)c.classList.add('rm-s')}));
  t.classList.add('px-st')});
 // 2. phones: start with one planet card open and the book block closed so the page is short
 if(RM_MOBILE()){document.querySelectorAll('section[data-t="remedy"] details.rm-pl').forEach((d,i)=>{d.open=i===0});
  document.querySelectorAll('section[data-t="remedy"] details.bk-box').forEach(b=>{b.open=false})}}
let rmSpy=null;
function rmNavInit(){
 const sec=document.querySelector('section[data-t="remedy"]'),nav=sec&&sec.querySelector('.rm-nav');if(!nav)return;
 const stuck=e=>e&&getComputedStyle(e).position==='sticky'&&e.offsetHeight>0?e.offsetHeight:0;
 const set=()=>{sec.style.setProperty('--rm-nav',nav.offsetHeight+'px');sec.style.setProperty('--rm-hdr',(stuck(document.querySelector('.top'))+stuck(document.getElementById('tb')))+'px')};set();
 const groups=[...sec.querySelectorAll('#rm-g-ov, details.rm-group')];
 let raf=0,last='';
 const upd=()=>{raf=0;if(!document.body.contains(nav))return;
  const line=nav.getBoundingClientRect().bottom+96;let cur=groups[0]?groups[0].id:'';
  groups.forEach(g=>{if(!g.hidden&&g.getBoundingClientRect().top<=line)cur=g.id});
  if(cur===last)return;last=cur;
  nav.querySelectorAll('button[data-g]').forEach(b=>b.classList.toggle('on',b.dataset.g===cur));
  const b=nav.querySelector(`button[data-g="${cur}"]`);if(b)nav.scrollTo({left:Math.max(0,b.offsetLeft-nav.clientWidth/2+b.offsetWidth/2),behavior:'smooth'})};
 if(rmSpy){removeEventListener('scroll',rmSpy);removeEventListener('resize',rmSpy)}
 rmSpy=()=>{set();if(!raf)raf=requestAnimationFrame(upd)};
 addEventListener('scroll',rmSpy,{passive:true});addEventListener('resize',rmSpy,{passive:true});upd()}
(function(){let tm;const go=()=>{clearTimeout(tm);tm=setTimeout(()=>{try{rmEnhance();rmNavInit()}catch(e){console.error('rm',e)}},80)};
 const start=()=>{const out=document.getElementById('out');if(!out)return;new MutationObserver(go).observe(out,{childList:true});go()};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();
