const STORE='digitaldz_v8';
function state(){try{return JSON.parse(localStorage.getItem(STORE))||{done:[],fav:[],notes:{},challenge:[],theme:'dark'}}catch(e){return {done:[],fav:[],notes:{},challenge:[],theme:'dark'}}}
function save(s){localStorage.setItem(STORE,JSON.stringify(s))}
function allLessons(){return (window.DZ_DATA?.courses||[]).flatMap(c=>c.modules.flatMap(m=>m.lessons))}
function isDone(id){return state().done.includes(id)}
function toggleDone(id){let s=state();s.done=s.done.includes(id)?s.done.filter(x=>x!==id):[...s.done,id];save(s);toast(s.done.includes(id)?'✅ Leçon terminée — +25 XP':'↩️ Leçon remise à faire');updateUI();}
function toggleFav(id){let s=state();s.fav=s.fav.includes(id)?s.fav.filter(x=>x!==id):[...s.fav,id];save(s);toast(s.fav.includes(id)?'⭐ Ajouté aux favoris':'☆ Retiré des favoris');updateUI()}
function courseById(id){return (window.DZ_DATA?.courses||[]).find(c=>c.id===id)}
function courseProgress(id){let c=courseById(id);if(!c)return 0;let l=c.modules.flatMap(m=>m.lessons);return l.length?Math.round(l.filter(x=>isDone(x.id)).length/l.length*100):0}
function progressTotal(){let n=allLessons().length;return n?Math.min(100,Math.round(state().done.length/n*100)):0}
function xp(){return state().done.length*25 + state().fav.length*5 + (state().challenge||[]).length*40}
function level(){return Math.max(1,Math.floor(xp()/250)+1)}
function levelProgress(){return (xp()%250)/2.5}
function getBadges(){let s=state(),d=s.done.length;return [
 ['🚀','Premier pas',d>=1,'Termine ta première leçon'],['🔥','Régulier',d>=10,'Termine 10 leçons'],['⚡','Machine à apprendre',d>=25,'Termine 25 leçons'],['🏆','Maître du cours',d>=50,'Termine 50 leçons'],['⭐','Collectionneur',s.fav.length>=5,'Ajoute 5 favoris'],['🛡️','Cyber explorer',s.done.some(x=>String(x).startsWith('security-')),'Commence la cybersécurité'],['📊','Data analyst',s.done.some(x=>String(x).startsWith('data-')),'Commence l’analyse des données']];}
function updateUI(){document.querySelectorAll('[data-progress-course]').forEach(e=>e.style.width=courseProgress(e.dataset.progressCourse)+'%');document.querySelectorAll('[data-progress-text]').forEach(e=>e.textContent=courseProgress(e.dataset.progressText)+'%');document.querySelectorAll('[data-done]').forEach(e=>e.classList.toggle('done',isDone(e.dataset.done)));document.querySelectorAll('[data-fav]').forEach(e=>e.textContent=state().fav.includes(e.dataset.fav)?'★':'☆');document.querySelectorAll('[data-xp]').forEach(e=>e.textContent=xp());document.querySelectorAll('[data-level]').forEach(e=>e.textContent=level());document.querySelectorAll('[data-level-progress]').forEach(e=>e.style.width=levelProgress()+'%');}
function qs(name){return new URLSearchParams(location.search).get(name)}
function toast(msg){let x=document.createElement('div');x.className='toast';x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
function year(){document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear())}
function injectDock(){if(document.querySelector('.quick-dock'))return;let d=document.createElement('div');d.className='quick-dock';d.innerHTML='<a href="espace-etudiant.html" title="Mon espace">🎓</a><a href="assistant-ia.html" title="Assistant IA">🤖</a><a href="laboratoire.html" title="Laboratoire">🧪</a><a href="formations.html" title="Formations">📚</a>';document.body.appendChild(d)}
function injectSearchShortcut(){document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();location.href='formations.html#search'}})}
document.addEventListener('DOMContentLoaded',()=>{year();updateUI();injectDock();injectSearchShortcut();});

