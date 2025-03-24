const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

// Função para buscar e extrair os podcasts do site
async function fetchPodcastsFromWebsite() {
    try {
        // Faça uma requisição para pegar o HTML da página
        const { data } = await axios.get("https://podcastsdehorror.netlify.app/");
        
        // Carregar o HTML usando Cheerio
        const $ = cheerio.load(data);

        // Cria um array de podcasts
        const podcasts = [];

        // Localiza o div que contém a lista de podcasts (id="podcasts-list")
        $("#podcasts-list").each((index, element) => {
            // Extraia os detalhes de cada podcast (ajuste os seletores conforme necessário)
            const title = $(element).find(".podcast-title").text(); // Exemplo de seletor
            const description = $(element).find(".podcast-description").text(); // Exemplo de seletor

            // Adiciona ao array de podcasts
            podcasts.push({ title, description });
        });

        return podcasts;
    } catch (error) {
        console.error("Erro ao buscar podcasts:", error);
        return [];
    }
}

// Rota GET para retornar os podcasts
app.get("/api/podcasts", async (req, res) => {
    const podcasts = await fetchPodcastsFromWebsite();
    res.json(podcasts); // Retorna os podcasts
});

// Define a porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
