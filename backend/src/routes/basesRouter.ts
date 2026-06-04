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

export default router;