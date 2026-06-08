export type Base = {
    id: number;
    nome: string;
    localizacao: string;
    estado: EstadoBase;
    temperatura: number;
};

export enum EstadoBase {
    MORTA = "Morta",
    CONGELADA = "Congelada",
    NORMAL = "Normal",
    TEMPERATURA_ALTA = "Temperatura Alta",
    QUEIMADA = "Queimada",
    AGUA = "Aguada",
}