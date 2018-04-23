//BUDGET CONTROLLER
var budgetController = (function(){

    //some code


})();


//UI CONTROLLER
var UIController = (function() {

   //some code

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        //TODO GET INPUT FIELD DATA
        //TODO ADD ITEM TO BUDGET CONTROLLER
        //TODO ADD NEW ITEM TO UI
        //TODO CALCULATE BUDGET
        //TODO DISPLAY BUDGET ON UI
        console.log('it works');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);