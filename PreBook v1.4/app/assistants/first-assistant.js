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
	
	//sets up browser and buttons
	this.browserAtt = {
		url: "http://mbasic.facebook.com"
	};
	
	this.controller.setupWidget('browser', this.browserAtt, this.model);
	
	this.controller.setupWidget("menuBtn",
		this.attributes = {},
		this.model = {
			label: "Menu",
			disabled: false
		}
	);
	
	//when header is pressed
	this.handleButton1=this.handleButtonPress1.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("homeBtn"), Mojo.Event.tap, this.handleButton1);
	
	//when menu button is pressed
	this.handleMenu1=this.handleMenuPress1.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("menuBtn"), Mojo.Event.tap, this.handleMenu1);
	
	this.appMenuModel = {
		items: [
			{label: "My Profile", command: "myProfile", shortcut: "p"},
			{label: "Messages", command: "myMessages", shortcut: "m"},
			{label: "Notifications", command: "myNotifications", shortcut: "n"},
			{label: "My Groups", command: "myGroups", shortcut: "g"},
			{label: "My Friends", command: "myFriends", shortcut: "f"},
			{label: "Find Friends", command: "findFriends", shortcut: "e"},
			{label: "Pages", command: "pages", shortcut: "c"},
			{label: "Notes", command: "notes", shortcut: "t"},
			{label: "Settings/Privacy", command: "settings", shortcut: "s"},
			{label: "What's New", command: "whatsNew", shortcut: "w"}
		]
	};
	
	this.controller.setupWidget(Mojo.Menu.appMenu, {}, this.appMenuModel);
};


FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.controller.get('MyList'),Mojo.Event.listTap, this.tapHandler);
};

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

FirstAssistant.prototype.handleButtonPress1 = function(event) {
	this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/"); //loads basic version of Facebook
}

FirstAssistant.prototype.handleMenuPress1 = function(event) {
	this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/menu/bookmarks"); //loads full menu
}

FirstAssistant.prototype.handleCommand = function(inEvent) {
 
  switch (inEvent.command) {
 
    case "myProfile":
		this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/me"); //loads your profile
	break;
	
	case "myMessages":
		this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/messages"); //loads your messages
	break;
	
	case "myNotifications":
		this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/notifications"); //loads your notifications
	break;
	
	case "myGroups":
		this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/groups"); //loads your groups
	break;
	
	case "myFriends":
		this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/buddylist"); //loads your friends
	break;
	
	case "findFriends":
		this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/friends/center/suggestions/"); //find friends
	break;
	
	case "whatsNew":
		//Tells the users what's new
		Mojo.Controller.stageController.pushScene("second");
	break;
	
	case "settings":
		this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/settings"); //facebook settings
	break;
	
	case "pages":
		this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/pages"); //facebook pages
	break;
    
	case "notes":
		this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/notes"); //facebook notes
	break;
	
  }
  
};