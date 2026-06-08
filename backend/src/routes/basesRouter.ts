import express from "express";
import fs from "fs";
import { Base, EstadoBase } from "../models/bases";

const router = express.Router();

function lerBases(): Base[] {
    const dados = fs.readFileSync("./src/db/bases.json", "utf-8");
    return JSON.parse(dados);
}

function salvarBases(bases: Base[]) {
    fs.writeFileSync(
        "./src/db/bases.json",
        JSON.stringify(bases, null, 2)
    );
}

router.get("/", (req, res) => {
    const bases = lerBases();
    res.json(bases);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    let bases = lerBases();

    const base = bases.find(base => base.id === id);

    if (!base) {
        return res.status(404).json({
            message: "Base não encontrada"
        });
    }

    res.json(base);
});

router.post("/", (req, res) => {
    const bases = lerBases();

    const novaBase = {
        id: Date.now(),
        ...req.body,
    };

    bases.push(novaBase);

    salvarBases(bases);

    res.status(201).json(novaBase);
});

function calcularEstado(temperatura: number): EstadoBase {
    if (temperatura >= -10 && temperatura <= 1) {
        return EstadoBase.CONGELADA;
    }

    if (temperatura < -10) {
        return EstadoBase.MORTA;
    }

    if (temperatura >= 40){
        return EstadoBase.QUEIMADA;
    }

    if (temperatura >= 31 && temperatura < 40) {
        return EstadoBase.TEMPERATURA_ALTA;
    }

    if (temperatura >= 1 && temperatura <= 15) {
        return EstadoBase.AGUA;
    }
    
    if (temperatura > 15 && temperatura < 31) {
        return EstadoBase.NORMAL;
    }

    return EstadoBase.NORMAL;
}

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const bases = lerBases();

    const index = bases.findIndex(base => base.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Base não encontrada"
        });
    }

    const baseAtualizada = {
        ...bases[index],
        ...req.body,
    };

    if (baseAtualizada.temperatura !== undefined) {
        baseAtualizada.estado = calcularEstado(
            baseAtualizada.temperatura
        );
    }

    bases[index] = baseAtualizada;

    salvarBases(bases);

    res.json(baseAtualizada);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    let bases = lerBases();

    const baseExiste = bases.find(base => base.id === id);

    if (!baseExiste) {
        return res.status(404).json({
            message: "Base não encontrada"
        });
    }

    bases = bases.filter(base => base.id !== id);

    salvarBases(bases);

    res.json({
        success: true,
        message: "Base removida com sucesso"
    });
});

export default router;