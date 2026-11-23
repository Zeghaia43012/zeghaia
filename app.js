"use strict";
(function(){
const D=window.DATA,$=s=>document.querySelector(s),app=$("#app");
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const PC={rnd:"#1f5fa8",fln:"#b3261e",ffs:"#2e8b57",mbn:"#c98a00"},SIL=`<svg viewBox="0 0 100 120" aria-hidden="true"><circle cx="50" cy="42" r="22"/><path d="M8 120c2-34 20-48 42-48s40 14 42 48z"/></svg>`;
const party=id=>D.parties.find(p=>p.id===id),list=id=>D.lists.find(l=>l.id===id);
const norm=s=>String(s||"").normalize("NFKD").replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/\s+/g," ").trim().toLowerCase();
const nf=n=>n.toLocaleString("ar-DZ-u-nu-latn");
const count=id=>D.candidates.filter(c=>c.listId===id).length;
const sorted=a=>a.slice().sort((x,y)=>(x.rank??999)-(y.rank??999));
const date=new Date(D.election.date+"T00:00:00");
const fmt=d=>d.toLocaleDateString("ar-DZ-u-nu-latn",{day:"numeric",month:"long",year:"numeric"});
function head(t,intro,back){return `<div class="wrap ph">${back?`<a class="crumb" href="${back[0]}">← ${back[1]}</a>`:""}<h1>${esc(t)}</h1>${intro?`<p>${esc(intro)}</p>`:""}</div>`}
function candCard(c,showParty){const p=party(c.partyId);
 return `<a class="card cand" href="#/candidates/${c.id}" style="--pc:${PC[c.partyId]||"#145a3e"}"><div class="pic">${c.photo?`<img loading="lazy" src="${c.photo}" alt="${esc(c.name)}">`:SIL}${c.rank?`<span class="rk">${c.rank}</span>`:""}<img class="pl" src="${p.logo}" alt="" loading="lazy"></div><div class="in"><b>${esc(c.name)}</b>${c.alias?`<small>الملقب: ${esc(c.alias)}</small>`:""}<small class="job">${esc(c.job||"المهنة غير مذكورة")}</small>${showParty?`<span class="badge">${esc(p.abbreviation)}</span>`:""}</div></a>`}
function listCard(l){const p=party(l.partyId);return `<article class="card lcard"><div class="top"><img class="plogo" src="${p.logo}" alt="شعار ${esc(p.nameAr)}"><div><h2>${esc(p.nameAr)}</h2><p class="muted">رقم القائمة: <b>${esc(l.printedNumberText)}</b> · المترشحون: <b>${count(l.id)}</b></p></div></div><a class="btn" href="#/lists/${l.id}">عرض القائمة</a></article>`}
const empty=(m,extra)=>`<div class="card empty"><p>${m}</p>${extra||""}</div>`;

const pages={
home(){
 const q=D.candidates.length;
 return `<section class="hero"><div class="wrap"><h1>دليل انتخابات بلدية <em>زغاية</em> 2026</h1><p>معاً من أجل بلدية أفضل… بمشاركة واعية ومسؤولة</p><span class="tag">كل المعلومات في مكان واحد</span>
 <form class="search" role="search" id="hs"><input id="hq" type="search" placeholder="ابحث عن مترشح أو مهنة…" aria-label="بحث"><button>بحث</button></form></div></section>
 <section class="stats wrap"><ul><li><b>${esc(fmt(date))}</b><span>موعد الانتخابات</span></li><li><b>${nf(D.lists.length)}</b><span>قوائم انتخابية</span></li><li><b>${nf(q)}</b><span>مترشحاً مسجلاً</span></li><li><b>${nf(D.sources.filter(s=>s.file).length)}</b><span>صور قوائم مصدرية</span></li></ul></section>
 <div class="wrap"><div class="tiles"><a class="tile" href="#/lists"><span class="ic">🗳</span><b>القوائم الانتخابية</b><small>جميع القوائم المشاركة</small></a><a class="tile t2" href="#/candidates"><span class="ic">👥</span><b>المترشحون</b><small>تعرّف على المترشحين</small></a><a class="tile t3" href="#/compare"><span class="ic">⚖</span><b>مقارنة القوائم</b><small>قارن بين القوائم</small></a><a class="tile t4" href="guide.html"><span class="ic">✔</span><b>دليل الناخب</b><small>كل ما تحتاج معرفته للتصويت</small></a></div>
 <div class="cols"><div class="card"><h2>القوائم المشاركة</h2>${D.lists.map(l=>{const p=party(l.partyId);return `<a href="#/lists/${l.id}" style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--bd);color:var(--tx)"><img class="plogo" style="width:48px;height:48px" src="${p.logo}" alt=""><b style="flex:1">${esc(p.nameAr)}</b><span class="badge">${count(l.id)} مترشحاً</span></a>`}).join("")}</div>
 <div class="card"><h2>حول هذه المنصة</h2><p>منصة مستقلة ومحايدة، تهدف إلى توفير معلومات واضحة عن انتخابات المجلس الشعبي البلدي لبلدية زغاية.</p><p class="badge rev" style="margin-top:12px;border-radius:12px;padding:8px 14px">هذه المنصة غير رسمية ولا تتبع لأي جهة سياسية أو إدارية.</p>
 <div class="about" style="margin-top:14px"><div><b>زغاية، ولاية ميلة</b></div></div></div></div></div>`},
lists(){return head("القوائم الانتخابية","القوائم المشاركة في انتخابات بلدية زغاية.")+`<div class="wrap"><div class="grid lists">${D.lists.map(listCard).join("")}</div></div>`},
list(id){const l=list(id);if(!l)return pages.nf();const p=party(l.partyId),cs=sorted(D.candidates.filter(c=>c.listId===id));
 return head("قائمة "+p.nameAr,null,["#/lists","القوائم"])+`<div class="wrap"><div class="card lcard" style="margin-bottom:18px"><div class="top"><img class="plogo" src="${p.logo}" alt=""><p>رقم القائمة: <b>${esc(l.printedNumberText)}</b><br>عدد المترشحين: <b>${cs.length}</b></p></div>${l.notes?`<p class="badge rev" style="border-radius:12px;padding:8px 14px;line-height:1.7">${esc(l.notes)}</p>`:""}</div>
 <div class="two"><div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr));padding:0">${cs.map(c=>candCard(c)).join("")}</div></div><div class="card"><h2>صورة القائمة الأصلية</h2><a href="${l.sourceImage}" target="_blank" rel="noopener"><img class="srcimg" loading="lazy" src="${l.sourceImage}" alt="صورة قائمة ${esc(p.nameAr)}"></a>${l.posterImage?`<h2 style="margin-top:16px">ملصق إضافي</h2><img class="srcimg" loading="lazy" src="${l.posterImage}" alt="ملصق مترشح">`:""}</div></div></div>`},
