export class CharacterData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            attributes: new fields.SchemaField({
                for: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                con: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                agi: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                des: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                int: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                sab: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) }),
                car: new fields.SchemaField({ value: new fields.NumberField({ initial: 10, integer: true }) })
            }),
            resources: new fields.SchemaField({
                sangue: new fields.SchemaField({
                    value: new fields.NumberField({ initial: 10, integer: true }),
                    max: new fields.NumberField({ initial: 10, integer: true })
                }),
                mana: new fields.SchemaField({
                    value: new fields.NumberField({ initial: 10, integer: true }),
                    max: new fields.NumberField({ initial: 10, integer: true })
                }),
                fe: new fields.SchemaField({
                    value: new fields.NumberField({ initial: 10, integer: true }),
                    max: new fields.NumberField({ initial: 10, integer: true })
                })
            }),
            actionPoints: new fields.SchemaField({
                value: new fields.NumberField({ initial: 3, integer: true }),
                max: new fields.NumberField({ initial: 3, integer: true })
            }),
            progression: new fields.SchemaField({
                xp: new fields.NumberField({ initial: 0, integer: true }),
                xpMax: new fields.NumberField({ initial: 100, integer: true }),
                level: new fields.NumberField({ initial: 1, integer: true }),
                creationPoints: new fields.NumberField({ initial: 10, integer: true })
            })
        };
    }
}