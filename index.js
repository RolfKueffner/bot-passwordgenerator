var _ = require('lodash');

var Module = function (bot) {
  this.bot = bot;
  this.name = "Example Library";
  this.version = "0.1";
  this.help = function () {
    // RETURN HELP STRING FOR YOUR COMMANDS or AT LEAST YOUR COMMANDS Object.keys(this.commands)
    return {
      "generatepassword": "Generates 5 random strings with a length of 10 without special characters by default. Usage: 'generatepassword number length optional s' s = special characters",
    };
  };
  this.commands = {};

  this.commands.generatepassword = function(channel, args, user) {
    var splittedText = args.split(" ");
    var possibleInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possibleInputS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!()[]{}.<>@#$%=&/?ß§";
    var passArray = [];
    var response;

    if(!splittedText) {                                                                                             //default
      for (i = 0; i <= 4; i++) {
        var password = "";
        for (j = 1; j <= 10; j++) {
          password += possibleInput.charAt(Math.floor(Math.random() * possibleInput.length));
        }
        passArray[i] = password;
      }
    }
    else if((((splittedText.length) != 2)&&((splittedText.length) != 3)) && (typeof splittedText[0] != "number") && (typeof splittedText[1] != "number")){
      response = "Format einhalten! \n '!generatepassword anzahl länge optionales s'";
    }
    else if(splittedText[2]){
      if(splittedText[2].toUpperCase() === "S"){
        var laenge = splittedText[1];
        var anzahl = splittedText[0];
        for (i = 0; i <= anzahl - 1; i++) {
          var password = "";
          for (j = 1; j <= laenge; j++) {
            password += possibleInputS.charAt(Math.floor(Math.random() * possibleInputS.length));
          }
          passArray[i] = password;
        }
      }
    }
    else {
      var laenge = splittedText[1];
      var anzahl = splittedText[0];
      for (i = 0; i <= anzahl - 1; i++) {
        var password = "";
        for (j = 1; j <= laenge; j++) {
          password += possibleInput.charAt(Math.floor(Math.random() * possibleInput.length));
        }
        passArray[i] = password;
      }
    }
    var passwords;
    for (i = 0; i < passArray.length; i++){
      passwords += "\n " + passArray[i];
    }
    response = passwords;
      bot.postMessage(channel, response);
  };

};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;