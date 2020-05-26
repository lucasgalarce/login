const SearchPhrases = document.getElementById('SearchPhrases');
const list = document.getElementById('list');

SearchPhrases.addEventListener('keyup', () => {
    let url = "/phrases";
    const xhr = new XMLHttpRequest();
    
    url = "/phrases" + "?keyword=" + SearchPhrases.value;
    console.log(url);

    xhr.addEventListener('load', function () {
        if (this.status == 200) {

            const data = JSON.parse(this.responseText);
            // Limpio la lista
            list.innerHTML = "";
            // Recorro el array de frases
            data.forEach(phrase => {
                console.log(phrase)

                const newLi = document.createElement('li');
                newLi.textContent = phrase;

                list.appendChild(newLi);
            });
        }
    });

    xhr.open("GET", url);
    xhr.send();

});