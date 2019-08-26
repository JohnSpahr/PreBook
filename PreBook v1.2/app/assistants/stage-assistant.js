function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the stage is first created */
	this.controller.setWindowOrientation("free");	
	Mojo.Controller.stageController.pushScene("first");
}

StageAssistant.prototype.handleCommand = function(inEvent) {
 
  switch (inEvent.type) {
 
    case Mojo.Event.commandEnable:
      switch (inEvent.command) {
        case Mojo.Menu.helpCmd:
          inEvent.stopPropagation();
        break;
      }
    break;
    
    case Mojo.Event.command:
      switch (inEvent.command) {
        case Mojo.Menu.helpCmd:     
          this.controller.pushAppSupportInfoScene();
        break;     
      }
    break;
    
  }
  
};
