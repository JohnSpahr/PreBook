function FirstAssistant() {

}

FirstAssistant.prototype.setup = function() {
    this.browserAtt = {
        url: "http://mbasic.facebook.com",
        minFontSize: 16
    };

    //initialize browser
    this.controller.setupWidget('browser', this.browserAtt, this.model);

    this.commandMenuModel = {
        items: [{
                items: [
                    { label: $L('Back'), icon: "back", command: "goBack" },
                    { label: $L('Forward'), icon: "forward", command: "goForward" }
                ]
            },
            {
                items: [
                    { items: [{ iconPath: "images/refresh.png", command: "refreshPage" }] },
                    { items: [{ iconPath: "images/messages.png", command: "myMessages" }] },
                    { items: [{ iconPath: "images/notifications.png", command: "myNotifications" }] }
                ]
            }
        ]
    };

    this.menuAttr = {
        omitDefaultItems: true
    };

    this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.commandMenuModel);

    //loadingSpinner
    this.controller.setupWidget("loadingSpinner",
        this.attributes = {
            spinnerSize: "large"
        },
        this.model = {
            spinning: false,
            visible: false
        }
    );

    //when header is pressed
    this.handleHeader = this.handleHeaderPress.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("homeBtn"), Mojo.Event.tap, this.handleHeader);

    //when loading starts
    this.loadStartHandler = this.handleStartLoading.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStarted, this.loadStartHandler);

    //when loading ends
    this.loadStopHandler = this.handleStopLoading.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStopped, this.loadStopHandler);

    this.appMenuModel = {
        items: [
            { label: "Facebook" },
            { label: "Home", command: "goHome", shortcut: "h" },
            { label: "Selected Text" },
            Mojo.Menu.editItem,
            { label: "My Account" },
            { label: "Profile", command: "myProfile", shortcut: "p" },
            { label: "Groups", command: "myGroups", shortcut: "g" },
            { label: "Friends", command: "myFriends", shortcut: "f" },
            { label: "Messages", command: "myMessages", shortcut: "m" },
            { label: "Pages", command: "pages", shortcut: "s" },
            { label: "Notifications", command: "myNotifications", shortcut: "n" },
            { label: "Discover" },
            { label: "Find Friends", command: "findFriends", shortcut: "e" },
            { label: "COVID-19 Updates", command: "covidUpdate", shortcut: "r" },
            { label: "Other" },
            { label: "Pokes", command: "pokes" },
            { label: "Notes", command: "notes", shortcut: "t" },
            { label: "Settings/Privacy", command: "settings" },
            { label: "App Info" },
            { label: "Change Log", command: "whatsNew" },
            Mojo.Menu.helpItem
        ]
    };

    this.controller.setupWidget(Mojo.Menu.appMenu, this.menuAttr, this.appMenuModel); //set up app menu
};


FirstAssistant.prototype.activate = function(event) {};

FirstAssistant.prototype.deactivate = function(event) {
    Mojo.Event.stopListening(this.controller.get('MyList'), Mojo.Event.listTap, this.tapHandler);
};

FirstAssistant.prototype.cleanup = function(event) {

};

FirstAssistant.prototype.handleHeaderPress = function(event) {
    this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/"); //loads basic version of Facebook
};

FirstAssistant.prototype.handleStartLoading = function(event) {
    //show loading spinner
    this.controller.window.PalmSystem.setWindowOrientation("up");
    this.controller.get('loadingSpinner').visible = true;
    this.controller.get('loadingSpinner').mojo.start();
};

FirstAssistant.prototype.handleStopLoading = function(event) {
    //hide loading spinner
    this.controller.window.PalmSystem.setWindowOrientation("free");
    this.controller.get('loadingSpinner').visible = false;
    this.controller.get('loadingSpinner').mojo.stop();
};

FirstAssistant.prototype.handleCommand = function(inEvent) {

    switch (inEvent.command) {

        case "goHome":
            this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com"); //go home
            break;

        case "goBack":
            this.controller.get('browser').mojo.goBack(); //go back
            break;

        case "goForward":
            this.controller.get('browser').mojo.goForward(); //go forward
            break;

        case "refreshPage":
            this.controller.get('browser').mojo.reloadPage(); //reload page
            break;

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

        case "pokes":
            this.controller.get('browser').mojo.openURL("http://mbasic.facebook.com/pokes"); //pokes
            break;

        case "findFriends":
            this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/friends/center/suggestions/"); //find friends
            break;

        case "whatsNew":
            Mojo.Controller.stageController.pushScene("second"); //change log
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
        case "covidUpdate":
            this.controller.get('browser').mojo.openURL("https://mbasic.facebook.com/coronavirus_info"); //COVID-19 Updates
            break;
    }
};