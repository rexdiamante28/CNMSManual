if(Meteor.isClient){
    Template.loginPage.events({
        'submit form': function(event,template){
            event.preventDefault();

            var user = {
                username: template.find('#username').value,
                password: template.find('#password').value
            }

            Meteor.loginWithPassword(user.username, user.password, function (err) {
                if(err){
                    alertify.error("Ooops!  " + err.reason + ". Please try again.");
                } else {
                    Router.go('/user/dashboard');
                }
            })
        }
    })
}