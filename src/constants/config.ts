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
      IsEmpty: "Esta vacio",
      IsNotEmpty: "No está vacio",
      IsDateEqualTo: "La fecha es igual a",
      IsDateGreaterThan: "La fecha es mayor a",
      IsDateGreaterThanOrEqual: "La fecha es mayor o igual a",
      IsDateLessThan: "La fecha es menor a",
      IsDateLessThanOrEqual: "La fecha es menor o igual a",
      IsDateNotEqualTo: "La fecha no es igual a",
      IsNotNull: "No es nulo",
      IsNotUndefined: "No es indefinido",
      IsNull: "Es nulo",
      IsUndefined: "Es Indefinido",
    },
  };
}
