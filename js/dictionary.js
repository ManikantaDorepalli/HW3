const wordInput = document.getElementById('wordInput');
const definitionOutput = document.getElementById('definitionOutput');

wordInput.addEventListener('input', fetchDefinitions);

async function fetchDefinitions() {
    const word = wordInput.value.trim();
    if (word === '') {
        definitionOutput.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderDefinitions(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        definitionOutput.innerHTML = '<li>Error fetching data. Please try again later.</li>';
    }
}

function renderDefinitions(data) {
    definitionOutput.innerHTML = data.map(entry => {
        return entry.meanings.map(meaning => {
            return meaning.definitions.map(def => {
                return `<li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li>`;
            }).join('');
        }).join('');
    }).join('');
}