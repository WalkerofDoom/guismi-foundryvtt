export class SpeciesData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField(),
            cost: new fields.NumberField({ initial: 0, integer: true }),
            bloodBonus: new fields.NumberField({ initial: 0, integer: true })
        };
    }
}

export class PathData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField()
        };
    }
}

export class WeaponData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField(),
            damage: new fields.StringField({ initial: "1d6" }),
            range: new fields.StringField({ initial: "Melee" })
        };
    }
}

export class ArmorData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField(),
            dr: new fields.NumberField({ initial: 1, integer: true })
        };
    }
}

export class ItemData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField(),
            quantity: new fields.NumberField({ initial: 1, integer: true }),
            weight: new fields.NumberField({ initial: 0 })
        };
    }
}

export class StateData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField()
        };
    }
}