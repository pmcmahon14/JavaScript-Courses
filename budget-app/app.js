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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
       getInput: function() {
           return {
               type: document.querySelector(DOMstrings.inputType).value,  // WILL BE EITHER INCOME OR EXPENSE
               description: document.querySelector(DOMstrings.inputDescription).value,
               value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
           };

       },

        addListItem: function(obj, type) {

           var html, newHtml, element;
           //TODO CREATE HTML STRING WITH PLACEHOLDER TEXT

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right                         clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i                                  class="ion-ios-close-outline"></i></button> </div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right                        clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button                        class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

           //TODO REPLACE PLACEHOLDER TEXT WITH DATA
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

           //TODO INSERT HTML INTO DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
           var fields, fieldsArr;

           fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

           fieldsArr = Array.prototype.slice.call(fields);

           fieldsArr.forEach(function(current, index, array) {
               current.value = "";
           });

           fieldsArr[0].focus();

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

    var updateBudget = function() {

        //TODO CALCULATE BUDGET

        //TODO RETURN BUDGET

        //TODO DISPLAY BUDGET ON UI

    };

    var ctrlAddItem = function() {
        var input, newItem;

        //TODO GET INPUT FIELD DATA
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //TODO ADD ITEM TO BUDGET CONTROLLER
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //TODO ADD NEW ITEM TO UI
            UICtrl.addListItem(newItem, input.type);

            //TODO CLEAR FIELDS
            UICtrl.clearFields();

            //TODO CALCULATE AND UPDATE BUDGET
            updateBudget();

        }
    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();