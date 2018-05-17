//BUDGET CONTROLLER
var budgetController = (function(){

    //VARIABLES FOR CONSTRUCTIOR FUNCTION TO ADD CURRENT ENTRY - EXPENSE OR INCOME
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value/totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
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
        },
        budget: 0,
        percentage: -1

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

        deleteItem: function(type, id) {

            var ids, index;

            //id = 6
            //data.allItems[type][id];
            //ids = [1,2,4,6,8]
            //index = 3

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

                if(index !== -1) {
                    data.allItems[type].splice(index, 1);
                }

        },

        calculateBudget: function() {

            //TODO CALCULATE TOTAL INCOME AND EXPENSES
            calculateTotal('exp');
            calculateTotal('inc');

            //TODO CALCULATE BUDGET: INCOME - EXPENSES
            data.budget = data.totals.inc - data.totals.exp;

            //TODO CALCULATE PERCENTAGE OF INCOME SPENT
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function() {

            /*
            a=20
            b=10
            c=40
            income=100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
             */

            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
    };

    var formatNumber = function(num, type) {
        var numSplit;

        /*
        + or - before number exactly 2 decimal places and comma separating the thousands

        2310.4567 -> 2,310.46
        2000 -> 2,000.00
        */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' +int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right                                   clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i                                         class="ion-ios-close-outline"></i></button> </div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right                                   clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button                               class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

           //TODO REPLACE PLACEHOLDER TEXT WITH DATA
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

           //TODO INSERT HTML INTO DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID) {
           
           var el = document.getElementById(selectorID);
           el.parentNode.removeChild(el);
           
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

        displayBudget: function(obj) {
           var type;
           obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';

            }

        },

        displayPercentages: function(percentages) {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function(current, index)  {

                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };
    

    var updateBudget = function() {

        //TODO CALCULATE BUDGET
        budgetCtrl.calculateBudget();

        //TODO RETURN BUDGET
        var budget = budgetCtrl.getBudget();

        //TODO DISPLAY BUDGET ON UI
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function() {

        //calculate percentages
        budgetCtrl.calculatePercentages();

        //read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();

        //update UI with new percentages
        UICtrl.displayPercentages(percentages);
    };                                             //

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

            //calculate and update percentages
            updatePercentages();

        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {

            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //delete the item from data structure
            budgetCtrl.deleteItem(type, ID);

            //delete item from UI
            UICtrl.deleteListItem(itemID);

            //Update and show new budget
            updateBudget();

            //calculate and update percentages
            updatePercentages();

        }

    };


    return {
        init: function() {
            console.log('Application has started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();