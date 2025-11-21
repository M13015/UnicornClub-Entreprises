const express = require('express');
const fetch = require('node-fetch'); // Assure-toi d'installer node-fetch@2
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Webhook Discord
const webhookUrl = "https://discord.com/api/webhooks/1441466746274844906/ZnVrHafVzhiOSOqv0ypWKTswj5uTNgkDdNM1V7kTy5tiEgKmhqpM-JJaQPv0oZwrkI-y";

app.post('/order', async (req, res) => {
  const { content } = req.body;
  try {
    console.log("Message envoyé au webhook :", content); // debug
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    console.log("Status Discord :", response.status, response.statusText);

    if (!response.ok) {
      throw new Error("Erreur Discord : " + response.statusText);
    }

    res.status(200).send("Commande envoyée !");
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).send("Erreur lors de l'envoi");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur actif sur http://localhost:${PORT}`));
