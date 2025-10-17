export class IsgarrActor extends Actor {

  prepareData() {
    super.prepareData();
    this._prepareCharacterData(this);
  }

  _prepareCharacterData(actorData) {
    const systemData = actorData.system;

    // Calcular modificadores para atributos e perícias
    for (let group of ["atributos", "pericias"]) {
      for (let [key, item] of Object.entries(systemData[group])) {
        item.m2 = Math.floor(item.valor / 2);
        item.m5 = Math.floor(item.valor / 5);
        item.m10 = Math.floor(item.valor / 10);
      }
    }

    // --- Cálculos de Recursos ---
    const atributos = systemData.atributos;
    const detalhes = systemData.detalhes;
    const recursos = systemData.recursos;

    recursos.sangue.max = Math.floor((atributos.con.valor * 2) + (detalhes.nivel / 2));
    recursos.mana.max = Math.floor(atributos.int.valor + atributos.sab.valor + detalhes.nivel);
    
    // Cálculo dos Pontos de Ação
    recursos.pontosAcao.max = Math.floor(3 + (atributos.agi.valor / 5));
    recursos.pontosAcao.valor = recursos.pontosAcao.max - recursos.pontosAcao.gastos;
  }
}