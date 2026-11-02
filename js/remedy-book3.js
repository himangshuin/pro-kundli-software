// Jyotish Kundli v21 - third layer of AIFAS (Encyclopaedia of Astrological Remedies, EAR) remedies:
// today's remedy, Lal Kitab cautions and marriage rules, Saturn and house building, Vastu directions from the chart,
// colour therapy, upcoming fasting days (computed with the app's own ephemeris), vrata/mantra/stotra indexes,
// and planet-wise Lal Kitab extras. Condensed; traditional practices, not medical, legal or financial advice.
const bk3L=s=>s.trim().split('\n').map(l=>l.replace(/\s*\|\s*$/,'').split(' | ').map(x=>x.trim()));
const BK3_DAY=[['Sunday','Sun','Pink or orange clothes; Ruby, garnet, bloodstone or other pink/rose stones'],['Monday','Moon','White clothes; pearl and other white stones'],['Tuesday','Mars','Red clothes in all shades; coral and other red stones'],['Wednesday','Mercury','Green clothes; emerald, jade, peridot'],['Thursday','Jupiter','Yellow or golden clothes; yellow stones'],['Friday','Venus','White, off-white, silver-white or blue clothes; opal, aquamarine, diamond, zircon'],['Saturday','Saturn','Blue, indigo or black clothes; blue sapphire, sodalite and other blue stones']];
const BK3_LKP={ // Lal Kitab extras per planet (EAR ch.15)
 Sun:{serve:'The king, or any government executive',puja:'Worship the Sun; read Harivansh Purana',don:'wheat, copper, ruby, jaggery, red cloth, red flowers, red sandalwood, khandsari, saffron, brown buffalo',sp:'Throw jaggery in running water; offer jaggery to red-faced monkeys; copper coins in running water if the Sun troubles you in the 10th.'},
 Moon:{serve:'Your mother, grandmothers, mother-in-law or any elderly woman',puja:'Chant Shiv Chalisa; read Shiv Purana',don:'rice, milk, silver, pearl, curd, misri, white cloth, white sandalwood, white flowers, camphor, white horse',sp:'Keep a container of milk or water at your head at night and pour it on a Keekar tree in the morning; do not drink milk at night if the Moon troubles you from the 4th or 6th.'},
 Mars:{serve:'Your brother, brother-in-law or the brother-in-law’s friend',puja:'Chant Hanuman Chalisa; read Sundarkand',don:'red coral, gold, copper, wheat, ghee, red cloth, red flowers, red sandalwood, masoor dal, saunf (aniseed)',sp:'Donate sweets if Mars is helpful; if Mars is troublesome throw rewri (sugar-sesame sweet) or batasha in running water; keep ivory at home if Mars is bad.'},
 Mercury:{serve:'Your sister, daughter or a girl under 9',puja:'Durga Chalisa and Durga Saptashati; worship small girls',don:'emerald, gold, ivory, sugar, green cloth, flowers, moong dal, camphor, turpentine oil',sp:'Throw a copper piece with a hole in running water; donate green dal; give green clothes to girls; with Mercury in the 12th apply turmeric or saffron on the forehead for 43 days.'},
 Jupiter:{serve:'Your father, grandfather, family priest or any elder',puja:'Worship Lord Brahma; read Bhagavata Purana',don:'gold, topaz, ruby, horse, gram dal, salt, turmeric, jaggery, brown sugar, yellow cloth, yellow flowers, yellow sweets',sp:'Eat or apply saffron on the navel; apply turmeric on a Peepal trunk and wind cotton thread on Thursdays for eight weeks; with Jupiter in the 6th do not accept donations; offer clothes to a priest.'},
 Venus:{serve:'Your spouse or any woman',puja:'Worship Lakshmi; Shri Suktam and Lakshmi Suktam',don:'pearl, ghee, camphor, curd, diamond, silver, rice, sugar, mild scents, white cloth, white cow, white flowers',sp:'Please your wife with clothes and jewellery and stay neat and clean; donate cow, fodder, ghee or camphor.'},
 Saturn:{serve:'Your father’s elder brother, servants and labourers',puja:'Worship Lord Bhairava; stay away from alcohol',don:'blue sapphire, iron, gold, black gram, musk, black cow or buffalo, black cloth, black flowers, crow, black dog, black horse',sp:'Feed wheat-flour pills to fish; offer part of your food to crows first; avoid alcohol and meat; speak the truth; with Saturn in the 8th flow 800 g of horse bean (urad) in a river; mustard oil in an earthen pot buried near water if it troubles you in the 6th.'},
 Rahu:{serve:'Your father-in-law and maternal grandfather',puja:'Worship Goddess Saraswati; chant Saraswati Kavacham',don:'blue sapphire, hessonite, ruby, mustard, gold, sword, horse, blanket, mixed seven grains, lead, saffron',sp:'Wash barley in milk and flow it in a river; with Rahu in the 8th flow lead pieces or a coin in running water; keep a small lead ball; eat in the kitchen so Mars restrains Rahu.'},
 Ketu:{serve:'Your son, nephew or a boy under 9',puja:'Worship Lord Ganesha; Ganpati Sahasranama',don:'sesame, cat’s eye, gold, sword, musk, blanket, sugar, mixed seven grains, lead, saffron, a multi-coloured dog',sp:'Give part of your food to a multi-coloured dog; offer a black-and-white blanket in a temple to improve relations with your son; keep a dog at home.'}};
