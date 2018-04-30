(function () {
    var calcApp = angular.module('calcApp');

    calcApp.controller("CalculatorCtrl", CalculatorCtrl);

    function CalculatorCtrl() {
        var self = this;

        self.firstNumber = "";
        self.secondNumber = "";
        self.operator = "";
        self.currentOperation = "";
        self.operationPerformed = "";
        self.showprevop = false;
        self.isEqPrev = false;

        self.updateNumber = function (value) {
            if (self.isEqPrev) {
                self.secondNumber = String(value);
            } else {
                self.secondNumber += String(value);
            }
            self.isEqPrev = false;
        }

        self.updateOperator = function (value) {
            if (self.operator === "" && self.secondNumber !== "") {
                self.operator = String(value);
                self.firstNumber = self.secondNumber;
                self.secondNumber = "";
                self.isEqPrev = false;
            }
        }

        self.clearContent = function (level) {
            if (level === "AC") {
                self.operationPerformed = "";
                self.showprevop = false;
            }
            self.firstNumber = "";
            self.secondNumber = "";
            self.operator = "";
            self.isEqPrev = false;
        };

        self.calculateOutput = function () {
            if (self.secondNumber !== "" && self.operator !== "") {
                self.currentOperation = self.firstNumber;
                self.currentOperation += self.operator;
                self.currentOperation += self.secondNumber;

                self.secondNumber = String(eval(self.currentOperation));

                self.operationPerformed = self.currentOperation;

                self.firstNumber = "";
                self.operator = "";

                self.showprevop = true;
            } else if (self.secondNumber === "" && self.operator === "" && self.firstNumber === "" && self.operationPerformed != "") {
                self.secondNumber = String(eval(self.currentOperation));
                self.showprevop = true;
            }
            self.isEqPrev = true;
        };

        self.updateSign = function () {
            var tmp = self.secondNumber;
            if (tmp !== "" && parseInt(tmp, 10) > 0) {
                self.secondNumber = -Math.abs(parseInt(tmp, 10));
            } else if (tmp !== "" && parseInt(tmp, 10) < 0) {
                self.secondNumber = Math.abs(parseInt(tmp, 10));
            } else if (self.operator !== "" && tmp === "") {
                self.secondNumber += "-";
            }
            self.isEqPrev = false;
        };

        self.backspace = function () {
            var secNo = self.secondNumber;
            if (secNo === "") {
                self.operator = "";
                self.secondNumber = self.firstNumber;
                self.firstNumber = "";
            } else {
                self.secondNumber = secNo.substr(0, secNo.length - 1);
            }
            self.isEqPrev = false;
        };

    };
})();