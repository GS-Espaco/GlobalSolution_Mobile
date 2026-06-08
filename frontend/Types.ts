export type RootStackParamList = {
    LOGIN: undefined;
    MAIN: undefined;
    BASE: undefined;
    CREATEBASE: undefined;
    GREENHOUSE: {
        id: number;
    };
};

export type BaseType = {
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
    AGUA = "Agua",
}

export type LocalType = {
    id: number;
    nome: string;
};