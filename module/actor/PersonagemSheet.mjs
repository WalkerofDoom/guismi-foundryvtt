export default class PersonagemSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["isgarr", "sheet", "actor", "personagem"],
      template: "systems/isgarr/templates/actors/personagem-sheet.html",
      width: 850,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "caracteristicas" }]
    });
  }

  async getData(options) {
    const context = await super.getData(options);
    context.systemData = context.actor.system;

    // Carrega as espécies do compêndio
    context.especies = [];
    const pack = game.packs.get("isgarr.especies");
    if (pack) {
        const index = await pack.getIndex();
        context.especies = index.map(i => ({ id: i._id, name: i.name }));
    }

    return context;
  }

  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) return;

    // Listeners
    html.find('.rollable').click(this._onRoll.bind(this));
    html.find('.item-create').click(this._onItemCreate.bind(this));
    html.find('.item-edit').click(this._onItemEdit.bind(this));
    html.find('.item-delete').click(this._onItemDelete.bind(this));
  }

  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = {
      name: `Novo ${type.capitalize()}`,
      type: type,
      system: {}
    };
    return this.actor.createEmbeddedDocuments("Item", [data]);
  }

  _onItemEdit(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    item.sheet.render(true);
  }

  _onItemDelete(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    item.delete();
  }

  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actorData = this.actor.system;

    const rollKey = dataset.key;
    const rollType = dataset.type;
    const sourceData = actorData[rollType + "s"][rollKey];

    if (!sourceData) return;

    const dialogContent = `
      <form>
        <div class="form-group">
          <label>Modificador:</label>
          <select name="modifier">
            <option value="${sourceData.m2}">M2 (${sourceData.m2})</option>
            <option value="${sourceData.m5}">M5 (${sourceData.m5})</option>
            <option value="${sourceData.m10}">M10 (${sourceData.m10})</option>
          </select>
        </div>
        <div class="form-group">
          <label>Bônus Situacional:</label>
          <input type="text" name="bonus" value="0" />
        </div>
      </form>
    `;

    new Dialog({
      title: `Teste de ${rollKey.toUpperCase()}`,
      content: dialogContent,
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: "Rolar",
          callback: async (html) => {
            const modifier = parseInt(html.find('[name="modifier"]').val());
            const bonus = parseInt(html.find('[name="bonus"]').val()) || 0;
            const totalMod = modifier + bonus;

            const roll = new Roll(`1d100 + @mod`, {mod: totalMod});
            await roll.toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor: `<h2>Teste de ${rollKey.toUpperCase()}</h2><p>Modificador Total: ${totalMod}</p>`
            });
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancelar"
        }
      },
      default: "roll"
    }).render(true);
  }
}