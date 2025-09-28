
// ÉTAPE 2 : Variables et premiers scripts JavaScript


// Message de bienvenue
console.log('🎯 Application de Gestion de Tâches - JavaScript chargé avec succès !');

// Déclaration des variables principales
let taches = []; // Liste des tâches (sera améliorée dans les prochaines étapes)
let compteurId = 1; // Compteur pour générer des IDs uniques

// Variables pour les éléments DOM (seront initialisées plus tard)
let taskInput;
let addBtn;
let taskList;
let totalTasksSpan;
let completedTasksSpan;
let pendingTasksSpan;

console.log('📝 Variables initialisées :', {
    'Nombre de tâches': taches.length,
    'Compteur ID': compteurId
});
// ÉTAPE 3 : Manipulation du DOM
// Fonction d'initialisation du DOM
function initialiserDOM() {
    // Récupération des éléments HTML
    taskInput = document.getElementById('taskInput');
    addBtn = document.getElementById('addBtn');
    taskList = document.getElementById('taskList');
    totalTasksSpan = document.getElementById('totalTasks');
    completedTasksSpan = document.getElementById('completedTasks');
    pendingTasksSpan = document.getElementById('pendingTasks');

    console.log('🔗 Éléments DOM récupérés avec succès');
    
    // Affichage initial de la liste vide
    afficherTaches();
}

// Fonction simple pour afficher les tâches 
function afficherTaches() {
    // Vider la liste existante
    taskList.innerHTML = '';
    
    if (taches.length === 0) {
        // Afficher un message si aucune tâche
        taskList.innerHTML = '<li class="empty-state">Aucune tâche pour le moment.<br>Ajoutez votre première tâche !</li>';
    } else {
        // Afficher chaque tâche avec ses boutons d'action
        taches.forEach((tache, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-text" id="task-${index}">${tache}</span>
                <div class="task-actions">
                    <button class="btn btn-complete" onclick="terminerTache(${index})">Terminer</button>
                    <button class="btn btn-delete" onclick="supprimerTache(${index})">Supprimer</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    // Mettre à jour les statistiques
    mettreAJourStats();
}

// Fonction pour mettre à jour les statistiques
function mettreAJourStats() {
    totalTasksSpan.textContent = `Total: ${taches.length}`;
    completedTasksSpan.textContent = `Terminées: 0`; // Pour l'instant, aucune tâche terminée
    pendingTasksSpan.textContent = `En cours: ${taches.length}`;
}

// Fonction simple pour ajouter une tâche (version basique)
function ajouterTacheSimple() {
    const texte = taskInput.value.trim();
    
    if (texte === '') {
        alert('Veuillez saisir une tâche !');
        return;
    }
    
    // Ajouter la tâche au tableau
    taches.push(texte);
    
    // Vider le champ de saisie
    taskInput.value = '';
    
    // Réafficher la liste
    afficherTaches();
    
    console.log('✅ Tâche ajoutée :', texte);
    console.log('📋 Liste actuelle :', taches);
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM chargé, initialisation complète...');
    
    // Initialiser tous les éléments DOM
    initialiserDOMComplet();
    
    // Ajouter tous les écouteurs d'événements
    ajouterTousLesEcouteurs();
    
    // Charger les tâches sauvegardées
    tachesObjets = chargerTaches();
    
    // Si aucune tâche sauvegardée, migrer les anciennes si elles existent
    if (tachesObjets.length === 0) {
        migrerVersObjets();
        if (tachesObjets.length > 0) {
            sauvegarderTaches(); // Sauvegarder la migration
        }
    }
    
    // Afficher les tâches
    afficherTachesFiltrees();
    
    // Afficher les informations du localStorage dans la console
    const infosStorage = obtenirInfosStorage();
    console.log('📊 Informations localStorage :', infosStorage);
    
    // Générer le rapport complet
    obtenirRapportComplet();
    
    console.log('✅ Application de gestion de tâches entièrement initialisée !');
    console.log('🎯 Fonctionnalités disponibles : Ajout, Suppression, Marquage terminé, Recherche, Suppression groupée, Persistance localStorage');
});

// ÉTAPE 4 : Gestion des événements
function ajouterEcouteursEvenements() {
    // Écouteur pour le bouton "Ajouter" - utilise maintenant le système avec sauvegarde
    addBtn.addEventListener('click', ajouterTacheAvecSauvegarde);
    
    // Écouteur pour la touche Entrée dans le champ de saisie
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            ajouterTacheAvecSauvegarde();
        }
    });
    
    // Optionnel : empêcher l'envoi du formulaire si l'input était dans un form
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    
    console.log('👂 Écouteurs d\'événements ajoutés (système avec localStorage)');
}
// ÉTAPE 5 : Boutons Supprimer et Terminer
// Fonction pour supprimer une tâche
function supprimerTache(index) {
    const tacheSupprimer = taches[index];
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${tacheSupprimer}" ?`)) {
        taches.splice(index, 1);
        afficherTaches();
        console.log('🗑️ Tâche supprimée :', tacheSupprimer);
        console.log('📋 Liste actuelle :', taches);
    }
}

