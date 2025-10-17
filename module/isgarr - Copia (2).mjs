// Importar classes customizadas
import { IsgarrActor } from "./actor/actor.mjs";
import { IsgarrActorSheet } from "./actor/actor-sheet.mjs";
import { IsgarrItem } from "./item/item.mjs";
import { IsgarrItemSheet } from "./item/item-sheet.mjs";

/* ------------------------------------ */
/* Inicialização do Sistema             */
/* ------------------------------------ */
Hooks.once('init', async function() {

  console.log('Isgarr | Inicializando sistema de RPG Isgarr');

  // Atribui classes customizadas às configurações globais
  CONFIG.Actor.documentClass = IsgarrActor;
  CONFIG.Item.documentClass = IsgarrItem;

  // Registra as fichas de personagem e item
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("isgarr", IsgarrActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("isgarr", IsgarrItemSheet, { makeDefault: true });

  // Pré-carrega os templates de Handlebars
  const templatePaths = [
    "systems/isgarr/templates/actor/actor-sheet.html"
  ];
  loadTemplates(templatePaths);

});