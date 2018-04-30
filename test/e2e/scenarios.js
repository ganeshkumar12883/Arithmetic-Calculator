describe('calculator', function(){
  beforeEach(function(){
    browser().navigateTo('../../app/index.html');
  });

  it('should initialize with empty', function(){
    expect(binding('secondNumber')).toEqual('');
  });

  it('should check number keys and decimal', function(){
    press(0);
    press(9);
    press(8);
    press(7);
    press(6);
    press(5);
    press(4);
    press(3);
    press(2);
    press(1);
    press(0);
    press('.');
    press(0);
    press(1);
    expect(binding('secondNumber')).toEqual('9876543210.01');
  });

  it('should clear display', function(){
    press(1);
    press('C');
    expect(binding('secondNumber')).toEqual('');
  });

  it('should clear display and memory', function(){
    press(1);
    press('AC');
    expect(binding('secondNumber')).toEqual('');
  });

  it('should make the number positive or negative', function(){
    press(1);
    press('+/-');
    expect(binding('secondNumber')).toBeLessThan(0);
    press('+/-');
    expect(binding('secondNumber')).toBeGreaterThan(0);
  });

});

angular.scenario.dsl('press', function(){
  return function(key){
    return element(':button:contains('+key+')').click();
  };
});
