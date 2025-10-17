export class NpcData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            habilidades: new fields.SchemaField({
                for: new fields.NumberField({ required: true, initial: 10, integer: true }),
                con: new fields.NumberField({ required: true, initial: 10, integer: true }),
                dex: new fields.NumberField({ required: true, initial: 10, integer: true }),
                int: new fields.NumberField({ required: true, initial: 10, integer: true }),
                car: new fields.NumberField({ required: true, initial: 10, integer: true }),
                sab: new fields.NumberField({ required: true, initial: 10, integer: true }),
            }),
            recursos: new fields.SchemaField({
                vida: new fields.SchemaField({
                    value: new fields.NumberField({ required: true, initial: 10, integer: true }),
                    max: new fields.NumberField({ required: true, initial: 10, integer: true })
                }),
            }),
            detalhes: new fields.SchemaField({
                biografia: new fields.HTMLField({ required: true, initial: "" })
            })
        };
    }
}