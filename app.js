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
