import { IsgarrActor } from "./actor/Actor.mjs";
import { IsgarrItem } from "./item/item.mjs";
import PersonagemSheet from "./actor/PersonagemSheet.mjs";
import { IsgarrItemSheet } from "./item/ItemSheet.mjs";
import { PersonagemData } from "./data/PersonagemData.mjs";
import { NpcData } from "./data/NpcData.mjs";
import { ItemData } from "./data/ItemData.mjs";
import { HabilidadeData } from "./data/HabilidadeData.mjs";

// Inicialização do sistema
Hooks.once('init', async function() {
  console.log('Isgarr | Inicializando sistema GUI.S.M.I.');

  // Define as classes customizadas de Documentos
  CONFIG.Actor.documentClass = IsgarrActor;
  CONFIG.Item.documentClass = IsgarrItem;

    // Registrar DataModels
    CONFIG.Actor.dataModels.personagem = PersonagemData;
    CONFIG.Actor.dataModels.npc = NpcData;
    CONFIG.Item.dataModels.item = ItemData;
    CONFIG.Item.dataModels.habilidade = HabilidadeData;

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