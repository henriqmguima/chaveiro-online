const tipoSelect = document.getElementById("tipo");
const campoExtraDiv = document.getElementById("campo-extra");

tipoSelect.addEventListener("change", () => {
    const tipo = tipoSelect.value;
    campoExtraDiv.innerHTML = "";

    if (tipo === "aluno") {
        campoExtraDiv.innerHTML = `
          <label>
            Matrícula:
            <input type="text" id="matricula" required />
          </label>
          <br /><br />
        `;
    } else if (tipo === "servidor") {
        campoExtraDiv.innerHTML = `
          <label>
            Função:
            <input type="text" id="funcao" required />
          </label>
          <br /><br />
        `;
    }
});

const form = document.getElementById("form-usuario");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const matricula = tipo === "aluno" ? document.getElementById("matricula").value : null;
    const funcao = tipo === "servidor" ? document.getElementById("funcao").value : null;

    const novoUsuario = {
        nome,
        tipo,
        matricula,
        funcao,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            mensagem.textContent = "Usuário cadastrado com sucesso!";
            form.reset();
            campoExtraDiv.innerHTML = "";
        } else {
            mensagem.textContent = "Erro ao cadastrar usuário.";
        }
    } catch (error) {
        console.error("Erro:", error);
        mensagem.textContent = "Falha na comunicação com a API.";
    }
});