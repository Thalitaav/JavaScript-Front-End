const API_URL = 'http://leoproti.com.br:8004/estudantes';

const form = document.getElementById('estudanteForm');
const tabela = document.getElementById('tabelaEstudantes');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const idInput = document.getElementById('id');

async function carregarEstudantes() {
  const res = await fetch(API_URL);
  const estudantes = await res.json();

  tabela.innerHTML = '';
  estudantes.forEach(estudante => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${estudante.id}</td>
      <td>${estudante.nome}</td>
      <td>${estudante.email}</td>
      <td>
        <button onclick="editarEstudante(${estudante.id}, '${estudante.nome}', '${estudante.email}')">Editar</button>
        <button onclick="excluirEstudante(${estudante.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const estudante = {
    nome: nomeInput.value,
    email: emailInput.value
  };

  const id = idInput.value;
  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudante)
  });

  form.reset();
  idInput.value = '';
  carregarEstudantes();
});

function editarEstudante(id, nome, email) {
  idInput.value = id;
  nomeInput.value = nome;
  emailInput.value = email;
}

async function excluirEstudante(id) {
  if (confirm('Deseja realmente excluir este estudante?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarEstudantes();
  }
}

carregarEstudantes();
