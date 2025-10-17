import { IsgarrActor } from "./actor/Actor.mjs";
import PersonagemSheet from "./actor/PersonagemSheet.mjs";
import { IsgarrItemSheet } from "./item/ItemSheet.mjs";

// Inicialização do sistema
Hooks.once('init', async function() {
  console.log('Isgarr | Inicializando sistema GUI.S.M.I.');

  // Define as classes customizadas de Documentos
  CONFIG.Actor.documentClass = IsgarrActor;
  // CONFIG.Item.documentClass = IsgarrItem; // Descomentar quando criarmos a lógica do Item

  // Desregistra as fichas padrão
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  // Registra as fichas customizadas do sistema
  Actors.registerSheet("isgarr", PersonagemSheet, {
    types: ["personagem"],
    makeDefault: true,
    label: "Isgarr.SheetLabels.Personagem"
  });
  Items.registerSheet("isgarr", IsgarrItemSheet, {
    makeDefault: true,
    label: "Isgarr.SheetLabels.Item"
  });
});