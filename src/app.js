
// const imdImage = reqire('./assets/images/mws-profile.png');

import 'bootstrap';

const path = window.location.pathname;

let usuario = document.getElementById('usuario');
let btn = document.getElementById('btn-search');
let btnRepos = document.getElementById('btn-repos');
let renderInfo = document.getElementById('info');
let renderRepos = document.getElementById('repos');

let consultaDados = (login) => {
    const URL = `https://api.github.com/users/${login}`
    const request = fetch(URL);

    const response = request.then(data => data.json())
        .then(data => {
            return createSectionInfo(data);
        });
    return response;
}

let createSectionInfo = (data) => {
    const { login, avatar_url, followers, following, email, bio } = data;
    return `
    <table class="table">
    <thead>
        <tr>
            <th>Usuário</th>
            <th>Seguidores</td>
            <th>Seguindo</td>
            <th>email</td>
            <th>bio</td>
            <th>avatar</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/${login}">${login}</a></td>
            <td>${followers}</td>
            <td>${following}</td>
            <td>${email}</td>
            <td>${bio}</td>
            <td><img src="${avatar_url}" alt="avatar"></td>
            <td><button class="button" id="btn-repos">Repos</button></td>
        </tr>
    </tbody>
    </table>`;
}

let consultaRepos = (login) => {
    const URL = `https://api.github.com/users/${login}/repos`
    const request = fetch(URL);

    const response = request.then(data => data.json())
        .then(data => {
            return createSectionRepos(data);
        });
    return response;
}

let createItemRepo = (repo) => {
    const { owner, name, full_name, description } = repo;
    return `
    <tr>
        <td>${full_name}</td>
        <td>${description}</td>
    </tr>`;
}

let createSectionRepos = (repos) => {
    return `<table class="table">
    <thead>
        <tr>
            <th>Nome completo</td>
            <th>Descrição</td>
        </tr>
    </thead>
    <tbody>
        ${repos.map(repo => createItemRepo(repo))}
    </tbody>
    </table>`;
}

if (path === '/') {
    const main = document.getElementById('app');

    // main.innerHTML += 'Howdy. You\'re on the HOME page. <a href="/about">Click here</a> to view the about page.';
    main.innerHTML += `
    <div class="container">
        <h1 class="title">Consulta usuário no github</h1>
        <form action="" class="field">
        <label for="" class="label">Usuário:</label>
        <input type="text" name="usuario" id="usuario" class="input" placeholder="Digite o usuário...">
        <button class="button is-success" id="btn-search">Pesquisar...</button>
        </form>
        <section id="info"></section>
        <section id="repos"></section>
    </div>
    `;

    usuario = document.getElementById('usuario');
    btn = document.getElementById('btn-search');
    renderInfo = document.getElementById('info');

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const login = usuario.value;
        consultaDados(login).then(response => {
            renderInfo.innerHTML = response;
            //prepare repos list
            btnRepos = document.getElementById('btn-repos');
            renderRepos = document.getElementById('repos');
    
            btnRepos.addEventListener('click', (e) => {
                e.preventDefault()
                const login = usuario.value;
                consultaRepos(login).then(response => {
                    renderRepos.innerHTML = response;
                });
                ;
            });
        });

    });
}

if (path === '/user/') {
    const pathName = window.location.pathname.split('/');
    console.log('pathName' + pathName);
    const main = document.getElementById('app');

    main.innerHTML += 'Howdy. You\'re on the ABOUT page. <a href="/">Click here</a> to view the home page.';
}



