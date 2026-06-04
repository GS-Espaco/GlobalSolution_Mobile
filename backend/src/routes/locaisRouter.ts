import express from "express";
import fs from "fs";
import { Local } from "../models/locais";

const router = express.Router();

function lerLocais(): Local[] {
    const dados = fs.readFileSync("./src/db/locais.json", "utf-8");
    return JSON.parse(dados);
}

function salvarLocais(local: Local[]) {
    fs.writeFileSync(
        "./src/db/locais.json",
        JSON.stringify(local, null, 2)
    );
}

router.get("/", (req, res) => {
    const bases = lerLocais();
    res.json(bases);
});

router.post("/", (req, res) => {
    const locais = lerLocais();

    const novoLocal = {
        id: Date.now(),
        ...req.body,
    };

    locais.push(novoLocal);

    salvarLocais(locais);

    res.status(201).json(novoLocal);
});

export default router;