function bk3Rows(c,x){const P=BK3_LKP[x.p];if(!P)return'';
 return bkRow('Lal Kitab: serve to please '+x.p,pxEsc(tx(P.serve))+'. '+bkE('Blessings of these relatives are said to make the planet auspicious.'),'EAR ch.15')
  +bkRow('Lal Kitab: puja and reading',bkE(P.puja),'EAR ch.15')
  +bkRow('Lal Kitab: donation articles',bkE(P.don)+'. '+bkE('Do not donate the articles of an exalted or auspicious planet.'),'EAR ch.15')
  +bkRow('Lal Kitab: special remedy',bkE(P.sp),'EAR ch.15')}

// ---------- today ----------
function bk3Today(){const d=new Date(),w=d.getDay(),[dn,pl,dress]=BK3_DAY[w],P=BK_P[pl],g=P.gem;
 return`<div class="card bk-today"><h2>${tx('Today’s remedy')}: ${tx(dn)} · ${tx(pl)}</h2>
 <table class="px-t bk-t"><tr><th>${tx('Item')}</th><th>${tx('Remedy')}</th></tr>
 <tr><td>${tx('Worship')}</td><td>${bkE(P.dei['Lal Kitab'])} (${bkE('Lal Kitab deity')}); ${bkE(P.recite)}</td></tr>
 <tr><td>${tx('Mantra')}</td><td>${pxEsc(P.mt)}<br><small>${pxEsc(P.beej)}</small></td></tr>
 <tr><td>${tx('Dress and stones')}</td><td>${bkE(dress)}</td></tr>
 <tr><td>${tx('Charity')}</td><td>${bkE(P.give)}</td></tr>
 <tr><td>${tx('Fast')}</td><td>${bkE(P.vrata)}</td></tr></table>
 <small>${tx('Source: EAR ch.13, ch.16 and RAS ch.2. General weekday guidance, not tied to your chart.')}</small></div>`}

// ---------- Lal Kitab cautions + marriage ----------
function bk3Cautions(c){const h=c.h,o=[],has=(p,n)=>h[p]==n;
 if(has('Moon',6))o.push('Moon in the 6th: do not donate milk or water, and do not dig, repair or bore a well or water pump (the book says this harms the family).');
 if(has('Saturn',8))o.push('Saturn in the 8th: do not build an inn, hospice or guest house for others (the book says you could lose your own home).');
 if(has('Saturn',1)&&(has('Jupiter',5)||has('Jupiter',7)))o.push('Saturn in the 1st with Jupiter in the '+pxOrd(h.Jupiter)+': do not donate copper, copper coins or copper utensils.');
 if(has('Jupiter',10)&&has('Moon',4))o.push('Jupiter in the 10th with Moon in the 4th: do not build a temple.');
 if(has('Venus',9))o.push('Venus in the 9th: the book advises against adopting an orphan child.');
 if(has('Moon',12))o.push('Moon in the 12th: the book advises against feeding sages in large numbers or founding a free school.');
 if(has('Jupiter',7))o.push('Jupiter in the 7th: do not donate new clothes.');
 if(has('Sun',7)||has('Sun',8))o.push('Sun in the '+pxOrd(h.Sun)+': donations at sunrise or sunset are said to work like poison; donate at other times of day.');
 const empty2=c.inH(2).length==0,mal=['Saturn','Rahu','Ketu','Mars','Sun'];
 if(empty2&&(has('Saturn',8)||[6,8,12].some(n=>c.inH(n).some(p=>mal.includes(p)))))o.push('The 2nd house is empty and malefics sit in the 6th, 8th or 12th: the book advises saluting your Ishta Devta from outside rather than entering temples or pilgrimage places.');
 if(!o.length)return'';
 return`<div class="card"><h2>${tx('Lal Kitab cautions for your placements')}</h2>${bkUl(o)}<small>${tx('Source: EAR ch.15. These are the book’s own restrictions, shown as written; follow them only if you find them meaningful.')}</small></div>`}