// Fonction pour marquer une tâche comme terminée (basique - juste barrer le texte)
function terminerTache(index) {
    const taskText = document.getElementById(`task-${index}`);
    
    if (taskText.classList.contains('completed')) {
        // Démarquer comme terminée
        taskText.classList.remove('completed');
        console.log('↩️ Tâche repassée en cours :', taches[index]);
    } else {
        // Marquer comme terminée
        taskText.classList.add('completed');
        console.log('✅ Tâche terminée :', taches[index]);
    }
    
    // Pour l'instant, on ne change pas les statistiques car on n'a pas encore d'objets
}
// ÉTAPE 6 : Fonctions dédiées et refactorisation
// Fonction dédiée pour ajouter une tâche (amélioration de ajouterTacheSimple)
function ajouterTache() {
    const texte = obtenirTexteSaisi();
    
    if (!validerTexteTache(texte)) {
        return;
    }
    
    // Ajouter la tâche au tableau
    taches.push(texte);
    
    // Vider le champ de saisie
    viderChampSaisie();
    
    // Réafficher la liste
    afficherTaches();
    
    console.log('✅ Tâche ajoutée :', texte);
    console.log('📋 Liste actuelle :', taches);
}

// Fonction pour obtenir le texte saisi
function obtenirTexteSaisi() {
    return taskInput.value.trim();
}

// Fonction pour valider le texte d'une tâche
function validerTexteTache(texte) {
    if (texte === '') {
        alert('Veuillez saisir une tâche !');
        return false;
    }
    
    if (texte.length > 200) {
        alert('La tâche ne peut pas dépasser 200 caractères !');
        return false;
    }
    
    return true;
}

// Fonction pour vider le champ de saisie
function viderChampSaisie() {
    taskInput.value = '';
    taskInput.focus(); // Remettre le focus pour faciliter la saisie continue
}

// Fonction dédiée pour supprimer une tâche (amélioration)
function supprimerTache(index) {
    if (!validerIndex(index)) {
        return;
    }
    
    const tacheSupprimer = taches[index];
    
    if (confirmerSuppression(tacheSupprimer)) {
        executerSuppression(index, tacheSupprimer);
    }
}

// Fonction pour valider un index
function validerIndex(index) {
    return index >= 0 && index < taches.length;
}

// Fonction pour confirmer la suppression
function confirmerSuppression(tache) {
    return confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${tache}" ?`);
}

// Fonction pour exécuter la suppression
function executerSuppression(index, tache) {
    taches.splice(index, 1);
    afficherTaches();
    console.log('🗑️ Tâche supprimée :', tache);
    console.log('📋 Liste actuelle :', taches);
}

