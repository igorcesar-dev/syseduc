// Inicializando;
function iniciar() {
    var containerAlunos = document.getElementById('alunos');
    alunos.map((valor) => {
        containerAlunos.innerHTML += `

        <div class="box-aluno">
            <div class="box-aluno-left">
                <h1 class="matricula-aluno"> Matricula: `+ valor.matricula + `</h1>
                <h1 class="nome-aluno">Nome completo: `+ valor.nome + ` </h1>
            </div>
            <div class="box-buttons">
                <button class="btn-info">Exibir mais informações</button>
                
                <button class="btn-excluir"><img src="assets/img/delete.png" alt="logo-trash"></button>

                <button class="btn-editar"><img src="assets/img/edit.png" alt="logo-trash"></button>
            </div>
        </div>`;
    })
}
iniciar();

// Procura o aluno;
function procurarAluno() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let item = document.getElementsByClassName('nome-aluno');
    let aluno = document.getElementsByClassName('box-aluno');

    for (i = 0; i < item.length; i++) {
        if(!item[i].innerHTML.toLowerCase().includes(input)) {
            aluno[i].style.display = "none";
        } else {
            aluno[i].style.display = "inline-block"
        }
    }
}


// MODAL DO BOTAO EXCLUIR
const btn = document.querySelector(".btn-excluir");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");


/* Abre o modal excluir */
btn.addEventListener("click", function () {
    modal.classList.add("open-modal");
})


/* Fecha o modal */
closeBtn.addEventListener("click", function () {
    modal.classList.remove("open-modal");
})

// MODAL DO BOTAO EDITAR
const btnEdit = document.querySelector(".btn-editar");
const modalEdit = document.querySelector(".modal-editar");
const closeButton = document.querySelector(".close-button");

/* Abre o modal editar*/
btnEdit.addEventListener("click", function () {
    modalEdit.classList.add("open-modal");
})

/* Fecha o modal EDITAR*/
closeButton.addEventListener("click", function () {
    modalEdit.classList.remove("open-modal");
})

// MODAL DO BOTAO CADASTRAR
const btnCadastrar = document.querySelector(".btn-cadastrar");
const modalCadastrar = document.querySelector(".modal-cadastrar");
const closeButtonCad = document.querySelector(".close-button-cad");

btnCadastrar.addEventListener("click", function () {
    modalCadastrar.classList.add("open-modal");
})

closeButtonCad.addEventListener("click", function () {
    modalCadastrar.classList.remove("open-modal");
})
