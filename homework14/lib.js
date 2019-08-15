    
function parseJSON(e) {
    return JSON.parse(e.target.response);
}

function request(method, url) {
    return new Promise(function (res, rej) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true); 
        xhr.addEventListener('load', res);
        xhr.addEventListener('error', rej);
        xhr.send();
    }).then(parseJSON);
}

function drawPagination(total, limit, current) {
    var pagesCount = Math.ceil(total / limit);
    return Array(pagesCount)
    .fill(1)
    .map(function (n, index) {
        var currentPage = index + 1;
        return current && currentPage === current ?
        '<span>' + currentPage + '</span>' : 
        '<a href="" onclick="requestData(event, ' + currentPage + ')">' + currentPage + '</a>'
    }).join(' ');
}