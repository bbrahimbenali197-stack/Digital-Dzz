/* DIGITAL DZ - Static access gate. This is an access barrier, not server-side authentication. */
(function(){
  'use strict';
  const ACCESS_KEY = 'DIGITAL-DZ-2026';
  const STORAGE_KEY = 'digitaldz_access_granted_v1';
  if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
  const gate = document.createElement('div');
  gate.id = 'digitaldz-security-gate';
  gate.innerHTML = `
    <div class="ddz-card">
      <div class="ddz-logo">DIGITAL <span>DZ</span></div>
      <div class="ddz-lock">🔐</div>
      <h1>Site sécurisé</h1>
      <p>Entrez votre clé d'accès pour continuer vers DIGITAL DZ.</p>
      <form id="ddz-access-form" autocomplete="off">
        <input id="ddz-access-key" type="password" placeholder="Clé de sécurité" aria-label="Clé de sécurité" autocomplete="off" spellcheck="false">
        <button type="submit">DÉVERROUILLER</button>
        <div id="ddz-access-error" class="ddz-error" aria-live="polite"></div>
      </form>
    </div>`;
  document.documentElement.style.overflow='hidden';
  document.addEventListener('DOMContentLoaded', function(){
    document.body.appendChild(gate);
    const form=document.getElementById('ddz-access-form');
    const input=document.getElementById('ddz-access-key');
    const error=document.getElementById('ddz-access-error');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(input.value === ACCESS_KEY){
        sessionStorage.setItem(STORAGE_KEY,'1');
        gate.remove();
        document.documentElement.style.overflow='';
      } else {
        error.textContent='Clé incorrecte. Veuillez réessayer.';
        input.value=''; input.focus();
      }
    });
    input.focus();
  });
})();
