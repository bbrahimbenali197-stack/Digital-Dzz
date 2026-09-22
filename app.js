const key='digitaldz_progress';
function progress(){return Number(localStorage.getItem(key)||35)}
function setProgress(v){v=Math.max(0,Math.min(100,v));localStorage.setItem(key,v);document.querySelectorAll('[data-progress]').forEach(e=>e.style.width=v+'%');document.querySelectorAll('[data-progress-text]').forEach(e=>e.textContent=v+'%')}
document.addEventListener('DOMContentLoaded',()=>{setProgress(progress());document.querySelectorAll('[data-lesson]').forEach(c=>c.addEventListener('click',()=>{setProgress(progress()+10)}));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear())});
function filterCourses(){const q=(document.getElementById('courseSearch')?.value||'').toLowerCase();document.querySelectorAll('[data-course]').forEach(c=>c.classList.toggle('hidden',!c.textContent.toLowerCase().includes(q)))}