// Fonction dédiée pour terminer/démarquer une tâche (amélioration)
function terminerTache(index) {
    if (!validerIndex(index)) {
        return;
    }
    
    const taskText = document.getElementById(`task-${index}`);
    
    if (!taskText) {
        console.error('Élément de tâche introuvable');
        return;
    }
    
    basculerEtatTache(taskText, index);
}

// Fonction pour basculer l'état d'une tâche (terminée/en cours)
function basculerEtatTache(element, index) {
    if (element.classList.contains('completed')) {
        // Démarquer comme terminée
        element.classList.remove('completed');
        console.log('↩️ Tâche repassée en cours :', taches[index]);
    } else {
        // Marquer comme terminée
        element.classList.add('completed');
        console.log('✅ Tâche terminée :', taches[index]);
    }
    
    // Mettre à jour les statistiques après changement d'état
    mettreAJourStats();
}


// ÉTAPE 7 : Tableaux et boucles avancées

// Fonction pour filtrer les tâches selon leur état
function filtrerTaches() {
    const tachesCompletes = [];
    const tachesEnCours = [];
    
    // Parcourir le tableau avec une boucle for...of
    for (let i = 0; i < taches.length; i++) {
        const taskElement = document.getElementById(`task-${i}`);
        if (taskElement && taskElement.classList.contains('completed')) {
            tachesCompletes.push(taches[i]);
        } else {
            tachesEnCours.push(taches[i]);
        }
    }
    
    return {
        completes: tachesCompletes,
        enCours: tachesEnCours
    };
}

// Fonction pour compter les tâches par état
function compterTaches() {
    const stats = filtrerTaches();
    
    return {
        total: taches.length,
        completes: stats.completes.length,
        enCours: stats.enCours.length
    };
}

// Fonction améliorée pour mettre à jour les statistiques
function mettreAJourStats() {
    const stats = compterTaches();
    
    totalTasksSpan.textContent = `Total: ${stats.total}`;
    completedTasksSpan.textContent = `Terminées: ${stats.completes}`;
    pendingTasksSpan.textContent = `En cours: ${stats.enCours}`;
}

// Fonction pour rechercher des tâches (utilise des boucles et filtres)
function rechercherTaches(termeRecherche) {
    if (!termeRecherche.trim()) {
        return [...taches]; // Retourner une copie du tableau complet
    }
    
    const tachesTrouvees = [];
    const terme = termeRecherche.toLowerCase();
    
    // Utilisation d'une boucle for pour parcourir et filtrer
    for (let i = 0; i < taches.length; i++) {
        if (taches[i].toLowerCase().includes(terme)) {
            tachesTrouvees.push({
                texte: taches[i],
                index: i
            });
        }
    }
    
    return tachesTrouvees;
}

// Fonction pour réorganiser les tâches (exemple d'utilisation avancée des tableaux)
function reorganiserTaches() {
    const stats = filtrerTaches();
    
    // Créer un nouveau tableau avec les tâches en cours d'abord
    const tachesReorganisees = [...stats.enCours, ...stats.completes];
    
    console.log('🔄 Tâches réorganisées :', tachesReorganisees);
    return tachesReorganisees;
}

// Fonction pour obtenir des statistiques détaillées (utilise map et reduce)
function obtenirStatistiquesDetaillees() {
    // Calculer la longueur moyenne des tâches
    const longueurMoyenne = taches.length > 0 
        ? taches.reduce((sum, tache) => sum + tache.length, 0) / taches.length 
        : 0;
    
    // Trouver la tâche la plus longue et la plus courte
    let tachePlusLongue = '';
    let tachePlusCourte = '';
    
    if (taches.length > 0) {
        tachePlusLongue = taches.reduce((a, b) => a.length > b.length ? a : b);
        tachePlusCourte = taches.reduce((a, b) => a.length < b.length ? a : b);
    }
    
    return {
        longueurMoyenne: Math.round(longueurMoyenne * 100) / 100,
        tachePlusLongue,
        tachePlusCourte,
        nombreTaches: taches.length
    };
}

