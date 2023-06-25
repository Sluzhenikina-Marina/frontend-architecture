// BEGIN
export default (arrayOfLaptops) => {

    const makeArrayOfFilteredLaptops = () => {
        const parameters = {
            processor: document.querySelector('[name="processor_eq"]').value,
            memory: document.querySelector('[name="memory_eq"]').value,
            freqGTE: document.querySelector('[name="frequency_gte"]').value,
            freqLTE: document.querySelector('[name="frequency_lte"]').value,
        }

        const filteredLaptops = [];

        for (let i of arrayOfLaptops) {
            if (
                (i.processor === parameters.processor || parameters.processor === '') &&
                (i.memory === +parameters.memory || parameters.memory === '') &&
                (i.frequency >= +parameters.freqGTE || parameters.freqGTE === '') &&
                (i.frequency <= +parameters.freqLTE || parameters.freqLTE === '')
            ) {
                filteredLaptops.push(i);
            }
        }

        renderLaptops(filteredLaptops);
    }

    const renderLaptops = (laptops) => {

        const resultList = document.querySelector('.result');
        resultList.innerHTML = '';
        if (laptops.length === 0) return;
        const listOfLaptops = document.createElement('ul');
        listOfLaptops.className = 'list-group';

        for (let laptop of laptops) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = laptop.model;
            listOfLaptops.append(li);
        }

        resultList.appendChild(listOfLaptops);
    }

    renderLaptops(arrayOfLaptops);

    document.querySelector('form').addEventListener('input', () => {
        makeArrayOfFilteredLaptops();
    })
}
// END