function bk3Marriage(c){const h=c.h,o=[],hv=h.Venus,adj=[((hv+10)%12)+1,(hv%12)+1],mal=['Saturn','Rahu','Ketu','Mars'];
 if(h.Rahu==7)o.push(['Rahu in the 7th: the book says a marriage in the 21st year may not go well; avoid fixing it then.','']);
 if(adj.some(n=>c.inH(n).some(p=>mal.includes(p))))o.push(['A malefic sits next to Venus: the book links this to strain in marriage.','Keep a silver article at home and please your spouse; seek elders’ blessings.']);
 if(h.Mercury==6)o.push(['Mercury in the 6th: do not marry your daughter to a groom living in the north.','']);
 if(h.Moon==11)o.push(['Moon in the 11th: do not hold a daughter’s wedding at sunrise.','']);
 if(c.conj('Sun','Rahu')&&c.conj('Sun','Mercury'))o.push(['Sun, Rahu and Mercury together: marriage needs extra care and patience.','']);
 if(h.Venus==6)o.push(['Venus in the 6th: the book prefers a spouse who is the only child; in-laws give a gold clip to the daughter.','']);
 if(h.Venus==4||(h.Rahu==1||h.Rahu==5||h.Rahu==7)&&[h.Sun,h.Moon].some(n=>n==2))o.push(['Taking a square piece of silver from the in-laws and keeping it with you is advised.','For Venus in the 4th also flow Jupiter’s articles (e.g. gram dal) in running water.']);
 if(h.Ketu==8)o.push(['Ketu in the 8th: the groom should donate a white blanket at a religious place right after the marriage.','']);
 if(h.Moon==6)o.push(['Moon in the 6th (Pitri dosha): offer sweet roti to 100 dogs right after the marriage.','']);
 if(h.Mercury==12)o.push(['Mercury in the 12th: make two jointless stainless-steel rings; wear one at the wedding and flow the other in running water.','']);
 if(h.Venus==7&&h.Rahu==8)o.push(['Venus in the 7th and Rahu in the 8th: the spouse should avoid blue and black clothes.','']);
 const pos=[['Jupiter','two small square blocks of gold from the girl’s parents; keep one and flow the other in running water'],['Ketu','two small square pieces of gold, used the same way'],['Sun','two small square pieces of copper, used the same way']].filter(r=>c.dig(r[0])=='debilitated'||c.combust(r[0]));
 pos.forEach(r=>o.push([r[0]+' is weak or afflicted: '+r[1]+'.','']));
 if(!o.length)return'';
 return`<div class="card"><h2>${tx('Marriage notes and remedies (Lal Kitab)')}</h2>${o.map(r=>`<p class="w">${bkE(r[0])}${r[1]?` <b>${tx('Remedy')}:</b> ${bkE(r[1])}`:''}</p>`).join('')}<small>${tx('Source: EAR ch.15. Read as traditional cautions, not predictions.')}</small></div>`}