candidates(q){q=q||{};return head("المترشحون",`${D.candidates.length} مترشحاً في ${D.lists.length} قوائم.`)+`<div class="wrap"><form class="card filters" onsubmit="return false"><div><label for="q">بحث بالاسم أو المهنة</label><input id="q" type="search" value="${esc(q.q||"")}" placeholder="اكتب هنا…"></div><div><label for="p">القائمة</label><select id="p"><option value="">الكل</option>${D.parties.map(p=>`<option value="${p.id}"${q.party===p.id?" selected":""}>${esc(p.nameAr)}</option>`).join("")}</select></div><button class="btn ghost" id="rs" type="button">إعادة ضبط</button></form><p id="cnt" role="status" aria-live="polite" style="font-weight:700;margin-bottom:10px"></p><div class="grid" id="cg"></div></div>`},
candidate(id){const c=D.candidates.find(x=>x.id===id);if(!c)return pages.nf();const p=party(c.partyId),l=list(c.listId);
 return head(c.name,null,[l?`#/lists/${l.id}`:"#/candidates","رجوع"])+`<div class="wrap two"><div class="card det"><div class="cand big" style="--pc:${PC[c.partyId]}"><div class="pic">${c.photo?`<img src="${c.photo}" alt="${esc(c.name)}">`:SIL}</div></div><dl>${c.alias?`<div><dt>الملقب</dt><dd>${esc(c.alias)}</dd></div>`:""}<div><dt>الترتيب في القائمة</dt><dd>${c.rank??"غير مطبوع في الصورة"}</dd></div><div><dt>المهنة</dt><dd>${esc(c.job||"غير مذكورة")}</dd></div><div><dt>القائمة</dt><dd><a href="#/lists/${l.id}">${esc(p.nameAr)} (${esc(l.printedNumberText)})</a></dd></div>${c.note?`<div><dt>ملاحظة</dt><dd>${esc(c.note)}</dd></div>`:""}</dl></div><div class="card"><h2>المصدر</h2><a href="${c.src}" target="_blank" rel="noopener"><img class="srcimg" loading="lazy" src="${c.src}" alt="المصدر"></a></div></div>`},
