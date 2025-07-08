const API = "https://686ad892e559eba908710415.mockapi.io";
const buscaSala = document.getElementById("buscaSala");
const buscaUsuario = document.getElementById("buscaUsuario");
const resultado = document.getElementById("resultado");

let usuarios = [];
let registros = [];

async function carregarDados() {
    const res = await fetch(`${API}/users`);
    usuarios = await res.json();
    carregarSelects();
    registros = JSON.parse(localStorage.getItem("registros") || "[]");
}

function carregarSelects() {
    buscaSala.innerHTML = "";
    buscaUsuario.innerHTML = "";

    usuarios.forEach(u => {
        if (u.tipo === 2) {
            buscaSala.innerHTML += `<option value="${u.id}">${u.nome}</option>`;
        } else if (u.tipo === 1) {
            buscaUsuario.innerHTML += `<option value="${u.id}">${u.nome}</option>`;
        }
    });
}

function consultarSala() {
    const salaId = buscaSala.value;
    const ativos = registros.filter(r => r.salaId === salaId && r.status === "ativa");

    if (ativos.length === 0) {
        resultado.innerText = "Nenhuma chave está com usuários no momento.";
        return;
    }

    const nomes = ativos.map(r => {
        const user = usuarios.find(u => u.id === r.usuarioId);
        return user ? user.nome : "Desconhecido";
    });

    resultado.innerText = `A chave está com: ${nomes.join(", ")}`;
}

function consultarUsuario() {
    const usuarioId = buscaUsuario.value;
    const ativos = registros.filter(r => r.usuarioId === usuarioId && r.status === "ativa");

    if (ativos.length === 0) {
        resultado.innerText = "Este professor não está com nenhuma chave no momento.";
        return;
    }

    const salas = ativos.map(r => {
        const sala = usuarios.find(u => u.id === r.salaId);
        return sala ? sala.nome : "[Sala desconhecida]";
    });

    resultado.innerText = `Ele está com as chaves das salas: ${salas.join(", ")}`;
}

carregarDados();
