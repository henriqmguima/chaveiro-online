# Chaveiro Online

## Descrição

O **Chaveiro Online** é um sistema digital desenvolvido para controle e registro da posse das chaves das salas do IFSUL Charqueadas. Seu principal objetivo é substituir o atual processo manual, que é feito em papel, por uma solução acessível, eficiente e segura.

O sistema permite que professores, alunos e administradores consultem em tempo real quem está com determinada chave, registrem horários de retirada e devolução, e gerenciem usuários e salas de forma simples e intuitiva.

## Funcionalidades

- Cadastro de usuários (alunos e servidores) com informações personalizadas (matrícula ou função).
- Registro de retirada e devolução de chaves, com validação via senha (padrão 1234).
- Consulta em tempo real para saber quem está com cada chave ou qual sala está com determinado usuário.
- Visualização e filtro dos registros diários.
- Interface web responsiva e amigável, adaptada para desktop e dispositivos móveis.
- Exportação dos registros em CSV para análise externa.
- Sistema com controle de acesso básico via perfis.
- Uso de API mock para armazenamento e simulação dos dados.

## Tecnologias Utilizadas

- HTML, CSS e JavaScript para o front-end.
- API Mock (MockAPI) para backend simulado.
- Font Awesome para ícones.
- Design responsivo seguindo boas práticas de UX/UI.

## Estrutura do Projeto

- **index.html** – Tela administrativa para gerenciamento de usuários, chaves e visualização dos registros.
- **consulta.html** – Tela pública para consulta das chaves e usuários.
- **assets/css/style.css** e **assets/css/consulta.css** – Estilos para todas as páginas.
- **assets/js/script.js** e **assets/js/consulta.js**– Script para funcionalidade, chamadas à API mock e manipulação da interface.

## Como Usar - 

1. Abra o arquivo `index.html` ou acesse o link `https://henriqmguima.github.io/chaveiro-online/` para acessar o painel do administrador.
2. Cadastre usuários (alunos ou servidores).
3. Registre a retirada ou devolução das chaves.
4. Use o filtro de data para consultar registros específicos.
5. Navegue para a tela de consulta pública para verificar chaves e usuários.

## Limitações

- Sistema ainda em protótipo visual e funcional, sem autenticação real.
- Senha padrão fixa (1234) para operações de chave.
- API mock gratuita utilizada, com limitações de armazenamento e desempenho.
- Não há integração com sistemas externos da instituição.

