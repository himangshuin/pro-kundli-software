// Jyotish Kundli v22 - layout and navigation for the Remedies tab: overview with jump chips, collapsible groups, global search.
const RM_GLY={Sun:'☉',Moon:'☽',Mars:'♂',Mercury:'☿',Jupiter:'♃',Venus:'♀',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const rmId=(h,id)=>h?h.replace(/^<div class="card/,`<div id="${id}" class="card`):'';
function rmGroup(id,gl,title,sub,html,open){
 if(!html||!html.replace(/\s/g,''))return'';
 return`<details class="card rm-group" id="rm-g-${id}"${open?' open':''}><summary><span class="rm-gi" aria-hidden="true">${gl}</span><span class="rm-gt"><h2>${tx(title)}</h2>${sub?`<small>${sub}</small>`:''}</span></summary><div class="rm-body">${html}</div></details>`}
function rmChip(id,label,cls,gl){return`<button type="button" class="rm-chip ${cls||''}" onclick="rmGo('${id}')">${gl?`<span aria-hidden="true">${gl}</span> `:''}${label}</button>`}
function rmGo(id){const el=document.getElementById(id);if(!el)return;let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement}
 const off=(document.querySelector('.top')||{offsetHeight:0}).offsetHeight+(document.getElementById('tb')||{offsetHeight:0}).offsetHeight+8;
 scrollTo({top:el.getBoundingClientRect().top+scrollY-off,behavior:'smooth'})}
function rmSearch(inp){const q=inp.value.toLowerCase().trim(),sec=inp.closest('section')||document;let total=0;
 sec.querySelectorAll('details.rm-group').forEach(g=>{let any=false;
  g.querySelectorAll(':scope > .rm-body > .card').forEach(cd=>{const hit=!q||cd.textContent.toLowerCase().includes(q);cd.hidden=!hit;if(hit)any=true;
   cd.querySelectorAll('details.px-p, details.bk-cat').forEach(dd=>{const m=!q||dd.textContent.toLowerCase().includes(q);dd.hidden=!m;if(q&&m)dd.open=true});
   cd.querySelectorAll('tr[data-s]').forEach(r=>{r.hidden=!!q&&!r.dataset.s.includes(q)})});
  g.hidden=!!q&&!any;if(q&&any){g.open=true;total++}});
 const n=sec.querySelector('.rm-none');if(n)n.hidden=!(q&&!total)}
function rmAll(open,btn){const sec=btn.closest('section')||document;sec.querySelectorAll('details.rm-group').forEach(g=>{g.open=open})}
function rmCompose(sid,ms,tz,mnk,la,lo,c,d,bc){
 const plan=pxPlanetPlan(c,d.lords),T=pxTransit(c,la,lo),need=plan.filter(x=>x.pri>=3);
 const ksy=bkKalsarpa(c),mng=bkManglik(c),debt=bkDebts(c),pit=bkPitri(c),cau=bk3Cautions(c),mar=bk3Marriage(c),sade=bkSadeCard(c,la,lo);
 // overview
 const pc=plan.map(x=>rmChip('rm-p-'+x.p,tx(x.p),'rm-c-'+x.mode+(x.pri>=3?' rm-c-hi':''),RM_GLY[x.p])).join('');
 const fl=[];if(T.ss)fl.push(rmChip('rm-c-sade',tx(T.ss),'rm-c-flag','♄'));
 if(ksy)fl.push(rmChip('rm-c-ksy',tx('Kala Sarpa'),'rm-c-flag','☊'));if(mng)fl.push(rmChip('rm-c-mng',tx('Manglik dosha'),'rm-c-flag','♂'));
 if(debt)fl.push(rmChip('rm-c-debt',tx('Lal Kitab debts'),'rm-c-flag','⚑'));if(pit)fl.push(rmChip('rm-c-pit',tx('Pitri dosha'),'rm-c-flag','☉'));
 if(cau)fl.push(rmChip('rm-c-cau',tx('Lal Kitab cautions'),'rm-c-flag','⚑'));if(mar)fl.push(rmChip('rm-c-mar',tx('Marriage notes'),'rm-c-flag','♀'));
 const ov=`<div class="card rm-ov" id="rm-g-ov"><h2>${tx('Your remedy overview')}</h2>
  <p class="w">${need.length?tx('Planets that most need attention')+': '+need.slice(0,4).map(x=>`<b>${tx(x.p)}</b>`).join(', ')+'.':tx('No planet shows a pressing need; routine worship of the dasha lord is enough.')} ${tx('Tap a planet or a flag to jump to it. The sections below open and close.')}</p>
  <div class="rm-sect"><span class="rm-lab">${tx('Planets')}</span><div class="rm-chips">${pc}</div></div>
  ${fl.length?`<div class="rm-sect"><span class="rm-lab">${tx('Flags in your chart')}</span><div class="rm-chips">${fl.join('')}</div></div>`:''}
  <div class="rm-leg"><span class="rm-badge rm-b-appease">${tx('Appease')}</span> ${tx('worship, charity, no gem')} <span class="rm-badge rm-b-strengthen">${tx('Strengthen')}</span> ${tx('mantra, yantra, gem if allowed')} <span class="rm-badge rm-b-support">${tx('Support')}</span> ${tx('routine worship')}</div>
  <div class="rm-tools"><input class="rm-q" type="search" placeholder="${pxEsc(pxTr(tx('Search all remedies, e.g. Saturn, wealth, Hanuman, marriage')))}" oninput="rmSearch(this)" aria-label="${pxEsc(pxTr(tx('Search all remedies')))}"><button type="button" class="ghost" onclick="rmAll(true,this)">${tx('Expand all')}</button><button type="button" class="ghost" onclick="rmAll(false,this)">${tx('Collapse all')}</button></div>
  <p class="rm-none" hidden>${tx('No remedy matches your search.')}</p>
  <small>${tx('BPHS remedies (Parashara) come first; remedies from the course books RAS (Remedies of Astrological Science) and EAR (Encyclopaedia of Astrological Remedies) are added and labelled. All are traditional practices, not medical, legal or financial advice.')}</small></div>`;
 const today=(typeof bk3Today=='function'?bk3Today():'')+(typeof bk3Upcoming=='function'?bk3Upcoming(ms,tz,la,lo):'')+(typeof gxWeekly=='function'?gxWeekly(c,d.lords):'');
 const time=d.html+pxTransitRem(c,la,lo)+rmId(sade,'rm-c-sade');
 const planets=pxPlanetCard(c,d.lords);
 const gems=bkGemCard(c)+bk2Personal(c)+bkRudCard(c);
 const dosh=rmId(ksy,'rm-c-ksy')+rmId(mng,'rm-c-mng')+rmId(debt,'rm-c-debt')+rmId(pit,'rm-c-pit')+rmId(cau,'rm-c-cau')+rmId(mar,'rm-c-mar')+pxCheckCard(bc);
 const home=bk3Home(c)+bk3Vastu(c)+bk3VastuGuide()+bk3Colour(c);
 const lib=pxRefCard()+bkRefCard()+bk2Lib()+bk3Lib();
 const nd=[ksy,mng,debt,pit,cau,mar].filter(Boolean).length;
 return ov
  +rmGroup('today','☉','Today and upcoming days',tx('weekday remedy, fasting days, weekly guide'),today,true)
  +rmGroup('time','⌛','Dasha, transit and Sade Sati',tx('what to do in the running periods'),time,false)
  +rmGroup('planets','♃','Planet-wise remedies',need.length?need.length+' '+tx('need attention'):'',planets,true)
  +rmGroup('gems','◆','Gems, Rudraksha and herbs',tx('rules for your Lagna'),gems,false)
  +rmGroup('doshas','⚑','Doshas, cautions and debts',nd?nd+' '+tx('flagged in your chart'):tx('birth-time checks'),dosh,false)
  +rmGroup('home','⌂','Home, Vastu and colour',tx('directions from your chart'),home,false)
  +rmGroup('purpose','✦','Remedies by purpose',tx('health, children, marriage, debt'),bkPurposeCard(c),false)
  +rmGroup('lib','☰','Library and reference',tx('yantras, lockets, conch, crystals, vratas'),lib,false)}
