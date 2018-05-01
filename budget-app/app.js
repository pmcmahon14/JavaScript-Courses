//BUDGET CONTROLLER
var budgetController = (function(){

    //VARIABLES FOR CONSTRUCTIOR FUNCTION TO ADD CURRENT ENTRY - EXPENSE OR INCOME
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //STORE ENTRIES INTO ARRAY BY USING OBJECTS
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    //CONSTRUCTOR TO DETERMINE NEW ITEMS
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //CREATE NEW ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //CREATE NEW ITEM BASED ON EXP OR INC TYPE
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type ==="inc") {
                newItem = new Income(ID, des, val);
            }

            //PUSH INTO DATA STRUCTURE
            data.allItems[type].push(newItem);

            //RETURN NEW ELEMENT
            return newItem;

        },

        testing: function() {
            console.log(data);
        }
    }

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
       getInput: function() {
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
        var input, newItem;

        //TODO GET INPUT FIELD DATA
        input = UICtrl.getInput();
        //TODO ADD ITEM TO BUDGET CONTROLLER
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //TODO ADD NEW ITEM TO UI
        //TODO CALCULATE BUDGET
        //TODO DISPLAY BUDGET ON UI
    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();