programs(){return head("البرامج الانتخابية","برامج وتعهدات القوائم المشاركة.")+`<div class="wrap">${empty("لم تُضف البرامج الانتخابية بعد. سنعرضها هنا فور الحصول على وثائق موثوقة من القوائم.")}</div>`},
news(){return head("الأخبار")+`<div class="wrap">${empty("لا توجد أخبار منشورة حالياً.")}</div>`},
compare(){const mx=Math.max(...D.lists.map(l=>count(l.id)));
 return head("مقارنة القوائم","مقارنة بيانات القوائم كما وردت في صورها. أما مقارنة البرامج فتتاح عند نشرها.")+`<div class="wrap"><div class="card tw"><table><thead><tr><th>القائمة</th><th>الرقم</th><th>المترشحون</th><th></th><th>صورهم</th></tr></thead><tbody>${D.lists.map(l=>{const cs=D.candidates.filter(c=>c.listId===l.id),p=party(l.partyId);return `<tr><td><a href="#/lists/${l.id}"><b>${esc(p.nameAr)}</b></a></td><td>${esc(l.printedNumberText)}</td><td>${cs.length}</td><td><div class="bar"><i style="width:${cs.length/mx*100}%"></i></div></td><td>${cs.filter(c=>c.photo).length}/${cs.length}</td></tr>`}).join("")}</tbody></table></div><p class="muted" style="margin:12px 0 36px">لا تتوفر بيانات رسمية عن النساء أو الشباب أو المستوى التعليمي، فلا نعرضها حتى لا ننشر أرقاماً غير مؤكدة.</p></div>`},
about(){return head("حول المنصة")+`<div class="wrap"><div class="card" style="margin-bottom:36px"><p>${esc(D.site.disclaimer)}</p></div><div class="card" style="margin-bottom:36px"><h2>تواصل معنا</h2><p>للتبليغ عن خطأ أو للاقتراح: <a href="mailto:dalilzeghaia@gmail.com">dalilzeghaia@gmail.com</a></p></div></div>`},
rallies(q){q=q||{};const rs=D.rallies.filter(r=>!q.party||r.partyId===q.party),tot=D.rallies.reduce((a,r)=>a+r.photos.filter(f=>f.type!=="video").length,0),vt=D.rallies.reduce((a,r)=>a+r.photos.filter(f=>f.type==="video").length,0);
 return head("صور التجمعات",`${nf(tot)} صورة${vt?` و${nf(vt)} ${vt>1?"مقاطع فيديو":"فيديو"}`:""} من تجمعات الأحزاب، تُعرض بالترتيب نفسه وبالأسلوب نفسه لكل قائمة.`)+`<div class="wrap"><div class="chips"><a class="chip${q.party?"":" on"}" href="#/rallies">الكل</a>${D.parties.map(p=>`<a class="chip${q.party===p.id?" on":""}" href="#/rallies?party=${p.id}">${esc(p.nameAr)}</a>`).join("")}</div>`+
 D.parties.filter(p=>!q.party||p.id===q.party).map(p=>{const r=rs.find(x=>x.partyId===p.id);return `<section class="rsec"><h2><img class="plogo" style="width:40px;height:40px" src="${p.logo}" alt="">${esc(p.nameAr)}${r?` <span class="badge">${cnt(r)}</span>`:""}</h2>${r?`<div class="rgrid">${r.photos.map((f,i)=>`<button type="button" class="rph${f.type==="video"?" vid":""}" data-p="${p.id}" data-i="${i}" aria-label="${f.type==="video"?"تشغيل فيديو":"تكبير صورة "+(i+1)} من تجمع ${esc(p.nameAr)}"><img loading="lazy" width="${f.w}" height="${f.h}" src="${f.type==="video"?f.poster:f.src}" alt="${f.type==="video"?"فيديو":"صورة"} من تجمع ${esc(p.nameAr)}">${f.type==="video"?`<span class="play" aria-hidden="true">▶</span>`:""}</button>`).join("")}</div>`:empty("لم تصلنا صور تجمعات لهذه القائمة بعد.")}</section>`}).join("")+`<p class="muted" style="margin:6px 0 36px">الصور مرفقة من المسؤول عن الموقع، ولا تتوفر عنها تواريخ أو أماكن موثقة، فلا نكتب لها تعليقات. عرضها لا يعني تأييداً لأي قائمة.</p></div>`},
nf(){return head("الصفحة غير موجودة")+`<div class="wrap">${empty("لم نجد الصفحة المطلوبة.",`<p><a class="btn" href="#/">العودة للرئيسية</a></p>`)}</div>`}
};