// ---------- Saturn and house building ----------
const BK3_SATHOME=['Weak Saturn here is said to be very hard on the native; if the 7th and 10th houses are empty a good house comes, otherwise construction leads into debt.','Accept whatever house comes and let it be built; do not stop construction midway.','Negative for money and children; keep three dogs after the house is built and worship a nearby Peepal tree daily.','Do not build or buy a house in your own name; construction may trouble mother, mother-in-law, maternal uncle or grandmother.','Building before 48 may harm children; if you must, leave a male buffalo in a forest. A house built by your children brings happiness.','Do not build before about 36–39 (it may affect daughters and relatives).','A ready-made or ancestral house is best; a threshold makes each house safe.','Construction is difficult; avoid building, especially if Rahu and Ketu are also weak.','Do not build during the wife’s pregnancy; construction may be very hard on the father.','Money trouble begins once the house is finished; living in a rented house is advised.','The house comes in old age; build after 55 and do not live in a south-facing house with a south entrance.','The house gets built early; do not stop any construction activity midway.'];
function bk3Home(c){const h=c.h.Saturn;
 return`<div class="card"><h2>${tx('Home and Saturn (Lal Kitab)')}</h2><p class="w">${tx('Saturn in your '+pxOrd(h)+' house')}: ${bkE(BK3_SATHOME[h-1])}</p>
 <p class="w">${tx('The 2nd house signifies the home and the 7th also shows its comfort; Saturn transiting the 2nd, 4th or 7th can signal a change of house. A weak or afflicted Saturn is said to deprive the native of house comfort in Saturn’s dasha.')}</p><small>${tx('Source: EAR ch.15.')}</small></div>`}

