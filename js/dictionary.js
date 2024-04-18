function getDefinition() {
    const wordInput = document.getElementById('wordInput').value.trim();
    const definitionOutput = document.getElementById('definitionOutput');

    if (wordInput === '') {
        definitionOutput.innerHTML = '';
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.title === 'No Definitions Found') {
                definitionOutput.innerHTML = `No definitions found for "${wordInput}".`;
            } else {
                let definitions = '<ol>'; 
                data[0].meanings.forEach(meaning => {
                    meaning.definitions.forEach(definition => {
                        definitions += `<li>${definition.definition}</li>`; 
                    });
                });
                definitions += '</ol>';
                definitionOutput.innerHTML = definitions;
            }
        })
        .catch(error => {
            definitionOutput.innerHTML = `An error occurred: ${error}`;
        });
}

document.getElementById('wordInput').addEventListener('input', getDefinition);

getDefinition();