export class GuismiActor extends Actor {
    prepareDerivedData() {
        super.prepareDerivedData();

        const system = this.system;
        const attributes = system.attributes;
        const resources = system.resources;
        const actionPoints = system.actionPoints;
        const progression = system.progression;

        // Calculate attribute modifiers
        for (let [key, attribute] of Object.entries(attributes)) {
            attribute.m2 = Math.floor(attribute.value / 2);
            attribute.m5 = Math.floor(attribute.value / 5);
            attribute.m10 = Math.floor(attribute.value / 10);
        }

        // Calculate defenses
        system.defenses = {
            reflexes: Math.floor(attributes.agi.value / 2),
            fortitude: Math.floor(attributes.con.value / 2),
            will: Math.floor(attributes.sab.value / 2)
        };

        // Calculate maximum resources
        resources.sangue.max = (attributes.con.value * 2) + progression.level;
        resources.mana.max = (attributes.int.value * 2) + progression.level;
        resources.fe.max = (attributes.sab.value * 2) + progression.level;

        // Calculate action points
        actionPoints.max = 3 + Math.floor(attributes.agi.value / 5);
        actionPoints.value = actionPoints.max;
    }

    async _preCreateEmbeddedDocuments(embeddedName, result, options, userId) {
        if (embeddedName === "Item") {
            for (let itemData of result) {
                if (itemData.type === "species") {
                    const speciesCost = itemData.system.cost || 0;
                    if (this.system.progression.creationPoints < speciesCost) {
                        ui.notifications.error("Not enough creation points!");
                        return false; // Prevent item creation
                    }
                    await this.update({
                        "system.progression.creationPoints": this.system.progression.creationPoints - speciesCost,
                        "system.resources.sangue.max": this.system.resources.sangue.max + (itemData.system.bloodBonus || 0)
                    });
                }
            }
        }
        return super._preCreateEmbeddedDocuments(embeddedName, result, options, userId);
    }

    async levelUp() {
        const currentLevel = this.system.progression.level;
        const currentXp = this.system.progression.xp;
        const newXp = currentXp - this.system.progression.xpMax;
        await this.update({
            "system.progression.level": currentLevel + 1,
            "system.progression.xp": newXp,
            "system.progression.xpMax": Math.floor(this.system.progression.xpMax * 1.5)
        });
        ui.notifications.info(`${this.name} has leveled up to level ${currentLevel + 1}!`);
    }

    async rollAttack(weapon) {
        const roll = new Roll("1d20 + @mod", { mod: this.system.attributes.des.m2 });
        await roll.evaluate({ async: true });
        const content = await renderTemplate("systems/guismi/templates/chat/roll-card.html", {
            flavor: `Attacks with ${weapon.name}`,
            roll: roll
        });
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: content
        });
    }

    async rollHabit(habitName) {
        const habit = this.system.attributes[habitName];
        if (!habit) return;
        const roll = new Roll("1d20 + @mod", { mod: habit.m2 });
        await roll.evaluate({ async: true });
        const content = await renderTemplate("systems/guismi/templates/chat/roll-card.html", {
            flavor: `Tests ${habitName}`,
            roll: roll
        });
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: content
        });
    }

    async rollDamage(weapon) {
        const roll = new Roll(weapon.system.damage);
        await roll.evaluate({ async: true });
        const content = await renderTemplate("systems/guismi/templates/chat/roll-card.html", {
            flavor: `Damage with ${weapon.name}`,
            roll: roll
        });
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: content
        });
    }
}