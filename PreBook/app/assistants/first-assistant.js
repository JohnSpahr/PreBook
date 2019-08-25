function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	
	//sets up browser and profile button
	this.browserAtt = {
		url: "http://mbasic.facebook.com"
	};
	
	this.controller.setupWidget('browser', this.browserAtt, this.model);
	
	this.controller.setupWidget("profileBtn",
		this.attributes = {},
		this.model = {
			label: "My Profile",
			disabled: false
		}
	);
	
	//when header is pressed
	this.handleButton1=this.handleButtonPress1.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("homeBtn"), Mojo.Event.tap, this.handleButton1);
	
	//when profile button is pressed
	this.handleChat1=this.handleChatPress1.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("profileBtn"), Mojo.Event.tap, this.handleChat1);
};

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

FirstAssistant.prototype.handleButtonPress1 = function(event) {
	this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/"); //loads basic version of Facebook
}

FirstAssistant.prototype.handleChatPress1 = function(event) {
	this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/me"); //loads your profile
}