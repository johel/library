//arquivo 1
var MODULE = (function(module){
    var myPrivateAge = 0;
    var myPrivateHello = function() {
        return "hey, baby!";
    }
    module.growOld = function (increment) {
        myPrivateAge+=increment;
    }
    module.sayAge = function () {
        return myPrivateHello() + "I'm " + myPrivateAge + " years";
    }
    
    return module;
})(MODULE || {});

//arquivo 2 com várias funcionalidades...loose augmenting
var MODULE = (function(module){
    var myPrivateMoney = 100000;
    var myPrivateAccount = function() {
        return "Itau money: ";
    }
    module.spend = function (money) {
        myPrivateMoney-=money;
    }
    module.sayStatus = function () {
        return myPrivateAccount() + myPrivateMoney;
    }
    
    return module;
})(MODULE || {});

//test cases
MODULE.growOld(3);
MODULE.growOld(10);
MODULE.spend(3000);
MODULE.spend(1000);
MODULE.sayAge();
MODULE.sayStatus();
