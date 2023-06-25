// BEGIN
export default (listOfCompanies) => {
    const collapseContainer = document.querySelector('.container');

    console.log(listOfCompanies);

    const buttons = listOfCompanies.map(company => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.textContent = company.name;
        collapseContainer.appendChild(button);

        button.addEventListener('click', () => {
            const description = collapseContainer.querySelector('div');
            if (description) {
                if (description.textContent != company.description) {
                    description.textContent = company.description;
                } else {
                    description.remove();
                }
            } else {
                const newDescription = document.createElement('div');
                newDescription.textContent = company.description;
                collapseContainer.append(newDescription);
            }

        })
    })
}
// END