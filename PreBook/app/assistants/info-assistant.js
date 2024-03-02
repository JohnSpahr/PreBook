/*
______        ______             _    
| ___ \       | ___ \           | |   
| |_/ / __ ___| |_/ / ___   ___ | | __
|  __/ '__/ _ \ ___ \/ _ \ / _ \| |/ /
| |  | | |  __/ |_/ / (_) | (_) |   < 
\_|  |_|  \___\____/ \___/ \___/|_|\_\
                                      
                                      
Copyright (c) John Spahr 2019-2021
*/

function InfoAssistant() {

}

InfoAssistant.prototype.setup = function() {
    this.cmdMenuAttributes = {
        menuClass: 'no-fade'
    }
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

    this.controller.setupWidget(Mojo.Menu.commandMenu, this.cmdMenuAttributes, this.commandMenuModel);
};

InfoAssistant.prototype.activate = function(event) {

};

InfoAssistant.prototype.deactivate = function(event) {

};

InfoAssistant.prototype.cleanup = function(event) {

};

InfoAssistant.prototype.handleCommand = function(inEvent) {
    switch (inEvent.command) {
        case "closeScene":
            //close scene
            Mojo.Controller.stageController.popScene();
            break;
    }
};