function SecondAssistant() {

}

SecondAssistant.prototype.setup = function() {
    this.model = {
        buttonLabel: "Close"
    };
    this.controller.setupWidget('closeBtn', {}, this.model);

    //add a listener for closeBtn
    Mojo.Event.listen(this.controller.get("closeBtn"), Mojo.Event.tap, this.handleCloseTap.bind(this));
};

SecondAssistant.prototype.handleCloseTap = function(event) {
    //close scene
    Mojo.Controller.stageController.popScene();
};

SecondAssistant.prototype.activate = function(event) {

};

SecondAssistant.prototype.deactivate = function(event) {

};

SecondAssistant.prototype.cleanup = function(event) {

};