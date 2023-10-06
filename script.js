var button = document.querySelector("#submitbtn"); // Use the correct selector with #
var expenseContainer = document.querySelector("#expenseContainer"); // Use the correct selector with #
var form = document.querySelector(".container"); // Use the correct selector with .

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.querySelector('#category'); // Use the correct selector with #

    const uniqueId = amountInput+categorySelect.options[categorySelect.selectedIndex].text;
    const expenseData = {
        amount: amountInput.value,
        des: descriptionInput.value,
        cat: categorySelect.options[categorySelect.selectedIndex].text,
    };

    localStorage.setItem(uniqueId,JSON.stringify(expenseData));

    const expenseElement = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');

    buttonDelete.textContent = "Delete";
    buttonEdit.textContent = "Edit";
    buttonDelete.className = "btn btn-danger mr-2";
    buttonEdit.className ="btn btn-primary";

    buttonDelete.addEventListener("click", function () {
        expenseElement.remove();
        localStorage.removeItem(uniqueId);
    });
    buttonEdit.addEventListener("click", function(){
        const storedData = JSON.parse(localStorage.getItem(uniqueId));
        amountInput.value = storedData.amount;
        descriptionInput.value = storedData.des;
        categorySelect.options[categorySelect.index] = 2;
        expenseElement.remove();
        localStorage.removeItem(uniqueId);
    });

    

    expenseElement.className = 'list-group-item';
    expenseElement.innerHTML = `
      <div class = "font-weight-normal mb-3">Amount: ${expenseData.amount} &nbsp; Description: ${expenseData.des} &nbsp; Category: ${expenseData.cat}</div>
    `;
    expenseElement.appendChild(buttonDelete);
    expenseElement.appendChild(buttonEdit);
    expenseContainer.appendChild(expenseElement);

    amountInput.value = '';
    descriptionInput.value = '';
    categorySelect.selectedIndex = 0;
});