// ÉTAPE 8 : Introduction aux objets

// Classe/Constructeur pour représenter une tâche
function Tache(texte, id = null) {
    this.id = id || Date.now(); // ID unique basé sur timestamp
    this.texte = texte;
    this.terminee = false;
    this.dateCreation = new Date();
    this.dateModification = new Date();
}

// Méthode pour marquer une tâche comme terminée
Tache.prototype.marquerTerminee = function() {
    this.terminee = true;
    this.dateModification = new Date();
};

// Méthode pour marquer une tâche comme en cours
Tache.prototype.marquerEnCours = function() {
    this.terminee = false;
    this.dateModification = new Date();
};

// Méthode pour basculer l'état d'une tâche
Tache.prototype.basculerEtat = function() {
    if (this.terminee) {
        this.marquerEnCours();
    } else {
        this.marquerTerminee();
    }
};

// Méthode pour obtenir une représentation string de la tâche
Tache.prototype.toString = function() {
    const statut = this.terminee ? '✅' : '⏳';
    return `${statut} ${this.texte} (créée le ${this.dateCreation.toLocaleDateString()})`;
};

// Variable pour stocker les tâches sous forme d'objets
let tachesObjets = [];

// Fonction pour migrer les anciennes tâches vers des objets
function migrerVersObjets() {
    if (taches.length > 0 && tachesObjets.length === 0) {
        console.log('🔄 Migration des tâches vers des objets...');
        tachesObjets = taches.map(texte => new Tache(texte));
        console.log('✅ Migration terminée :', tachesObjets);
    }
}

// Fonction pour ajouter une tâche objet
function ajouterTacheObjet() {
    const texte = obtenirTexteSaisi();
    
    if (!validerTexteTache(texte)) {
        return;
    }
    
    // Créer un nouvel objet tâche
    const nouvelleTache = new Tache(texte);
    
    // Ajouter au tableau d'objets
    tachesObjets.push(nouvelleTache);
    
    // Vider le champ de saisie
    viderChampSaisie();
    
    // Réafficher la liste
    afficherTachesObjets();
    
    console.log('✅ Tâche objet ajoutée :', nouvelleTache);
}

// Fonction pour afficher les tâches objets
function afficherTachesObjets() {
    taskList.innerHTML = '';
    
    if (tachesObjets.length === 0) {
        taskList.innerHTML = '<li class="empty-state">Aucune tâche pour le moment.<br>Ajoutez votre première tâche !</li>';
    } else {
        tachesObjets.forEach((tache, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const textClass = tache.terminee ? 'task-text completed' : 'task-text';
            const btnText = tache.terminee ? 'Réactiver' : 'Terminer';
            const btnClass = tache.terminee ? 'btn btn-complete' : 'btn btn-complete';
            
            li.innerHTML = `
                <span class="${textClass}" id="task-${index}">
                    ${tache.texte}
                    <small style="display: block; color: #888; font-size: 12px;">
                        Créée le ${tache.dateCreation.toLocaleDateString()}
                    </small>
                </span>
                <div class="task-actions">
                    <button class="${btnClass}" onclick="basculerEtatTacheObjet(${index})">${btnText}</button>
                    <button class="btn btn-delete" onclick="supprimerTacheObjet(${index})">Supprimer</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    mettreAJourStatsObjets();
}

// Fonction pour basculer l'état d'une tâche objet
function basculerEtatTacheObjet(index) {
    if (index >= 0 && index < tachesObjets.length) {
        const tache = tachesObjets[index];
        tache.basculerEtat();
        
        console.log(tache.terminee ? '✅ Tâche terminée :' : '↩️ Tâche repassée en cours :', tache.texte);
        afficherTachesObjets();
    }
}

// Fonction pour supprimer une tâche objet
function supprimerTacheObjet(index) {
    if (index >= 0 && index < tachesObjets.length) {
        const tache = tachesObjets[index];
        
        if (confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${tache.texte}" ?`)) {
            tachesObjets.splice(index, 1);
            afficherTachesObjets();
            console.log('🗑️ Tâche objet supprimée :', tache.texte);
        }
    }
}