// Recherche globale DIGITAL DZ — sans base de données
const DZ_SEARCH_PAGES=[
 {title:'Accueil',url:'index.html',type:'Page',text:'académie digitale apprendre pratiquer construire'},
 {title:'Formations',url:'formations.html',type:'Formations',text:'40 formations cours apprentissage'},
 {title:'Parcours guidés',url:'parcours.html',type:'Parcours',text:'freelance web créativité parcours'},
 {title:'Apprendre',url:'apprendre.html',type:'Page',text:'méthode apprendre pratiquer construire'},
 {title:'Projets',url:'projets.html',type:'Page',text:'projets portfolio pratique'},
 {title:'Ressources',url:'ressources.html',type:'Ressources',text:'pdf vidéos outils ressources'},
 {title:'Annonces',url:'annonces.html',type:'Actualités',text:'annonces nouveautés informations'},
 {title:'Communauté',url:'community.html',type:'Communauté',text:'communauté discussions contact'},
 {title:'Guide général',url:'guide-utilisation.html',type:'Guide',text:'guide utilisation aide'},
 {title:'Outils',url:'outils.html',type:'Outils',text:'outils digitaux'},
 {title:'Laboratoire',url:'laboratoire.html',type:'Lab',text:'html css javascript code défis'},
 {title:'Assistant IA',url:'assistant-ia.html',type:'IA',text:'intelligence artificielle assistant'},
 {title:'Mon espace',url:'espace-etudiant.html',type:'Étudiant',text:'progression favoris notes'},
 {title:'FAQ',url:'faq.html',type:'Aide',text:'questions réponses aide'}
];
function buildSearchIndex(){
 const out=[...DZ_SEARCH_PAGES];
 (window.DZ_DATA?.courses||[]).forEach(c=>{
   const courseText=[c.title,c.description,c.category,c.level].filter(Boolean).join(' ');
   out.push({title:c.title,url:'formation.html?id='+encodeURIComponent(c.id),type:'Formation',text:courseText});
   (c.modules||[]).forEach(m=> (m.lessons||[]).forEach(l=>out.push({title:l.title,url:'lesson.html?course='+encodeURIComponent(c.id)+'&lesson='+encodeURIComponent(l.id),type:'Leçon • '+c.title,text:[l.title,l.description,m.title,c.title].filter(Boolean).join(' ')})));
 });
 return out;
}
function initGlobalSearch(){
 const input=document.getElementById('siteSearch'); if(!input)return;
 const btn=document.getElementById('searchBtn'), results=document.getElementById('searchResults'), meta=document.getElementById('searchMeta');
 const index=buildSearchIndex();
 const run=()=>{
   const q=input.value.trim().toLowerCase();
   if(!q){meta.textContent='';results.innerHTML='<div class="search-empty">🔎 Commence par écrire un mot-clé ci-dessus.</div>';return;}
   const terms=q.split(/\s+/).filter(Boolean);
   const found=index.map(item=>{const hay=(item.title+' '+item.text+' '+item.type).toLowerCase();let score=0;terms.forEach(t=>{if(hay.includes(t))score+=hay.includes(item.title.toLowerCase())?3:1});return {...item,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,50);
   meta.textContent=found.length+' résultat'+(found.length>1?'s':'')+' pour « '+input.value+' »';
   results.innerHTML=found.length?found.map(x=>`<a class="card search-result" href="${x.url}"><small>${x.type}</small><h3>${x.title}</h3><p>${(x.text||'').slice(0,180)}</p></a>`).join(''):'<div class="search-empty">😕 Aucun résultat. Essaie un autre mot-clé.</div>';
 };
 btn.addEventListener('click',run); input.addEventListener('keydown',e=>{if(e.key==='Enter')run()}); input.addEventListener('input',()=>{if(!input.value.trim())run()}); run();
}
function injectGlobalSearchLink(){
 const nav=document.querySelector('.navlinks'); if(!nav||nav.querySelector('[data-global-search]'))return;
 const a=document.createElement('a');a.href='search.html';a.dataset.globalSearch='1';a.textContent='🔎 Recherche';nav.appendChild(a);
}
function injectSearchShortcut(){document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();location.href='search.html'}})}
document.addEventListener('DOMContentLoaded',()=>{injectGlobalSearchLink();initGlobalSearch();});
