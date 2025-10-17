export class HabilidadeData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            descricao: new fields.HTMLField({ required: true, initial: "" }),
            custo: new fields.NumberField({ required: true, initial: 0, integer: true })
        };
    }
}