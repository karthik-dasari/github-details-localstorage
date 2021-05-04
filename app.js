const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let usernameInput = document.getElementById('usernameInput');

    let gitHubUsername = usernameInput.value;
    
    requestUserDetails(gitHubUsername);
    requestUserRepos(gitHubUsername);

    localStorage.setItem(gitHubUsername,gitHubUsername);

    updatedhistory();

})

function requestUserDetails(username) {

    const xhr1 = new XMLHttpRequest();

    const url = `https://api.github.com/users/${username}`;

    xhr1.open('GET', url, true);

    xhr1.onload = function() {

        const data = JSON.parse(this.response);
        let root = document.getElementById('user');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message != "Not Found") {
            
            let ul = document.getElementById('user');
            let p1 = document.createElement('p');
            p1.innerHTML = (`<p><strong>User name:</strong>${data.login}</p>`)
            ul.appendChild(p1);
            let p2 = document.createElement('p');
            p2.innerHTML = (`<p><strong>Profile pic:</strong><img src="${data.avatar_url}" alt=""></p>`)
            ul.appendChild(p2);
            let p3 = document.createElement('p');
            p3.innerHTML = (`<p><strong>Name:</strong>${data.name}</p>`)
            ul.appendChild(p3);
            let p4 = document.createElement('p');
            p4.innerHTML = (`<p><strong>Bio:</strong>${data.bio}</p>`)
            ul.appendChild(p4);
            let p5= document.createElement('p');
            p5.innerHTML = (`<p><strong>Lasted updated:</strong>${data.updated_at}</p>`)
            ul.appendChild(p5);
            let p6 = document.createElement('p');
            p6.innerHTML = (`<p><strong>Number of followers:</strong>${data.followers}</p>`)
            ul.appendChild(p6);
            let p7 = document.createElement('p');
            p7.innerHTML = (`<p><strong>Number of following:</strong>${data.following}</p>`)
            ul.appendChild(p7);
        }
    }
    xhr1.send();

}


function requestUserRepos(username) {

    const xhr2 = new XMLHttpRequest();

    const url = `https://api.github.com/users/${username}/repos`;

    xhr2.open('GET', url, true);

    xhr2.onload = function() {

        const data = JSON.parse(this.response);
        let root = document.getElementById('userRepos');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');
            let li = document.createElement('li');

            li.classList.add('list-group-item')
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
            ul.appendChild(li);
        } else {

            let ul = document.getElementById('userRepos');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>Number of Public Repos:${data.length}</p>`)
            ul.appendChild(p);
            for (let i in data) {
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>Created at:</strong> ${data[i].created_at}</p>
                <p><strong>Branch:</strong> ${data[i].default_branch}</p>
                <p><strong>stars:</strong> ${data[i].stargazers_count}</p>
                <p><strong>Number of forks:</strong> ${data[i].forks_count}</p>
                <p><strong>language used:</strong> ${data[i].language}</p>
                <p><strong>Number of watchers:</strong> ${data[i].watchers_count}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);
                ul.appendChild(li);

            }

        }
    }
    xhr2.send();

}

function updatedhistory(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "", true);

    xhr.onload = function() {
        let root = document.getElementById('updatedhistory');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        let ul = document.getElementById('updatedhistory');

        for(let i=0;i<localStorage.length;i++)
        {
            let key = localStorage.key(i);
            let value=localStorage.getItem(key);
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.id=key+"li";
            li.innerHTML= (`<button type="button" id="${key}" onclick ="return liClick(this);" class="btn btn-light">${value}</button>`);
            ul.appendChild(li);
        }
    }
    xhr.send();
}

const xhr1 = new XMLHttpRequest();

xhr1.open('GET', "", true);

xhr1.onload = function() {
    let root = document.getElementById('updatedhistory');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    let ul = document.getElementById('updatedhistory');

    for(let i=0;i<localStorage.length;i++)
    {
        let key = localStorage.key(i);
        let value=localStorage.getItem(key);
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.id=key+"li";
        li.innerHTML= (`<button type="button" id="${key}" onclick ="return liClick(this);" class="btn btn-light">${value}</button>`);
        ul.appendChild(li);
    }
}
xhr1.send();

function liClick(obj) {
    let idli=$(obj).attr('id');
    if(confirm('Are you sure to remove? '+idli))
    {
        localStorage.removeItem(idli);

        const xhr1 = new XMLHttpRequest();

        xhr1.open('GET', "", true);

        xhr1.onload = function() {
            let root = document.getElementById('updatedhistory');
            while (root.firstChild) {
                root.removeChild(root.firstChild);
            }
            let ul = document.getElementById('updatedhistory');

            for(let i=0;i<localStorage.length;i++)
            {
                let key = localStorage.key(i);
                let value=localStorage.getItem(key);
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.id=key+"li";
                li.innerHTML= (`<button type="button" id="${key}" onclick ="return liClick(this);" class="btn btn-light">${value}</button>`);
                ul.appendChild(li);
            }
        }
        xhr1.send();
    }
    

}