// Fonction pour mettre à jour les statistiques avec les objets
function mettreAJourStatsObjets() {
    const total = tachesObjets.length;
    const terminees = tachesObjets.filter(tache => tache.terminee).length;
    const enCours = total - terminees;
    
    totalTasksSpan.textContent = `Total: ${total}`;
    completedTasksSpan.textContent = `Terminées: ${terminees}`;
    pendingTasksSpan.textContent = `En cours: ${enCours}`;
}

// Fonction pour obtenir des statistiques sur les objets tâches
function obtenirStatistiquesObjets() {
    const maintenant = new Date();
    const tachesAujourdhui = tachesObjets.filter(tache => {
        const dateCreation = new Date(tache.dateCreation);
        return dateCreation.toDateString() === maintenant.toDateString();
    });
    
    return {
        total: tachesObjets.length,
        terminees: tachesObjets.filter(t => t.terminee).length,
        enCours: tachesObjets.filter(t => !t.terminee).length,
        creesAujourdhui: tachesAujourdhui.length,
        ancienneTache: tachesObjets.length > 0 ? tachesObjets[0] : null,
        nouvelleTache: tachesObjets.length > 0 ? tachesObjets[tachesObjets.length - 1] : null
    };
}
// ÉTAPE 9 : Persistance avec LocalStorage

// Clé pour le localStorage
const CLE_STORAGE = 'gestionTaches_donnees';

// Fonction pour sauvegarder les tâches dans le localStorage
function sauvegarderTaches() {
    try {
        // Convertir les objets en JSON
        const donneesAJSON = JSON.stringify(tachesObjets.map(tache => ({
            id: tache.id,
            texte: tache.texte,
            terminee: tache.terminee,
            dateCreation: tache.dateCreation.toISOString(),
            dateModification: tache.dateModification.toISOString()
        })));
        
        localStorage.setItem(CLE_STORAGE, donneesAJSON);
        console.log('💾 Tâches sauvegardées dans localStorage');
        
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde :', error);
        alert('Erreur lors de la sauvegarde des données');
    }
}

// Fonction pour charger les tâches depuis le localStorage
function chargerTaches() {
    try {
        const donneesSauvegardees = localStorage.getItem(CLE_STORAGE);
        
        if (!donneesSauvegardees) {
            console.log('📂 Aucune donnée sauvegardée trouvée');
            return [];
        }
        
        const donneesJSON = JSON.parse(donneesSauvegardees);
        
        // Recréer les objets Tache avec les bonnes dates
        const tachesChargees = donneesJSON.map(donnee => {
            const tache = new Tache(donnee.texte, donnee.id);
            tache.terminee = donnee.terminee;
            tache.dateCreation = new Date(donnee.dateCreation);
            tache.dateModification = new Date(donnee.dateModification);
            return tache;
        });
        
        console.log('📁 Tâches chargées depuis localStorage :', tachesChargees.length);
        return tachesChargees;
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement :', error);
        alert('Erreur lors du chargement des données sauvegardées');
        return [];
    }
}

// Fonction pour vider le localStorage
function viderLocalStorage() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données sauvegardées ?')) {
        localStorage.removeItem(CLE_STORAGE);
        console.log('🗑️ LocalStorage vidé');
        alert('Données sauvegardées supprimées');
    }
}