// ---------- Vastu from the chart ----------
const BK3_DIR=[['East',[1],'Sun','keeps the east free of faults'],['South-East',[11,12],'Venus','vehicles and comfort articles in the south-east'],['South',[10],'Mars','no faults in the south and no scarcity of food'],['South-West',[8,9],'Rahu / Ketu','—'],['West',[7],'Saturn','if afflicted, iron, wood or old junk lies in the west'],['North-West',[5,6],'Moon','no faults in the north-west when strong'],['North',[4],'Mercury','a study room or educational material in the north'],['North-East',[2,3],'Jupiter','open space, windows and religious books in the north-east']];
function bk3Vastu(c){
 const bad=p=>c.dig(p)=='debilitated'||c.combust(p)||/enemy/.test(c.dig(p)||'')||['Rahu','Ketu','Saturn'].some(q=>q!=p&&c.conj(p,q));
 const rows=BK3_DIR.map(d=>{const issues=[];d[1].forEach(n=>{const L=c.lord(n);if(bad(L)||[6,8,12].includes(c.h[L]))issues.push(tx(L)+' ('+tx('lord of house')+' '+n+')');if(c.inH(n).some(p=>['Rahu','Ketu'].includes(p)))issues.push(tx('Rahu/Ketu in house')+' '+n)});
  const pl=d[2].split(' / ')[0];if(BK3_DIR&&['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].includes(pl)&&bad(pl))issues.push(tx(pl)+' ('+tx('direction planet')+')');
  return`<tr><td>${tx(d[0])}</td><td>${d[1].join(', ')}</td><td>${tx(d[2])}</td><td class="w">${issues.length?`<span class="bk-v bk-no">${tx('Possible fault')}</span> ${pxEsc(issues.join('; '))}`:`<span class="bk-v bk-ok">${tx('No fault indicated')}</span> <small>${bkE(d[3])}</small>`}</td></tr>`}).join('');
 return`<div class="card sc"><h2>${tx('Vastu directions read from your chart (Lal Kitab)')}</h2>
 <p class="w">${tx('The book maps houses to directions: 1 East, 7 West, 4 North, 10 South, 2 and 3 North-East, 5 and 6 North-West, 8 and 9 South-West, 11 and 12 South-East. A house whose lord is debilitated, combust, in an enemy sign, with a malefic, or in the 6th, 8th or 12th is said to show a Vastu fault in that direction.')}</p>
 <table class="px-t"><tr><th>${tx('Direction')}</th><th>${tx('Houses')}</th><th>${tx('Planet')}</th><th>${tx('Reading')}</th></tr>${rows}</table>
 <small>${tx('Mars is shown for the south, as the book also does in its later notes. For a fault, keep that part of the home clean and uncluttered and propitiate the planet; the book also names Vastu Purush puja, Ganesh puja, Navagraha shanti, Shanti path and yagyas as remedies.')}</small></div>`}
function bk3VastuGuide(){
 const T={
  'Wealth':['No swimming pool, water body or low ground in the south-west.','Cash locker near the south or south-west wall, opening to the north (Kuber’s direction); never under a beam; a mirror facing it is said to double wealth.','Keep the north-east clutter-free, with no staircase or heavy machinery; no curved wall at its corner; no tall trees there.','Keep the south-west of the roof higher than the north-east; use the south-west or west as a store room; keep the centre of the home free.','Fix leaking taps; keep doors and windows clean; a moving-water fountain or a clean aerated aquarium in the north-east; feed grains and water to birds.'],
  'Doors, windows and mirrors':['Main entrance facing north, north-east, east or west; largest door in the house, well lit, with green plants and no mirror on it; avoid windows in the south and place windows opposite the main door.','Square or rectangular mirrors only; none opposite the entrance, the bed or each other; none on ceilings or the south wall; discard broken mirrors; cover glass doors with curtains.','For sleeplessness, headache or heart worry the book suggests a 3-inch mirror between the mattress and the bed, facing up.'],
  'North-east defects (toilet, kitchen, bedroom, staircase, cut, tank)':['The book says defects here can bring migraine, indecision, accidents to the head, infertility, financial loss and marital clashes.','Toilet in the north-east: place three upside-down bronze bowls at the ceiling in the north, east and north-east of the toilet.','Bathrooms and toilets are better in the north-west or north-east side (not at corners); the south-west or south-east is the next option (not at corners).'],
  'General corrections':['Keep beds out from under beams; use waterfall, goldfish, river or flying-bird pictures; wind chimes at the entrance; money plant and bamboo plant; clean the house with sea salt water.','Vastu Dosh Nivaran yantras and puja: Navgraha shanti, Vastu Purush puja, Ganesh puja, Shanti path, Navchandi and Agnihotri yagyas.'],
  'Lal Kitab Vastu tips':['Do not live near a cremation ground; keep some raw (kachi) earth floor and thorn-free flower pots at home.','Bad Mars: do not live in a south-facing house; the book suggests a silver wire across the main gate.','Leave a dark corner room as it is rather than forcing light into it (it is said to spoil Saturn’s good effects).']};
 return`<div class="card"><details class="px-p"><summary><b>${tx('Vastu quick guide (EAR ch.13–14)')}</b></summary>${Object.entries(T).map(([k,v])=>`<h4>${tx(k)}</h4>${bkUl(v)}`).join('')}<small>${tx('Traditional Vastu beliefs summarised from the book; structural changes should follow your own judgement and an expert’s advice.')}</small></details></div>`}

// ---------- colour therapy ----------
const BK3_ROOM=bk3L(`Aries | Coral red
Taurus | Milky, red
Gemini | Green
Cancer | Pink, white, pearl colour
Leo | Light white, ruby colour
Virgo | Various shades of green
Libra | Cement colour, milky white
Scorpio | Coral red, pink
Sagittarius | Golden yellow
Capricorn | Light red, cement colour
Aquarius | Blue, pink, cement colour
Pisces | Yellow, bright white`);
function bk3Colour(c){const m=c.sg.Moon,r=BK3_ROOM[m];
 const gate=bk3L(`East | Red
North-west | White
South | Red, golden
North | Green
North-east | Yellow
South-east | White, blue
West | Black
South-west | Black`).map(a=>`<tr><td>${tx(a[0])}</td><td>${tx(a[1])}</td></tr>`).join('');
 const rooms=bk3L(`Reception | White, light green, pink or blue
Drawing room | Yellow, soil colour, brown, green or black
Dining hall | Light pink, light blue or light green
Main bedroom | Pink, light green or light blue
Children’s room | Black, blue or green
Kitchen | White
Puja room | Black, green, red or pink
Study room | Brown, light blue, light green, red or pink
Bathroom | Black, grey, white or pink`).map(a=>`<tr><td>${tx(a[0])}</td><td>${tx(a[1])}</td></tr>`).join('');
 const dress=BK3_DAY.map(d=>`<tr><td>${tx(d[0])}</td><td>${tx(d[1])}</td><td class="w">${tx(d[2])}</td></tr>`).join('');
 const ch=bk3L(`Red | Root | Vitality, lungs, bones, heart, muscles | Mars
Orange | Sacral | Kidneys, intestines, lower spine; joy and creativity | Sun
Yellow | Solar plexus | Liver, gallbladder, pancreas, spleen, stomach; wisdom | Jupiter
Green | Heart | Balance, harmony, health, growth | Mercury
Blue | Throat | Calm, communication, sore throat, nervous excitement | Venus (as the book assigns)
Indigo | Brow | Eyes, ears, nose, sinuses, learning; intuition | Venus and Saturn
Violet | Crown | Nervous system and mental balance; spirituality | —`).map(a=>`<tr><td>${tx(a[0])}</td><td>${tx(a[1])}</td><td class="w">${tx(a[2])}</td><td>${tx(a[3])}</td></tr>`).join('');
 const ros=['White rosary: knowledge and peace of mind','Orange: quick results, overcoming enemies','Green: mathematics, commerce, communication, law, medicine','Yellow: honour, dignity, morality, success for students','Crystal: love, married life, cooperation, luxuries','Light brown: matters related to foreign countries','Grey: debt, litigation, loss, bones, arthritis'];
 return`<div class="card sc"><h2>${tx('Colour guide (AIFAS Encyclopaedia, ch.13)')}</h2>
 <p class="w">${tx('Moon sign')} <b>${SG[m]}</b>: ${tx('the book says the home colour scheme should follow the owner’s Rashi')}: <b>${tx(r[1])}</b>.</p>
 <details class="px-p"><summary><b>${tx('Dress and stones by weekday')}</b></summary><table class="px-t"><tr><th>${tx('Day')}</th><th>${tx('Planet')}</th><th>${tx('Colour and stones')}</th></tr>${dress}</table></details>
 <details class="px-p"><summary><b>${tx('Colours, chakras and planets')}</b></summary><table class="px-t"><tr><th>${tx('Colour')}</th><th>${tx('Chakra')}</th><th>${tx('Used for')}</th><th>${tx('Planet in the book')}</th></tr>${ch}</table><small>${tx('The book’s colour-planet assignment differs from the common one (e.g. blue to Venus, orange to the Sun). Colour therapy claims are traditional and not medical advice.')}</small></details>
 <details class="px-p"><summary><b>${tx('Coloured rosaries')}</b></summary>${bkUl(ros)}</details>
 <details class="px-p"><summary><b>${tx('Main gate colour by direction, and room colours')}</b></summary><table class="px-t"><tr><th>${tx('Direction')}</th><th>${tx('Colour')}</th></tr>${gate}</table><table class="px-t"><tr><th>${tx('Room')}</th><th>${tx('Colours')}</th></tr>${rooms}</table></details></div>`}

// ---------- upcoming fasting days ----------
const BK3_TITHI={10:['Ekadashi (Shukla)','Vishnu; no grains; fruits, milk and water'],25:['Ekadashi (Krishna)','Vishnu; no grains; fruits, milk and water'],12:['Pradosh (Shukla Trayodashi)','Shiva; fast through the day, worship at dusk'],27:['Pradosh (Krishna Trayodashi)','Shiva; fast through the day, worship at dusk'],18:['Sankashti Chaturthi','Ganesha; fast, moonrise worship; for removing crises'],28:['Masik Shivaratri','Shiva'],14:['Purnima','Satyanarayan, Chandra and charity; Guru Purnima, Sharad Purnima and others fall on Purnima'],29:['Amavasya','Pitri tarpan, Shraddha, charity'],3:['Vinayaka Chaturthi','Ganesha']};
const BK3_PRAD={0:'Ravi Pradosh: long life and good health',1:'Soma Pradosh: wishes fulfilled',2:'Bhauma Pradosh: relief from debt',3:'Budha Pradosh: wishes fulfilled',4:'Guru Pradosh: removes enemy fear',5:'Shukra Pradosh: marital harmony and wealth',6:'Shani Pradosh: children and prosperity'};
function bk3Upcoming(ms,tz,la,lo){
 const out=[],SL=[[6.5,[10,25,14,29,3]],[18.25,[12,27]],[20,[18]],[23.9,[28]]],MON=(typeof LANG!='undefined'&&LANG=='as')?['জানুৱাৰী','ফেব্ৰুৱাৰী','মাৰ্চ','এপ্ৰিল','মে’','জুন','জুলাই','আগষ্ট','ছেপ্তেম্বৰ','অক্টোবৰ','নৱেম্বৰ','ডিচেম্বৰ']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];let ok=true;
 try{const base=Date.now(),day0=Math.floor((base+tz*36e5)/864e5)*864e5-tz*36e5;
  for(let k=0;k<45;k++){const rows=[];
   SL.forEach(([hr,set])=>{const t=day0+k*864e5+hr*36e5;if(t<base-36e5)return;const s=calc(t/864e5+2440587.5,la,lo).sid,ti=Math.floor((((s.Moon-s.Sun)%360)+360)%360/12);if(set.includes(ti))rows.push([ti,t])});
   rows.forEach(([ti,t])=>{const f=BK3_TITHI[ti],dt=new Date(day0+k*864e5+tz*36e5),wd=dt.getUTCDay(),name=(ti==12||ti==27)?f[0]+' · '+BK3_PRAD[wd]:f[0];
    out.push(`<tr><td>${dt.getUTCDate()} ${MON[dt.getUTCMonth()]} ${dt.getUTCFullYear()}</td><td>${tx(BK3_DAY[wd][0])}</td><td class="w">${bkE(name)}</td><td class="w">${bkE(f[1])}</td></tr>`)})}
 }catch(e){ok=false}
 if(!ok||!out.length)return'';
 return`<div class="card sc"><h2>${tx('Upcoming fasting days (next 45 days)')}</h2><table class="px-t"><tr><th>${tx('Date')}</th><th>${tx('Day')}</th><th>${tx('Vrata')}</th><th>${tx('Observance')}</th></tr>${out.join('')}</table>
 <small>${tx('Computed with the app’s own calculation from the Moon–Sun angle at the usual time for each vrata (sunrise for Ekadashi, Purnima, Amavasya and Chaturthi; dusk for Pradosh; evening for Sankashti; midnight for Shivaratri). Exact days depend on local tithi timings and the lunar month, so confirm with a local panchang.')}</small></div>`}
const BK3_VRATA=bk3L(`Gurupurnima / Vyas Purnima | Showing respect, faith and devotion to the Guru
Kokila | Family prosperity, beauty, children
Kamika Ekadashi | Liberation from sins
Naag Panchami | Protection from snake bite
Putrada Ekadashi | Sons
Srikrishna Janmashtami | Faith in Krishna, prosperity
Haritalika | Suitable husband; ladies’ fast
Kapardi Vinayak | Fulfilment of wishes
Rishi Panchami | Freedom from physical, verbal and mental sins
Parivartini / Padma Ekadashi | Faith in God, wishes
Anant Chaturdashi | Auspicious results
Jeevatputrika | Protection of sons
Indira Ekadashi | Satisfaction and redemption of ancestors
Papankusha Ekadashi | Destroys sins
Sharad Purnima | Wishes and protection of children
Navratri | Worship of Durga; peace, prosperity
Karwa Chauth | Husband’s long life
Ahoi Ashtami | Sons’ long life
Rama Ekadashi | Eradicates sins; good luck
Dhan Teras | Long, healthy life
Narak Chaturdashi | Pleasing Yamraj
Deepawali / Lakshmi Pujan | Riddhi, Siddhi, wealth and prosperity
Annakoot | Krishna’s blessings; protection of cows
Chhath (Suryopasana) | Children
Paapmochani Ekadashi | Frees from sins
Varuthini Ekadashi | Betters this world and the next
Sankasht Ganesh Chaturthi | Overcoming crisis; fulfilment of wishes
Arundhati Vrata | Marital longevity (observed in the south)`);
const BK3_MANTRA=bk3L(`Guru, Brihaspati, Sukracharya and Dattatreya mantras | Blessings of the Guru and self-realisation (worship the Guru each morning before leaving bed)
Gayatri, Ganpati, Hanuman, Bhairav, Durga, Gauri | Deity mantras
Durga Saptashati Siddha Samputa, Lalita Mahatripur Sundari, Mahalaxmi, Saraswati, Dashmahavidya | Goddess mantras
Shiv, Surya, Laxmi Narayan, Vishnu, Vishnu Dashavtar | Shiva, Sun and Vishnu mantras
Kamdev, Varun, Kuber, Putra Prapti, Vartali, Panchanguli | Love, rain, wealth, children, Varahi, prophecy
Swapna Siddhi, Swapna Matangi, Sarva Siddhi, Putra Sampada Prapti | Dream, success and children mantras
Sarva Rog Nash, Mohan, Education and Intelligence, Knowing Past Present and Future, Baudh | Healing, attraction, education, divination
Navagrah mantras | Planet mantras (see each planet’s block)
Stotras | Shri Suktam, Lakshmi Suktam, Kanakdhara, Mahalakshmyashtakam, Annapurna, Saraswati, Baglamukhi, Durga Kavach, Mahamrityunjaya Kavach, Purusha Sukta, Hanuman stuti, Lalita Pancharatna, Navagraha stotra, Navagraha Peeda Har, Surya Ashtakam, Surya Kavach, Aditya Hridaya`);
function bk3Lib(){
 const cat=(t,b)=>`<details class="bk-cat px-p"><summary><b>${tx(t)}</b></summary>${b}</details>`;
 const tab=(h,rows)=>`<table class="px-t bk-lt"><tr>${h.map(x=>`<th>${tx(x)}</th>`).join('')}</tr>${rows.map(r=>`<tr data-s="${pxEsc(r.join(' ').toLowerCase())}">${r.map(v=>`<td class="w">${pxEsc(tx(v))}</td>`).join('')}</tr>`).join('')}</table>`;
 const prin=['Before any remedy: vegetarian food, serve widows and guests, respect parents and in-laws, no bitter words, no alcohol, no extramarital relations, keep no broken utensils, keep a patch of raw earth at home, take elders’ blessings daily.','Do a remedy for at least 21 and at most 43 days, in the daytime between sunrise and sunset; only one remedy a day; restart if it breaks; a blood relative can do it for you.','For a troublesome planet, bury its article in the earth or throw it into running water; for a mildly bad planet keep the article of its enemy planet; to calm a helpful planet that gives bad results, offer its article at its significator place (e.g. gram at a temple for Jupiter).','Do not donate the articles of an exalted planet; do not accept the articles of a debilitated planet even as a gift.','Remedies may be weak if the house, its lord, and its significators are all afflicted; they work better if that house has a benefic influence.'];
 const gem=['Choose a flawless, naturally coloured stone; flaws the book names for gems include cracks or zigzag lines, spots, cloudy or lifeless colour and uneven colour.','Wear a gem on the planet’s day in Shukla Paksha after puja and the planet’s mantra, set so that it touches the skin; avoid combining rival gems.','Test a gem for a period and watch the effects; consult a qualified astrologer first.','To remove a gem, do it on the planet’s day after prayer; wash it with Ganga jal and donate it or put it in flowing water with respect.'];
 return`<div class="card sc bk-lib"><h2>${tx('More from the Encyclopaedia')}</h2><input class="bk-q" type="search" placeholder="${pxEsc(tx('Search these lists'))}" oninput="bk2Filter(this)" aria-label="${pxEsc(tx('Search these lists'))}">
 ${cat('Lal Kitab rules and general principles',bkUl(prin))}
 ${cat('Choosing, wearing and removing gems',bkUl(gem))}
 ${cat('Vratas (fasts) and their purpose',tab(['Vrata','Benefit'],BK3_VRATA))}
 ${cat('Mantras and stotras covered in the book',tab(['Group','Purpose or list'],BK3_MANTRA))}
 <small>${tx('The Sanskrit text of most mantras in the PDF could not be read, so only names and purposes are listed.')}</small></div>`}
function bk3Cards(c,ms,tz,la,lo){
 let u='';try{u=bk3Upcoming(ms,tz,la,lo)}catch(e){}
 return bk3Today()+u+bk3Cautions(c)+bk3Marriage(c)+bk3Home(c)+bk3Vastu(c)+bk3VastuGuide()+bk3Colour(c)+bk3Lib()}
