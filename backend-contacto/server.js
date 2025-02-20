require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Tu correo
                pass: process.env.EMAIL_PASS, // Tu contraseña o App Password
            },
        });

        let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: "Nuevo mensaje del formulario de contacto",
            text: `De: ${email}\n\nMensaje:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar el correo." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});