// Fonction améliorée pour ajouter une tâche avec sauvegarde automatique
function ajouterTacheAvecSauvegarde() {
    const texte = obtenirTexteSaisi();
    
    if (!validerTexteTache(texte)) {
        return;
    }
    
    // Créer un nouvel objet tâche
    const nouvelleTache = new Tache(texte);
    
    // Ajouter au tableau d'objets
    tachesObjets.push(nouvelleTache);
    
    // Sauvegarder automatiquement
    sauvegarderTaches();
    
    // Vider le champ de saisie
    viderChampSaisie();
    
    // Réafficher la liste
    afficherTachesObjets();
    
    console.log('✅ Tâche ajoutée et sauvegardée :', nouvelleTache);
}

// Fonction pour basculer l'état avec sauvegarde automatique
function basculerEtatTacheAvecSauvegarde(index) {
    if (index >= 0 && index < tachesObjets.length) {
        const tache = tachesObjets[index];
        tache.basculerEtat();
        
        // Sauvegarder automatiquement
        sauvegarderTaches();
        
        console.log(tache.terminee ? '✅ Tâche terminée et sauvegardée :' : '↩️ Tâche remise en cours et sauvegardée :', tache.texte);
        afficherTachesObjets();
    }
}

// Fonction pour supprimer une tâche avec sauvegarde automatique
function supprimerTacheAvecSauvegarde(index) {
    if (index >= 0 && index < tachesObjets.length) {
        const tache = tachesObjets[index];
        
        if (confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${tache.texte}" ?`)) {
            tachesObjets.splice(index, 1);
            
            // Sauvegarder automatiquement
            sauvegarderTaches();
            
            afficherTachesObjets();
            console.log('🗑️ Tâche supprimée et sauvegardée :', tache.texte);
        }
    }
}

