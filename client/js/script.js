const SearchPhrases = document.getElementById('SearchPhrases');
const list = document.getElementById('list');

SearchPhrases.addEventListener('keyup', () => {
    let url = "/phrases";
    const xhr = new XMLHttpRequest();

    url = "/phrases" + "?keyword=" + SearchPhrases.value;

    xhr.addEventListener('load', function () {
        if (this.status == 200) {

            const data = JSON.parse(this.responseText);
            // Limpio la lista
            list.innerHTML = "";
            // Recorro el array de frases
            data.forEach(phrase => {
                // A la frase le saco los "input" que coincidan para agregarlos despues
                let arr = phrase.split(SearchPhrases.value);

                // Si el input esta vacio, limpio la lista
                if (SearchPhrases.value === "") {
                    list.innerHTML = "";
                }
                else {
                    const newLi = document.createElement('li');
                    // Agrego el input sacado previamente agregandole la etiqueta strong
                    newLi.innerHTML = arr.join(`<strong>${SearchPhrases.value}</strong>`)

                    // Agrego el evento click al li
                    newLi.addEventListener('click', function () {
                        // Le saco la etiqueta strong y lo pongo en el input value
                        let newValue = newLi.innerHTML.split(`<strong>`).join("");
                        SearchPhrases.value = newValue.split(`</strong>`).join("");

                        // Limpio la lista de li y dejo el li clickeado
                        list.innerHTML = `<strong> ${this.innerHTML} </strong>`;
                    });

                    list.appendChild(newLi);
                }
            });
        }
    });

    xhr.open("GET", url);
    xhr.send();

});