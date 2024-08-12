import { QFilterLangConfig } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace QFILTER_CONFIG {
  export const spanish: QFilterLangConfig = {
    logicalOperators: {
      AND: "Y",
      OR: "O",
    },
    columns: {
      Column: "Columna",
      Operator: "Operador",
      Value: "Valor",
    },
    headerButtons: {
      Filter: "Filtro",
      Group: "Grupo",
    },
    FooterButtons: {
      Apply: "Aplicar Filtros",
      Reset: "Reiniciar",
    },
    operators: {
      Contains: "Contiene",
      Equals: "Igual a",
      NotEquals: "No igual a",
      NotContains: "No contiene",
      StartsWith: "Comienza con",
      NotStartsWith: "No comienza con",
      EndsWith: "Termina con",
      NotEndsWith: "No termina con",
      GreaterThan: "Mayor a",
      LessThan: "Menor a",
      LessThanOrEqual: "Menor o igual a",
      GreaterThanOrEqual: "Mayor o igual a",
    },
  };
}
