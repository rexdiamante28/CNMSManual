if(Meteor.isServer){
    Meteor.methods({
        'authenticate': function(user){

            var result ={};

            if(Users.find({username:user.username, password:user.password}).count()>0){
                var validUser = Users.findOne({username:user.username, password:user.password});

                result.status=true;
                result.object = validUser;
            }
            else{
                result.status=false;
                result.object = "invalid account.";
            }

            return result;
        }
    })
}