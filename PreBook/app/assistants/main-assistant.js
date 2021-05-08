/*
______        ______             _    
| ___ \       | ___ \           | |   
| |_/ / __ ___| |_/ / ___   ___ | | __
|  __/ '__/ _ \ ___ \/ _ \ / _ \| |/ /
| |  | | |  __/ |_/ / (_) | (_) |   < 
\_|  |_|  \___\____/ \___/ \___/|_|\_\
                                      
                                      
Copyright (c) John Spahr 2019-2021
*/

function MainAssistant() {
    this.updateCheckDone = false;
    this.baseURL = "http://mbasic.facebook.com"; //used everywhere, so set as base URL
}

MainAssistant.prototype.setup = function() {
    this.updaterModel = new UpdaterModel();

    //check if first run
    var currVersion = Mojo.Controller.appInfo.version;
    var firstRun = new Mojo.Model.Cookie("firstRun" + currVersion);
    if (firstRun.get() == undefined) {
        //if first run, show version info
        firstRun.put(false);
        Mojo.Controller.stageController.pushScene("info");
    }

    //set browser attributes...
    this.browserAtt = {
        url: this.baseURL,
        cacheAdapter: true,
        setEnableJavaScript: true,
        setShowClickedLink: true,
        setBlockPopups: true,
        setAcceptCookies: true,
        minFontSize: 14
    };

    //initialize browser
    this.controller.setupWidget('browser', this.browserAtt, this.model);

    //initialize command menu...
    this.cmdMenuAttributes = {
        menuClass: 'no-fade'
    }
    this.commandMenuModel = {
        items: [{},
            {
                items: [
                    { items: [{ iconPath: "images/profile.png", command: "myProfile" }] },
                    { items: [{ iconPath: "images/friends.png", command: "myFriends" }] },
                    { items: [{ iconPath: "images/messages.png", command: "myMessages" }] },
                    { items: [{ iconPath: "images/notifications.png", command: "myNotifications" }] }
                ]
            }, {

            }
        ]
    };
    this.controller.setupWidget(Mojo.Menu.commandMenu, this.cmdMenuAttributes, this.commandMenuModel);

    //loading spinner setup...
    this.controller.setupWidget("loadingSpinner",
        this.attributes = {
            spinnerSize: "small"
        },
        this.model = {
            spinning: false,
            visible: false
        }
    );

    //create app menu...
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
            { label: "My Friends", command: "myFriends", shortcut: "f" },
            { label: "Messages", command: "myMessages", shortcut: "m" },
            { label: "Pages", command: "pages", shortcut: "s" },
            { label: "Notifications", command: "myNotifications", shortcut: "n" },
            { label: "Find Friends", command: "findFriends", shortcut: "e" },
            { label: "Other" },
            { label: "Pokes", command: "pokes", shortcut: "t" },
            { label: "Settings/Privacy", command: "settings" },
            { label: "App Info" },
            { label: "Version Info", command: "whatsNew" },
            Mojo.Menu.helpItem
        ]
    };
    this.controller.setupWidget(Mojo.Menu.appMenu, this.menuAttr, this.appMenuModel); //set up app menu

    //initialize (top) viewMenu
    this.viewMenuModel = {
        items: [{
            items: [
                { label: $L('Back'), icon: "back", command: "goBack" },
                { label: $L('PreBook'), width: 200, command: "goHome" },
                { label: $L('Forward'), icon: "forward", command: "goForward" }
            ]
        }]
    };
    this.controller.setupWidget(Mojo.Menu.viewMenu, {}, this.viewMenuModel);

    //when loading starts
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStarted, this.handleStartLoading.bind(this));

    //when loading ends
    Mojo.Event.listen(this.controller.get("browser"), Mojo.Event.webViewLoadStopped, this.handleStopLoading.bind(this));

    //handle screen orientation changes...
    this.controller.window.addEventListener('resize', this.orientationChanged.bind(this)); //required for TouchPad
    this.orientationChanged();
};

MainAssistant.prototype.activate = function(event) {
    //check for updates in App Museum II
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

MainAssistant.prototype.deactivate = function(event) {
    //remove event handlers...
    this.controller.window.removeEventListener('resize', this.orientationChanged);
    Mojo.Event.stopListening(this.controller.get('browser'), Mojo.Event.webViewLoadStarted, this.handleStartLoading);
    Mojo.Event.stopListening(this.controller.get('browser'), Mojo.Event.webViewLoadStopped, this.handleStopLoading);
};

MainAssistant.prototype.cleanup = function(event) {

}

MainAssistant.prototype.orientationChanged = function(orientation) {
    //update top header bar width
    var topWidgetSetup = this.controller.getWidgetSetup(Mojo.Menu.viewMenu);
    var topWidgetModel = topWidgetSetup.model;
    topWidgetModel.items[0].items[1].width = this.controller.window.innerWidth - 120;

    //update bottom command bar, too
    var bottomWidgetSetup = this.controller.getWidgetSetup(Mojo.Menu.commandMenu);
    var bottomWidgetModel = bottomWidgetSetup.model;

    //tell Mojo to update header and command bar
    this.controller.modelChanged(topWidgetModel);
    this.controller.modelChanged(bottomWidgetModel);
};

MainAssistant.prototype.handleHeaderPress = function(event) {
    //show navigation menu....
    this.controller.showAlertDialog({
        onChoose: function(value) {
            switch (value) {
                case "refresh":
                    this.controller.get('browser').mojo.reloadPage(); //reload page
                    break;

                case "home":
                    this.controller.get('browser').mojo.openURL(this.baseURL); //go home
                    break;
            }
        },
        title: "Navigation Menu",
        message: "Refresh page or go home?",
        choices: [
            { label: "Refresh", value: "refresh", type: "medium" },
            { label: "Go Home", value: "home", type: "medium" },
            { label: "Cancel", value: "no", type: "dismiss" }
        ]
    });
};

MainAssistant.prototype.handleStartLoading = function(event) {
    //show loading spinner
    this.controller.get('loadingSpinner').visible = true;
    this.controller.get('loadingSpinner').mojo.start();
};

MainAssistant.prototype.handleStopLoading = function(event) {
    //hide loading spinner
    this.controller.get('loadingSpinner').visible = false;
    this.controller.get('loadingSpinner').mojo.stop();
};

MainAssistant.prototype.handleCommand = function(inEvent) {
    //handle commands from menus...
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

        case "findFriends":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/friends/center/suggestions/"); //find friends
            break;

        case "pokes":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/pokes"); //pokes
            break;

        case "whatsNew":
            Mojo.Controller.stageController.pushScene("info"); //version info
            break;

        case "settings":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/settings"); //facebook settings
            break;

        case "pages":
            this.controller.get('browser').mojo.openURL(this.baseURL + "/pages"); //facebook pages
            break;
    }
};