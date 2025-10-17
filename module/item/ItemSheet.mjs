export class IsgarrItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["isgarr", "sheet", "item"],
      width: 520,
      height: 480,
    });
  }

  /** @override */
  get template() {
    const path = "systems/isgarr/templates/items";
    // Retorna um template específico para o tipo do item, ou um genérico se não encontrar.
    return `${path}/${this.item.type}-sheet.html`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.systemData = context.item.system;
    return context;
  }
}