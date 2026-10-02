(function(){
  const specs=[
    {id:'excel',icon:'📊',title:'Excel — De zéro à avancé',description:'Apprends Excel pour organiser, calculer, analyser et présenter tes données.',category:'Bureautique',level:'Débutant → Avancé',topics:['interface et cellules','formules et références','fonctions essentielles','tri, filtres et tableaux','graphiques et analyse','projet pratique de tableau de bord']},
    {id:'word',icon:'📝',title:'Word — Documents professionnels',description:'Crée des documents propres, structurés et professionnels avec Microsoft Word.',category:'Bureautique',level:'Débutant → Avancé',topics:['interface et mise en forme','styles et titres','tableaux et images','en-têtes, pieds de page et pagination','sommaire et documents longs','projet CV et rapport professionnel']},
    {id:'powerpoint',icon:'📽️',title:'PowerPoint — Présentations impactantes',description:'Construis des présentations claires, modernes et convaincantes.',category:'Bureautique',level:'Débutant → Avancé',topics:['création et mise en page','design et thèmes','images, formes et icônes','animations et transitions','présentation orale et storytelling','projet présentation complète']}
  ];
  const modes=[
    ['Comprendre les bases','Découvre les fonctions essentielles et apprends le vocabulaire de l’outil.','Commence par reproduire l’exemple présenté, puis refais-le sans regarder.'],
    ['Méthode pas à pas','Suis une méthode simple pour réaliser la tâche sans te perdre dans les menus.','Réalise la tâche en autonomie puis compare ton résultat avec ton objectif.'],
    ['Fonctions utiles','Apprends les fonctions et raccourcis qui font gagner du temps au quotidien.','Teste au moins trois fonctions et écris dans tes notes quand les utiliser.'],
    ['Cas pratique','Applique la notion sur un cas proche d’un vrai travail scolaire ou professionnel.','Crée un mini-document ou tableau et améliore-le après une première version.'],
    ['Défi','Mets tes compétences à l’épreuve avec une consigne chronométrée.','Réalise le défi en 30 minutes sans suivre de tutoriel.']
  ];
  specs.forEach(s=>{
    if(DZ_DATA.courses.some(c=>c.id===s.id)) return;
    const modules=s.topics.map((topic,mi)=>({id:s.id+'-m'+(mi+1),title:topic,lessons:modes.map((m,li)=>({id:s.id+'-'+(mi+1)+'-'+(li+1),title:m[0]+' — '+topic, duration:(15+li*5)+' min', body:`<h2>${topic}</h2><p>Cette leçon fait partie de la formation <strong>${s.title}</strong>. L’objectif est de maîtriser <strong>${topic}</strong> avec une méthode progressive et pratique.</p><h3>📌 Ce que tu vas apprendre</h3><ul><li>Identifier les commandes importantes et comprendre leur rôle.</li><li>Reproduire une manipulation simple puis la refaire seul.</li><li>Éviter les erreurs fréquentes et vérifier ton résultat.</li></ul><h3>🧪 Exemple pratique</h3><p>Ouvre ${s.id==='excel'?'Excel':s.id==='word'?'Word':'PowerPoint'} et crée un petit fichier consacré à ton projet personnel. Applique immédiatement la notion de cette leçon.</p><h3>🎯 À retenir</h3><p>Ne cherche pas à mémoriser tous les menus. Apprends une fonction, utilise-la plusieurs fois et associe-la à un besoin concret.</p><div class="tip"><b>💡 Astuce DIGITAL DZ :</b> garde tes exercices dans un dossier « DIGITAL DZ — ${s.title} » pour voir tes progrès.</div>`,task:m[2]}))}));
    DZ_DATA.courses.push({id:s.id,icon:s.icon,title:s.title,description:s.description,category:s.category,level:s.level,modules});
  });
})();
