var divBody = document.createElement('div');
divBody.className = 'page-body';
document.body.appendChild(divBody);

var ul = document.createElement('ul');
ul.className = 'hero-list';
divBody.appendChild(ul);

var pag = document.createElement('div');
pag.className = 'pagination';
divBody.appendChild(pag);

function requestData(e, page) {
    ul.innerHTML = '';
    request('get', 'https://swapi.co/api/people/?page=' + page)
        .then(function (data) {
            var results = data.results;
            for (var i = 0; i < results.length; i++) {
                var li = document.createElement('li');
                li.className = 'hero-list__item';

                var name = document.createElement('span');
                name.textContent = 'Name: ' + results[i].name;

                var height = document.createElement('span');
                height.textContent = 'Height: ' + results[i].height;

                var mass = document.createElement('span');
                mass.textContent = 'Mass: ' + results[i].mass;

                var gender = document.createElement('span');
                gender.textContent = 'Gender: ' + results[i].gender;

                var hair_color = document.createElement('span');
                hair_color.textContent = 'Hair color: ' + results[i].hair_color;

                var birth_year = document.createElement('span');
                birth_year.textContent = 'Birth year: ' + results[i].birth_year;

                ul.appendChild(li);
                li.appendChild(name);
                li.appendChild(height);
                li.appendChild(mass);
                li.appendChild(gender);
                li.appendChild(hair_color);
                li.appendChild(birth_year);
            }
            pag.innerHTML = drawPagination(data.count, 10, page);
        })
    e && e.preventDefault();
}

requestData(null, 1);