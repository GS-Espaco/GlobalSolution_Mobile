import express from "express";
import cors from "cors";
import basesRouter from "./routes/basesRouter";
import locaisRouter from "./routes/locaisRouter"

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (
        email === "admin@email.com" &&
        password === "123456"
    ) {
        return res.json({
            success: true,
            token: "jwt_fake_token",
        });
    }

    return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
    });
});

app.use("/bases", basesRouter);

app.use("/locais", locaisRouter);

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});