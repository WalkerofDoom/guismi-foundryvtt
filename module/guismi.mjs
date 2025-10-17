import { GuismiActor } from "./documents/actor.mjs";
import { GuismiItem } from "./documents/item.mjs";
import { CharacterData } from "./data/models/actor-model.mjs";
import { SpeciesData, PathData, WeaponData, ArmorData, ItemData, StateData } from "./data/models/item-model.mjs";
import GuismiActorSheet from "./sheets/actor-sheet.mjs";
import { GuismiItemSheet } from "./sheets/item-sheet.mjs";

Hooks.once('init', async function() {
    console.log('Guismi | Initializing GUI.S.M.I. System');

    // Register Data Models
    CONFIG.Actor.dataModels.character = CharacterData;
    CONFIG.Item.dataModels.species = SpeciesData;
    CONFIG.Item.dataModels.path = PathData;
    CONFIG.Item.dataModels.weapon = WeaponData;
    CONFIG.Item.dataModels.armor = ArmorData;
    CONFIG.Item.dataModels.item = ItemData;
    CONFIG.Item.dataModels.state = StateData;

    // Register Document Classes
    CONFIG.Actor.documentClass = GuismiActor;
    CONFIG.Item.documentClass = GuismiItem;

    // Unregister default sheets
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    // Register custom sheets
    Actors.registerSheet("guismi", GuismiActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Guismi.SheetLabels.Character"
    });
    Items.registerSheet("guismi", GuismiItemSheet, {
        makeDefault: true,
        label: "Guismi.SheetLabels.Item"
    });
});

Hooks.on("preUpdateActor", (actor, update) => {
    if (update.system && update.system.progression && update.system.progression.xp) {
        const newXp = update.system.progression.xp;
        if (newXp >= actor.system.progression.xpMax) {
            actor.levelUp();
            delete update.system.progression.xp; // Prevent double update
        }
    }
});