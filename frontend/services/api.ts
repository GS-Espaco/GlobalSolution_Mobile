import { BaseType } from "../Types";

export const API_URL = "http://localhost:3000";

export async function loginRequest(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    return response.json();
}

// Bases
export async function createBase(
    nome: string,
    localizacao: string,
    estado: string,
    temperatura: number,
) {
    const response = await fetch(
        `${API_URL}/bases`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                localizacao,
                estado,
                temperatura
            }),
        }
    );

    return response.json();
}

export async function getBaseById(id: number) {
    const response = await fetch(
        `${API_URL}/bases/${id}`,
    {
        method: "GET",
    })

    return response.json();
}

export async function updateBase(
    id: number,
    dados: Partial<BaseType>
) {
    const response = await fetch(
        `${API_URL}/bases/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        }
    );

    return response.json();
}

export async function deleteBase(id: number) {
    const response = await fetch(
        `${API_URL}/bases/${id}`,
        {
            method: "DELETE",
        }
    );

    return response.json();
}

// Locais
export async function createLocal(
    nome: string,
    coordenadas: number
) {
    const response = await fetch(
        `${API_URL}/locais`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome
            }),
        }
    );

    return response.json();
}