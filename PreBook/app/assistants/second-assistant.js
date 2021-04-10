/*
______        ______             _    
| ___ \       | ___ \           | |   
| |_/ / __ ___| |_/ / ___   ___ | | __
|  __/ '__/ _ \ ___ \/ _ \ / _ \| |/ /
| |  | | |  __/ |_/ / (_) | (_) |   < 
\_|  |_|  \___\____/ \___/ \___/|_|\_\
                                      
                                      
Copyright (c) John Spahr 2019-2021
*/

function SecondAssistant() {

}

SecondAssistant.prototype.setup = function() {
    this.commandMenuModel = {
        items: [{
                items: []
            },
            {
                items: [
                    { label: $L('Close'), command: "closeScene" }
                ]
            },
            {
                items: []
            }
        ]
    };

    this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.commandMenuModel);
};

SecondAssistant.prototype.activate = function(event) {

};

SecondAssistant.prototype.deactivate = function(event) {

};

SecondAssistant.prototype.cleanup = function(event) {

};

SecondAssistant.prototype.handleCommand = function(inEvent) {
    switch (inEvent.command) {
        case "closeScene":
            //close scene
            Mojo.Controller.stageController.popScene();
            break;
    }
};