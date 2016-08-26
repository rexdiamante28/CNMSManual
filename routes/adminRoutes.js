var OnBeforeActions;

OnBeforeActions = {
    loginRequired : function() {
        if (!Meteor.userId()) {
            this.render('loginPage');
        } else {
            this.next();
        }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: [
        'user',
        'user.dashboard',
        'user.rsslinks',
        'user.alerts',
        'user.alerts.feedalerts',
        'user.alerts.monitoring',
        'user.pagination',
        'user.alerts.logs'
    ]
});

Router.route('/user/news', function () {
    this.render('news');
    this.layout('adminLayout');
});

Router.route('/user/newnews', function () {
    this.render('newnews');
    this.layout('adminLayout');
});

Router.route('/user/publications', function () {
    this.render('publications');
    this.layout('adminLayout');
});

Router.route('/user/newpublication', function () {
    this.render('newpublication');
    this.layout('adminLayout');
});

Router.route('/user/publicationselect', function () {
    this.render('publicationselect');
    this.layout('adminLayout');
});

Router.route('/user/categories', function () {
    this.render('categories');
    this.layout('adminLayout');
});

Router.route('/user/newcategory', function () {
    this.render('newcategory');
    this.layout('adminLayout');
});

Router.route('/user/categoryselect', function () {
    this.render('categoryselect');
    this.layout('adminLayout');
});

Router.route('/user/ratings', function () {
    this.render('ratings');
    this.layout('adminLayout');
});

Router.route('/user/newratings', function () {
    this.render('newratings');
    this.layout('adminLayout');
});

Router.route('/user/printsetup', function () {
    this.render('printsetup');
    this.layout('adminLayout');
});

Router.route('/user/printnow', function () {
    this.render('printnow');
    //this.layout('adminLayout');
});


Router.route('/user/textparser', function () {
    this.render('textparser');
    this.layout('adminLayout');
});

////////////////////////////////////////////////////////
Router.route('/user/', function () {
    this.render('dashboard');
    this.layout('adminLayout');
});

Router.route('/user/dashboard', function () {
    this.render('dashboard');
    this.layout('adminLayout');
});

Router.route('/user/rsslinks', function () {
    this.render('rssLinks');
    this.layout('adminLayout');
});

Router.route('/user/alerts', function () {
    this.render('alerts');
    this.layout('adminLayout');
});

Router.route('/user/alerts/feedalerts', function () {
    this.render('feedAlerts');
    this.layout('adminLayout');
});

Router.route('/user/alerts/monitoring', function () {
    this.render('monitoring');
})

Router.route('/user/pagination', function () {
    this.render('pagination');
    this.layout('adminLayout');
})

Router.route('/user/alerts/logs', function () {
    Meteor.subscribe('alertlogs',sessionStorage.getItem('currentalertlogsid'));
    this.render('alertLogs');
    this.layout('adminLayout');
});

Router.route('/user/addnewuser', function () {
    this.render('addNewUser');
    this.layout('adminLayout');
});
////////////////////////////////////////////////////////////