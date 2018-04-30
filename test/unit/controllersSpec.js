describe('CalculatorCtrl', function(){
  var calc;

  beforeEach(function(){
    calc = new CalculatorCtrl();
  });

  it('should initialize with empty', function(){
    expect(calc.firstNumber).toEqual("");
    expect(calc.operator).toEqual("");
    expect(calc.secondNumber).toEqual("");
    expect(calc.currentOperation).toEqual("");
    expect(calc.operationPerformed).toEqual("");
  });

  it('should process number keys', function(){
    calc.updateNumber(1);
    expect(calc.secondNumber).toEqual('1');
    calc.updateNumber(2);
    expect(calc.display).toEqual('12');
  });

  it('should replace existing number when operation already performed', function() {
    calc.isEqPrev = false;
    calc.secondNumber = '100';
    expect(calc.secondNumber).toEqual('100');
    calc.updateNumber(1);
    expect(calc.secondNumber).toEqual('1');
  });

  it('should update the operator when already a number is entered', function() {
    calc.secondNumber(1);
    calc.operator('+');
    expect(calc.operator).toEqual('+');
    expect(calc.firstNumber).toEqual('1');
  });

  it('should not update the operator when no number is entered', function() {
    calc.operator('+');
    expect(calc.operator).toEqual('');
  });

  it('should delete the previous character when backspace is entered', function() {
    calc.secondNumber = '10';
    calc.backspace();
    expect(calc.secondNumber).toEqual('1');
    calc.firstNumber = '100'
    calc.operator = '/';
    calc.backspace();
    expect(calc.secondNumber).toEqual('100');
  });

  it('should update the sign for the number', function() {
    calc.secondNumber = '10';
    calc.updateSign();
    expect(calc.secondNumber).toBeLessThan(0);
    calc.updateSign();
    expect(calc.secondNumber).toBeGreaterThan(0);
  });

  it('should process the operation and display the output', function() {
    calc.secondNumber = '10';
    calc.operator = '*';
    calc.firstNumber = '10';
    calc.calculateOutput();
    expect(calc.secondNumber).toEqual('100');
    expect(calc.operationPerformed).toEqual('10*10');
  });

});
