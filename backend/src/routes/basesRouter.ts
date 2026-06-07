import express from "express";
import fs from "fs";
import { Base } from "../models/bases";

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

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

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