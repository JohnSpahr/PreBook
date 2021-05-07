/*
______        ______             _    
| ___ \       | ___ \           | |   
| |_/ / __ ___| |_/ / ___   ___ | | __
|  __/ '__/ _ \ ___ \/ _ \ / _ \| |/ /
| |  | | |  __/ |_/ / (_) | (_) |   < 
\_|  |_|  \___\____/ \___/ \___/|_|\_\
                                      
                                      
Copyright (c) John Spahr 2019-2021
*/

function FirstAssistant() {
    this.updateCheckDone = false;
    this.baseURL = "http://mbasic.facebook.com";    //used everywhere, so setup a variable
}

FirstAssistant.prototype.setup = function() {
    this.updaterModel = new UpdaterModel();

    //check if first run
    var currVersion = Mojo.Controller.appInfo.version;
    var firstRun = new Mojo.Model.Cookie("firstRun" + currVersion);
    if (firstRun.get() == undefined) {
        //if first run, show version info
        firstRun.put(false);
        Mojo.Controller.stageController.pushScene("second");
    }

    this.browserAtt = {
        url: this.baseURL,
        cacheAdapter: true,
        setEnableJavaScript: true,
        setShowClickedLink: true,
        setBlockPopups: true,
        setAcceptCookies: true,
        minFontSize: 16
    };

    //initialize browser
    this.controller.setupWidget('browser', this.browserAtt, this.model);

    //initialize view (top) menu
    this.viewMenuModel = {
        items: [{
                items: [
                    { label: $L('Back'), icon: "back", command: "goBack" },
                    { label: $L('Home'), width: 200, command: "goHome" },
                    { label: $L('Forward'), icon: "forward", command: "goForward" }
                ]
            }
        ]
    };
    this.controller.setupWidget(Mojo.Menu.viewMenu, {}, this.viewMenuModel);

    //initialize command menu
    this.cmdMenuAttributes = {
        menuClass: 'no-fade'
    }
    this.commandMenuModel = {
        items: [{
            },
            {
                items: [
                    { items: [{ iconPath: "images/refresh.png", command: "refreshPage" }] },
                    { items: [{ iconPath: "images/messages.png", command: "myMessages" }] },
                    { items: [{ iconPath: "images/notifications.png", command: "myNotifications" }] }
                ]
            }, {
            
            }
        ]
    };
    this.controller.setupWidget(Mojo.Menu.commandMenu, this.cmdMenuAttributes, this.commandMenuModel);

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

    //setup app menu
    this.menuAttr = {
        omitDefaultItems: true
    };

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
            { label: "Version Info", command: "whatsNew" },
            Mojo.Menu.helpItem
        ]
    };
    this.controller.setupWidget(Mojo.Menu.appMenu, this.menuAttr, this.appMenuModel); //set up app menu

    //when loading starts
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStarted, this.handleStartLoading.bind(this));

    //when loading ends
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStopped, this.handleStopLoading.bind(this));
};

FirstAssistant.prototype.activate = function(event) {
    this.updateCheckDone = true;
    this.updaterModel.CheckForUpdate("PreBook", function(responseObj) {
        if (responseObj && responseObj.updateFound) {
            this.updaterModel.PromptUserForUpdate(function(response) {
                if (response)
                    this.updaterModel.InstallUpdate();
            }.bind(this));
        }
    }.bind(this));
};

FirstAssistant.prototype.deactivate = function(event) {
    Mojo.Event.stopListening(this.controller.get('MyList'), Mojo.Event.listTap, this.tapHandler);
};

FirstAssistant.prototype.cleanup = function(event) {

};

FirstAssistant.prototype.handleHeaderPress = function(event) {
    this.controller.showAlertDialog({
        onChoose: function(value) {
            if (value == "yes") {
                this.controller.get('browser').mojo.openURL(this.baseURL); //go home
            }
        },
        title: "Go Home?",
        message: "This will take you to the Facebook homepage.",
        choices: [
            { label: "Yes", value: "yes", type: "affirmative" },
            { label: "No", value: "no", type: "negative" }
        ]
    });
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
            this.handleHeaderPress(inEvent);
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
            this.controller.get('browser').mojo.openURL(this.baseURL + "/me"); //loads your profile
            break;

        case "myMessages":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/messages"); //loads your messages
            break;

        case "myNotifications":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/notifications"); //loads your notifications
            break;

        case "myGroups":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/groups"); //loads your groups
            break;

        case "myFriends":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/buddylist"); //loads your friends
            break;

        case "pokes":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/pokes"); //pokes
            break;

        case "findFriends":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/friends/center/suggestions/"); //find friends
            break;

        case "whatsNew":
            Mojo.Controller.stageController.pushScene("second"); //version info
            break;

        case "settings":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/settings"); //facebook settings
            break;

        case "pages":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/pages"); //facebook pages
            break;

        case "notes":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/notes"); //facebook notes
            break;

        case "covidUpdate":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/coronavirus_info"); //COVID-19 Updates
            break;
    }
};