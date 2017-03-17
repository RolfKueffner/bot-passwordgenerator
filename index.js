var package = require('./package.json');
var _ = require('lodash');

var Module = function (bot) {
  this.bot = bot;
  this.name = package.name;
  this.version = package.version;
  // add channel names as trings to only allow certain channels
  this.allowedChannels = [];
  this.help = function () {
    // RETURN HELP STRING FOR YOUR COMMANDS or AT LEAST YOUR COMMANDS Object.keys(this.commands)
    // For basic help add them to the package
    // This funciton can be used to generate a dynamic help, it is called at !help
    return package.commands;
  };
  this.commands = {};

  this.commands.generatepassword = function(channel, args, user) {

    var splittedText = args.split(" ");
    var possibleInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possibleInputS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!()[]{}.<>@#$%=&/?ß§";
    var passArray = [];
    var response;
    var length = 10;
    var anzahl = 5;

    if(typeof splittedText[0] == "number"){
      anzahl = splittedText[0];
    }
    if (typeof splittedText[1] == "number"){
      length = splittedText[1];
    }
    if (splittedText[2] && splittedText[2].toUpperCase() === "S"){
      for (i = 0; i <= anzahl - 1; i++) {
        var password = "";
        for (j = 1; j <= length; j++) {
          password += possibleInputS.charAt(Math.floor(Math.random() * possibleInputS.length));
        }
        passArray[i] = password;
      }
    }
    else{
      for (i = 0; i <= anzahl - 1; i++) {
        var password = "";
        for (j = 1; j <= length; j++) {
          password += possibleInput.charAt(Math.floor(Math.random() * possibleInput.length));
        }
        passArray[i] = password;
      }
    }
    var passwords = "";
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