// Fonction pour afficher les tâches avec la sauvegarde
function afficherTachesAvecStorage() {
    taskList.innerHTML = '';
    
    if (tachesObjets.length === 0) {
        taskList.innerHTML = '<li class="empty-state">Aucune tâche pour le moment.<br>Ajoutez votre première tâche !</li>';
    } else {
        tachesObjets.forEach((tache, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const textClass = tache.terminee ? 'task-text completed' : 'task-text';
            const btnText = tache.terminee ? 'Réactiver' : 'Terminer';
            
            li.innerHTML = `
                <span class="${textClass}" id="task-${index}">
                    ${tache.texte}
                    <small style="display: block; color: #888; font-size: 12px;">
                        Créée le ${tache.dateCreation.toLocaleDateString()}
                    </small>
                </span>
                <div class="task-actions">
                    <button class="btn btn-complete" onclick="basculerEtatTacheAvecSauvegarde(${index})">${btnText}</button>
                    <button class="btn btn-delete" onclick="supprimerTacheAvecSauvegarde(${index})">Supprimer</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    mettreAJourStatsObjets();
}

// Fonction pour obtenir des informations sur le localStorage
function obtenirInfosStorage() {
    try {
        const donneesSauvegardees = localStorage.getItem(CLE_STORAGE);
        
        if (!donneesSauvegardees) {
            return {
                existe: false,
                taille: 0,
                nombreTaches: 0
            };
        }
        
        const donneesJSON = JSON.parse(donneesSauvegardees);
        
        return {
            existe: true,
            taille: new Blob([donneesSauvegardees]).size,
            nombreTaches: donneesJSON.length,
            derniereModification: new Date(Math.max(...donneesJSON.map(t => new Date(t.dateModification))))
        };
        
    } catch (error) {
        return {
            existe: false,
            erreur: error.message
        };
    }
}

// ==================================================
// ÉTAPE 10 : Améliorations finales et fonctionnalités avancées
// ==================================================

// Variables pour les nouvelles fonctionnalités
let searchInput;
let clearAllBtn;
let searchActive = false;
let tachesFiltrees = [];

// Fonction d'initialisation améliorée avec toutes les fonctionnalités
function initialiserDOMComplet() {
    // Récupération des éléments HTML existants
    taskInput = document.getElementById('taskInput');
    addBtn = document.getElementById('addBtn');
    taskList = document.getElementById('taskList');
    totalTasksSpan = document.getElementById('totalTasks');
    completedTasksSpan = document.getElementById('completedTasks');
    pendingTasksSpan = document.getElementById('pendingTasks');
    
    // Récupération des nouveaux éléments
    searchInput = document.getElementById('searchInput');
    clearAllBtn = document.getElementById('clearAllBtn');
    
    // Afficher les sections cachées
    document.querySelector('.search-section').style.display = 'block';
    document.querySelector('.actions-section').style.display = 'block';

    console.log('🔗 Tous les éléments DOM récupérés avec succès');
}

// Fonction de recherche en temps réel
function rechercherTachesTempsReel() {
    const terme = searchInput.value.toLowerCase().trim();
    
    if (terme === '') {
        // Afficher toutes les tâches si pas de recherche
        searchActive = false;
        tachesFiltrees = [...tachesObjets];
    } else {
        // Filtrer les tâches selon le terme de recherche
        searchActive = true;
        tachesFiltrees = tachesObjets.filter(tache => 
            tache.texte.toLowerCase().includes(terme)
        );
    }
    
    afficherTachesFiltrees();
}

// Fonction pour afficher les tâches filtrées
function afficherTachesFiltrees() {
    const tachesAAfficher = searchActive ? tachesFiltrees : tachesObjets;
    
    taskList.innerHTML = '';
    
    if (tachesAAfficher.length === 0) {
        const message = searchActive 
            ? `Aucune tâche trouvée pour "${searchInput.value}"`
            : 'Aucune tâche pour le moment.<br>Ajoutez votre première tâche !';
        taskList.innerHTML = `<li class="empty-state">${message}</li>`;
    } else {
        tachesAAfficher.forEach((tache) => {
            // Trouver l'index réel de la tâche dans tachesObjets
            const indexReel = tachesObjets.indexOf(tache);
            
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const textClass = tache.terminee ? 'task-text completed' : 'task-text';
            const btnText = tache.terminee ? 'Réactiver' : 'Terminer';
            
            // Surligner le terme recherché
            let texteAffiche = tache.texte;
            if (searchActive && searchInput.value.trim() !== '') {
                const terme = searchInput.value.trim();
                const regex = new RegExp(`(${terme})`, 'gi');
                texteAffiche = tache.texte.replace(regex, '<mark style="background: yellow; padding: 0 2px;">$1</mark>');
            }
            
            li.innerHTML = `
                <span class="${textClass}" id="task-${indexReel}">
                    ${texteAffiche}
                    <small style="display: block; color: #888; font-size: 12px;">
                        Créée le ${tache.dateCreation.toLocaleDateString()}
                        ${tache.terminee ? ' • Terminée le ' + tache.dateModification.toLocaleDateString() : ''}
                    </small>
                </span>
                <div class="task-actions">
                    <button class="btn btn-complete" onclick="basculerEtatTacheAvecSauvegarde(${indexReel})">${btnText}</button>
                    <button class="btn btn-delete" onclick="supprimerTacheAvecSauvegarde(${indexReel})">Supprimer</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    mettreAJourStatsAvancees();
}

// Fonction pour mettre à jour les statistiques avancées
function mettreAJourStatsAvancees() {
    const total = tachesObjets.length;
    const terminees = tachesObjets.filter(tache => tache.terminee).length;
    const enCours = total - terminees;
    
    // Affichage des stats avec des informations sur le filtrage
    const affichees = searchActive ? tachesFiltrees.length : total;
    const suffixe = searchActive ? ` (${affichees} affichées)` : '';
    
    totalTasksSpan.textContent = `Total: ${total}${suffixe}`;
    completedTasksSpan.textContent = `Terminées: ${terminees}`;
    pendingTasksSpan.textContent = `En cours: ${enCours}`;
}

// Fonction pour supprimer toutes les tâches
function supprimerToutesLesTaches() {
    if (tachesObjets.length === 0) {
        alert('Aucune tâche à supprimer !');
        return;
    }
    
    const confirmation = confirm(
        `Êtes-vous sûr de vouloir supprimer TOUTES les ${tachesObjets.length} tâches ?\n\nCette action est irréversible.`
    );
    
    if (confirmation) {
        tachesObjets = [];
        tachesFiltrees = [];
        sauvegarderTaches();
        afficherTachesFiltrees();
        
        // Vider aussi la recherche
        if (searchInput) {
            searchInput.value = '';
            searchActive = false;
        }
        
        console.log('🗑️ Toutes les tâches supprimées');
        alert('Toutes les tâches ont été supprimées !');
    }
}

// Fonction pour ajouter tous les écouteurs d'événements
function ajouterTousLesEcouteurs() {
    // Écouteurs existants
    addBtn.addEventListener('click', ajouterTacheAvecSauvegarde);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            ajouterTacheAvecSauvegarde();
        }
    });
    
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    
    // Nouveaux écouteurs pour les fonctionnalités avancées
    searchInput.addEventListener('input', rechercherTachesTempsReel);
    
    // Écouteur pour vider la recherche avec Échap
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            searchInput.value = '';
            rechercherTachesTempsReel();
        }
    });
    
    clearAllBtn.addEventListener('click', supprimerToutesLesTaches);
    
    console.log('👂 Tous les écouteurs d\'événements ajoutés');
}

