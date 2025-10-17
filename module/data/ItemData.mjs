export class ItemData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            descricao: new fields.HTMLField({ required: true, initial: "" }),
            raridade: new fields.StringField({ required: true, initial: "Comum" }),
            preco: new fields.NumberField({ required: true, initial: 0, integer: true })
        };
    }
}