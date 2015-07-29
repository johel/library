//Source Code: Pro Javascript Design Patterns
/* BicycleFactory namespace. */

var BicycleFactory = {
  createBicycle: function(model) {
    var bicycle;
    
    switch(model) {
      case 'The Speedster':
        bicycle = new Speedster();
        break;
      case 'The Lowrider':
        bicycle = new Lowrider();
        break;
      case 'The Comfort Cruiser':
      default:
        bicycle = new ComfortCruiser();
    }
    
    Interface.ensureImplements(bicycle, Bicycle);
    return bicycle;
  }
};

/* BicycleShop class, improved. */

var BicycleShop = function() {};
BicycleShop.prototype = {
  sellBicycle: function(model) {
    var bicycle = BicycleFactory.createBicycle(model);
    
    bicycle.assemble();
    bicycle.wash();
    
    return bicycle;
  }
};
