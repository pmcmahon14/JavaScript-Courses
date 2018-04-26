//BUDGET CONTROLLER
var budgetController = (function(){

    //some code


})();


//UI CONTROLLER
var UIController = (function() {

    return {
       getinput: function() {
           return {
               type: document.querySelector('.add__type').value,  // WILL BE EITHER INCOME OR EXPENSE
               description: document.querySelector('.add__description').value,
               value: document.querySelector('.add__value').value
           };

       }
   };

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        //TODO GET INPUT FIELD DATA
        var input = UICtrl.getinput();
        console.log(input)
        //TODO ADD ITEM TO BUDGET CONTROLLER
        //TODO ADD NEW ITEM TO UI
        //TODO CALCULATE BUDGET
        //TODO DISPLAY BUDGET ON UI
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);