function bindCandidates(init){const q=$("#q"),p=$("#p"),g=$("#cg"),n=$("#cnt");
 const run=()=>{const k=norm(q.value).split(" ").filter(Boolean);
  const r=sorted(D.candidates).filter(c=>(!p.value||c.partyId===p.value)&&k.every(w=>norm([c.name,c.alias,c.job].join(" ")).includes(w)));
  n.textContent=`${r.length} نتيجة`;g.innerHTML=r.length?r.map(c=>candCard(c,true)).join(""):empty("لا توجد نتائج مطابقة.");
  history.replaceState(null,"","#/candidates"+(q.value||p.value?`?q=${encodeURIComponent(q.value)}&party=${p.value}`:""))};
 q.oninput=p.onchange=run;$("#rs").onclick=()=>{q.value="";p.value="";run()};run()}

function cnt(r){const v=r.photos.filter(f=>f.type==="video").length,p=r.photos.length-v;return nf(p)+" صورة"+(v?` و${nf(v)} ${v>1?"مقاطع فيديو":"فيديو"}`:"")}
function bindRallies(){document.querySelectorAll(".rph").forEach(b=>b.onclick=()=>openLb(b.dataset.p,+b.dataset.i))}
function openLb(pid,i){const r=D.rallies.find(x=>x.partyId===pid),n=r.photos.length,pa=party(pid);let o=$("#lb");if(o)o.remove();const prev=document.activeElement;
 o=document.createElement("div");o.id="lb";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");o.setAttribute("aria-label","عارض الصور");
 o.innerHTML=`<button class="x" aria-label="إغلاق">✕</button><button class="nv nx" aria-label="التالية">›</button><img alt=""><video controls playsinline preload="metadata" hidden></video><button class="nv pv" aria-label="السابقة">‹</button><p></p>`;document.body.appendChild(o);
 const im=o.querySelector("img"),vd=o.querySelector("video"),pp=o.querySelector("p"),show=()=>{const f=r.photos[i];vd.pause();if(f.type==="video"){im.hidden=true;im.removeAttribute("src");vd.hidden=false;vd.poster=f.poster||"";vd.src=f.src}else{vd.hidden=true;vd.removeAttribute("src");vd.load();im.hidden=false;im.src=f.src;im.alt="صورة من تجمع "+pa.nameAr}pp.textContent=`${pa.nameAr} · ${nf(i+1)} / ${nf(n)}`};
 const go=d=>{i=(i+d+n)%n;show()},close=()=>{vd.pause();o.remove();document.removeEventListener("keydown",kd);prev&&prev.focus&&prev.focus()};
 const kd=e=>{if(e.key==="Escape")close();else if(e.key==="ArrowLeft")go(1);else if(e.key==="ArrowRight")go(-1)};
 o.querySelector(".x").onclick=close;o.querySelector(".nx").onclick=()=>go(1);o.querySelector(".pv").onclick=()=>go(-1);o.onclick=e=>{if(e.target===o)close()};
 document.addEventListener("keydown",kd);show();o.querySelector(".x").focus()}

function route(){
 const h=location.hash.slice(1)||"/",[path,qs]=h.split("?"),q=Object.fromEntries(new URLSearchParams(qs||"")),s=path.split("/").filter(Boolean);
 let html;
 if(!s.length)html=pages.home();else if(s[0]==="lists")html=s[1]?pages.list(s[1]):pages.lists();
 else if(s[0]==="candidates")html=s[1]?pages.candidate(s[1]):pages.candidates(q);
 else if(s[0]==="rallies")html=pages.rallies(q);
 else html=(pages[s[0]]&&!["nf","list","candidate"].includes(s[0]))?pages[s[0]]():pages.nf();
 app.innerHTML=html;
 document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#/"+(s[0]||"")));
 $("#nav").classList.remove("open");$(".burger").setAttribute("aria-expanded","false");
 if(s[0]==="candidates"&&!s[1])bindCandidates(q);
 if(s[0]==="rallies")bindRallies();
 const hs=$("#hs");if(hs)hs.onsubmit=e=>{e.preventDefault();location.hash="#/candidates?q="+encodeURIComponent($("#hq").value)};
 window.scrollTo(0,0);
 document.title=(s[0]?"":"")+"دليل انتخابات بلدية زغاية 2026"}
addEventListener("hashchange",route);

$(".burger").onclick=e=>{const o=$("#nav").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
$("#today").textContent=fmt(new Date());
const days=Math.ceil((date-new Date(new Date().toDateString()))/864e5);
$("#countdown").textContent=days>1?`الانتخابات بعد ${nf(days)} يوماً · ${fmt(date)}`:days===1?"الانتخابات غداً":days===0?"الانتخابات اليوم":"انتهى موعد الانتخابات";
route();
})();
