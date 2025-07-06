const form = document.getElementById("form-sala");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const bloco = document.getElementById("bloco").value;
    const quantidade_chaves = parseInt(document.getElementById("quantidade").value);

    const novaSala = {
        nome,
        bloco,
        quantidade_chaves,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch("http://localhost:3001/salas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaSala)
        });

        if (response.ok) {
            mensagem.textContent = "Sala cadastrada com sucesso!";
            form.reset();
        } else {
            mensagem.textContent = "Erro ao cadastrar sala.";
        }
    } catch (error) {
        console.error("Erro:", error);
        mensagem.textContent = "Falha na comunicação com a API.";
    }
});

