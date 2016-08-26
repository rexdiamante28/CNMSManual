if(Meteor.isServer){
    //Kadira.connect('ePoethYGPo49dBgdG', 'faa44e81-e650-4a87-9fba-d26c95c8ab0b');

    Meteor.startup(function(){
        if(Meteor.users.find({}).count()===0){
            Accounts.createUser({
                username: "admin",
                email: "rexdiamante@gmail.com",
                password: "SixBlackCats32!",
                profile: {
                    name: "Rex S. Diamante",
                    avatar: "",
                    cfsId: "",
                    functions: [
                        'manage users',
                        'create links',
                        'change all alert status'
                    ]
                }
            })
        }
    })


}