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
        'user.alerts.logs',
        'user.news',
        'user.newnews',
        'user.editnews.:_id',
        'user.publications',
        'user.newpublication',
        'user.editpublication.:_id',
        'user.publicationselect',
        'user.categories',
        'user.newcategory',
        'user.editcategory.:_id',
        'user.categoryselect',
        'user.ratings',
        'user.newratings',
        'user.editratings.:_id',
        'user.printsetup',
        'user.printnow',
        'user.textparser',
        'user.addnewuser',
        'user.allusers',
        'user.changepassword'

    ]
});

Router.route('/user/changepassword', function () {
    this.render('changepassword');
    this.layout('adminLayout');
});

Router.route('/user/news', function () {
    Meteor.subscribe('categories',"");
    Meteor.subscribe('publications',"");
    Meteor.subscribe('ratings',"");
    this.render('news');
    this.layout('adminLayout');
});

Router.route('/user/newnews', function () {
    Meteor.subscribe('ratings',"");
    this.render('newnews');
    this.layout('adminLayout');
});

Router.route('/user/editnews/:_id', function (){
    var params = this.params;
    P_newsId = params._id;
    Meteor.subscribe('news',P_newsId);
    Meteor.subscribe('ratings',"");
    this.render('editnews');
    this.layout('adminLayout');
});

Router.route('/user/publications', function () {
    Meteor.subscribe('publications',"");
    this.render('publications');
    this.layout('adminLayout');
});

Router.route('/user/newpublication', function () {
    this.render('newpublication');
    this.layout('adminLayout');
});

Router.route('/user/editpublication/:_id', function () {
    var params = this.params;
    P_publicationId = params._id;
    Meteor.subscribe('publications',P_publicationId);
    this.render('editpublication');
    this.layout('adminLayout');
});

Router.route('/user/publicationselect', function () {
    Meteor.subscribe('publications',"");
    this.render('publicationselect');
    this.layout('adminLayout');
});

Router.route('/user/categories', function () {
    Meteor.subscribe('categories',"");
    this.render('categories');
    this.layout('adminLayout');
});

Router.route('/user/newcategory', function () {
    this.render('newcategory');
    this.layout('adminLayout');
});


Router.route('/user/editcategory/:_id', function () {
    var params = this.params;
    P_categoryId = params._id;
    Meteor.subscribe('categories',P_categoryId);
    this.render('editcategory');
    this.layout('adminLayout');
});


Router.route('/user/categoryselect', function () {
    Meteor.subscribe('categories',"");
    this.render('categoryselect');
    this.layout('adminLayout');
});

Router.route('/user/ratings', function () {
    Meteor.subscribe('ratings',"");
    this.render('ratings');
    this.layout('adminLayout');
});

Router.route('/user/newratings', function () {
    this.render('newratings');
    this.layout('adminLayout');
});

Router.route('/user/editratings/:_id', function () {
    var params = this.params;
    P_ratingId = params._id;
    Meteor.subscribe('ratings',P_ratingId);
    this.render('editratings');
    this.layout('adminLayout');
});

Router.route('/user/printsetup', function () {
    Meteor.subscribe('categories',"");
    this.render('printsetup');
    this.layout('adminLayout');
});

Router.route('/user/printnow', function () {
    Meteor.subscribe('publications',"");
    this.render('printnow');
    //this.layout('adminLayout');
});

Router.route('/user/newsnow', function () {
    Meteor.subscribe('publications',"");
    this.render('newsnow');
    this.layout('adminLayout');
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
    Meteor.subscribe('profileimages',"");
    this.render('addNewUser');
    this.layout('adminLayout');
});

Router.route('/user/allusers', function () {
    Meteor.subscribe('users',"");
    this.render('allusers');
    this.layout('adminLayout');
});
////////////////////////////////////////////////////////////