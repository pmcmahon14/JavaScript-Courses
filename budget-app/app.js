//BUDGET CONTROLLER
var budgetController = (function(){

    //some code


})();


//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
       getinput: function() {
           return {
               type: document.querySelector(DOMstrings.inputType).value,  // WILL BE EITHER INCOME OR EXPENSE
               description: document.querySelector(DOMstrings.inputDescription).value,
               value: document.querySelector(DOMstrings.inputValue).value
           };

       },

       getDOMstrings: function() {
           return DOMstrings;
       }
   }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function() {
        //TODO GET INPUT FIELD DATA
        var input = UICtrl.getinput();
        //TODO ADD ITEM TO BUDGET CONTROLLER
        //TODO ADD NEW ITEM TO UI
        //TODO CALCULATE BUDGET
        //TODO DISPLAY BUDGET ON UI
    };

    return {
        init: function() {
            console.log('started');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();