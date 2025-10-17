/**
 * Estende a classe base da Ficha de Ator para implementar a ficha de personagem de Isgarr.
 * @extends {ActorSheet}
 */
export class IsgarrActorSheet extends ActorSheet {

  /**
   * Opções padrão da ficha de personagem.
   * @returns {object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["isgarr", "sheet", "actor"],
      template: "systems/isgarr/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "atributos" }]
    });
  }

  /**
   * Retorna os dados para o template da ficha.
   * @returns {object}
   */
  getData() {
    const data = super.getData();
    data.system = data.actor.system; // Acessa os dados definidos no template.json
    return data;
  }
}