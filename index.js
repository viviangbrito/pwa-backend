const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json()); // Permite receber JSON no body das requisições

// Rota de teste
app.get('/api/mensagem', (req, res) => {
    res.json({ mensagem: 'Conexão entre frontend e backend bem-sucedida!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