// Fonction pour obtenir un rapport complet de l'application
function obtenirRapportComplet() {
    const stats = obtenirStatistiquesObjets();
    const infosStorage = obtenirInfosStorage();
    
    const rapport = {
        version: '1.0 - TP Complet',
        dateGeneration: new Date(),
        statistiques: stats,
        localStorage: infosStorage,
        fonctionnalites: {
            recherche: true,
            suppressionGroupee: true,
            persistence: true,
            objets: true,
            statistiques: true
        },
        performance: {
            nombreTaches: tachesObjets.length,
            tailleStorage: infosStorage.taille || 0,
            memoire: JSON.stringify(tachesObjets).length
        }
    };
    
    console.log('📊 Rapport complet de l\'application :', rapport);
    return rapport;
}

// Fonction pour exporter les données (bonus)
function exporterDonnees() {
    try {
        const donnees = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            taches: tachesObjets.map(tache => ({
                id: tache.id,
                texte: tache.texte,
                terminee: tache.terminee,
                dateCreation: tache.dateCreation.toISOString(),
                dateModification: tache.dateModification.toISOString()
            }))
        };
        
        const donneesJSON = JSON.stringify(donnees, null, 2);
        const blob = new Blob([donneesJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `taches_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('📤 Données exportées avec succès');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'export :', error);
        alert('Erreur lors de l\'export des données');
    }
}

// Fonction pour importer des données (bonus)
function importerDonnees(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const donnees = JSON.parse(e.target.result);
            
            if (!donnees.taches || !Array.isArray(donnees.taches)) {
                throw new Error('Format de fichier invalide');
            }
            
            // Recréer les objets Tache
            const tachesImportees = donnees.taches.map(donnee => {
                const tache = new Tache(donnee.texte, donnee.id);
                tache.terminee = donnee.terminee;
                tache.dateCreation = new Date(donnee.dateCreation);
                tache.dateModification = new Date(donnee.dateModification);
                return tache;
            });
            
            // Remplacer les tâches actuelles
            tachesObjets = tachesImportees;
            sauvegarderTaches();
            afficherTachesFiltrees();
            
            console.log('📥 Données importées avec succès :', tachesImportees.length, 'tâches');
            alert(`${tachesImportees.length} tâches importées avec succès !`);
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'import :', error);
            alert('Erreur lors de l\'import : format de fichier invalide');
        }
    };
    
    reader.readAsText(file);
}
