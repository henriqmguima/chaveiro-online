// script.js
const API = "https://686ad892e559eba908710415.mockapi.io";

const formCadastro = document.getElementById("form-cadastro");
const formChave = document.getElementById("form-chave");
const usuarioSelect = document.getElementById("usuario");
const salaSelect = document.getElementById("sala");
const logBox = document.getElementById("log");
const filtroData = document.getElementById("filtro-data");
const tabelaRegistros = document.querySelector("#tabela-registros tbody");

const senhaPadrao = "1234";
let usuarios = [];
let registros = [];

function abrirModalCadastro() {
    document.getElementById("modal-cadastro").style.display = "block";
}
function abrirModalChave() {
    document.getElementById("modal-chave").style.display = "block";
}
function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
};

async function carregarUsuarios() {
    const res = await fetch(`${API}/users`);
    usuarios = await res.json();
    usuarioSelect.innerHTML = "";
    salaSelect.innerHTML = "";
    usuarios.forEach(user => {
        if (user.tipo === 0 || user.tipo === 1) {
            usuarioSelect.innerHTML += `<option value="${user.id}">${user.nome}</option>`;
        } else if (user.tipo === 2) {
            salaSelect.innerHTML += `<option value="${user.id}">${user.nome}</option>`;
        }
    });
}

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const tipo = parseInt(document.getElementById("tipo").value);
    const info = document.getElementById("info").value;

    await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, tipo, info })
    });
    await carregarUsuarios();
    log("Usuário cadastrado com sucesso!");
    formCadastro.reset();
    fecharModal("modal-cadastro");
});

formChave.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuarioId = document.getElementById("usuario").value;
    const salaId = document.getElementById("sala").value;
    const acao = document.getElementById("acao").value;
    const senha = document.getElementById("senha").value;

    if (senha !== senhaPadrao) return log("Senha incorreta!");

    let registrosLS = JSON.parse(localStorage.getItem("registros") || "[]");
    const chavesMesmaSala = registrosLS.filter(r => r.salaId === salaId && r.status === "ativa").length;

    if (acao === "retirada") {
        if (chavesMesmaSala >= 2) return log("Limite de chaves já retiradas desta sala.");
        registrosLS.push({ usuarioId, salaId, tipo: "retirada", status: "ativa", createdAt: new Date().toISOString() });
        log("Chave retirada com sucesso!");
    } else {
        const index = registrosLS.findIndex(r => r.usuarioId === usuarioId && r.salaId === salaId && r.status === "ativa");
        if (index === -1) return log("Nenhuma chave ativa encontrada para este usuário nesta sala.");
        registrosLS[index].status = "concluida";
        registrosLS.push({ usuarioId, salaId, tipo: "devolucao", status: "concluida", createdAt: new Date().toISOString() });
        log("Chave devolvida com sucesso!");
    }
    localStorage.setItem("registros", JSON.stringify(registrosLS));
    carregarRegistros();
    formChave.reset();
    fecharModal("modal-chave");
});

function log(msg) {
    logBox.innerText = msg;
    setTimeout(() => logBox.innerText = "", 4000);
}

function carregarRegistros() {
    const tbody = document.querySelector("#tabela-registros tbody");
    tbody.innerHTML = "";

    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    const filtroData = document.getElementById("filtro-data").value;

    registros
        .filter(reg => {
            if (!filtroData) return true;

            const dataRegistro = new Date(reg.createdAt);
            const dataFiltro = new Date(filtroData);

            // Corrigir timezone manualmente (UTC -> LocalTime)
            const localDateRegistro = new Date(
                dataRegistro.getTime() - dataRegistro.getTimezoneOffset() * 60000
            );

            return (
                localDateRegistro.toISOString().split("T")[0] === filtroData
            );
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .forEach(reg => {
            const usuario = usuarios.find(u => u.id === reg.usuarioId)?.nome || "Usuário";
            const sala = usuarios.find(u => u.id === reg.salaId)?.nome || "Sala";
            const tr = document.createElement("tr");

            tr.innerHTML = `
        <td>${new Date(reg.createdAt).toLocaleString()}</td>
        <td>${usuario}</td>
        <td>${sala}</td>
        <td>${reg.tipo}</td>
        <td>${reg.status}</td>
      `;

            tbody.appendChild(tr);
        });
}

filtroData.addEventListener("change", carregarRegistros);

carregarUsuarios().then(carregarRegistros);
function irParaConsulta() {
    window.location.href = "consulta.html"; // certifique-se que o arquivo existe
}

function exportarCSV() {
    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    if (registros.length === 0) return alert("Nenhum registro para exportar.");

    const linhas = [
        ["Data/Hora", "Usuário", "Sala", "Ação", "Status"]
    ];

    registros.forEach(r => {
        const usuario = usuarios.find(u => u.id === r.usuarioId)?.nome || "Usuário";
        const sala = usuarios.find(u => u.id === r.salaId)?.nome || "Sala";
        const data = new Date(r.createdAt).toLocaleString();
        linhas.push([data, usuario, sala, r.tipo, r.status]);
    });

    const csv = linhas.map(l => l.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registros_chaveiro.csv";
    a.click();
    URL.revokeObjectURL(url);
}

function limparRegistros() {
    if (confirm("Tem certeza que deseja apagar todos os registros?")) {
        localStorage.removeItem("registros");
        carregarRegistros();
        log("Registros removidos com sucesso.");
    }
}
