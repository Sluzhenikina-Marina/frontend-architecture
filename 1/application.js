// BEGIN
export default () => {
    let plusButton = document.querySelector('[type="submit"]');
    let summa = 0;
    let numberInput = document.querySelector('[type="number"]')
    numberInput.focus();
    plusButton.addEventListener('click', (event) => {
        let number = numberInput.value;
        event.preventDefault();
        summa = summa + Number(number);
        document.getElementById('result').innerHTML = summa;

        numberInput.value = '';
        numberInput.focus();
    })

    let resetButon = document.querySelector('[type="button"]');
    resetButon.addEventListener('click', (event) => {
        event.preventDefault();
        numberInput.value = '';
        summa = 0;
        document.getElementById('result').innerHTML = summa;
        numberInput.focus();
    })
}
// END