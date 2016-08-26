if(Meteor.isClient){
    /**
     * Created by NicoloEngles on 2/17/2016.
     */
    Template.addNewUser.rendered = function(){
        Session.set('profileUrl', '/defaultAvatar.png');
    }

    Template.addNewUser.events({
        'submit form': function(event, template) {
            event.preventDefault();

            var emailAddress = template.find('#email').value;
            var username = template.find('#userName').value;
            var password = template.find('#password').value;
            var name = template.find('#fullName').value;
            var avatar = "avatar.png";

            var functions = $('#functions input:checkbox:checked').map(function() {
                return this.value;
            }).get();

            Accounts.createUser({
                username: username,
                email: emailAddress,
                password: password,
                profile: {
                    name: name,
                    avatar:ProfileImages.findOne({_id:  Session.get('selectedProfileImage')}).url(),
                    cfsId:Session.get('selectedProfileImage'),
                    functions: functions
                }
            },function(error,result){
                if(error){
                    alertify.error(error.message);
                }
                else{
                    alertify.success("User added");
                }
            })

        },

        'click #showPassword': function(event,template){
            if($('#showPassword').is(":checked")){
                $('#password').attr('type','text');
            }else{
                $('#password').attr('type','password');
            }
        }
    });

    Template.addNewUser.helpers({
        'profileUrl': function () {
            var url = ProfileImages.findOne({_id:  Session.get('selectedProfileImage')}).url();
            return url;
        },
        'allowSaveImage': function () {
            return Session.get('allowSave');
        }
    })

    Template.addNewUser.events({
        'change #avatar': function (event, template) {

            var f = event.target.files[0];
            var fr = new FileReader();

            fr.onload = function(ev2) {
                $('#avatarimg').attr('src', ev2.target.result);
                $('#avatarimg').cropper({
                    aspectRatio: 4/4
                });
                $('#avatarimg').cropper("replace", ev2.target.result);
            };

            fr.readAsDataURL(f);

            Session.set('allowSave', true);
        },

        'click #saveImage': function () {
            var canvas = $('#avatarimg').cropper("getCroppedCanvas");

            canvas.toBlob(function(blob) {
                ProfileImages.insert(blob, function (err, fileObj) {
                    if(!err){
                        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        Session.set('selectedProfileImage', fileObj._id);
                    }
                });
            }, "image/*", 1)

            $('#closemodal').click();
        }
    })


    Deps.autorun(function () {
        handler = Meteor.subscribe('getImage', Session.get('selectedProfileImage'));
    })

    Template.addNewUser.destroyed = function () {
        handler.stop();
    }
}


if(Meteor.isServer){
    Meteor.methods({
        'addNewUser': function (user) {
            Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password,
                profile: {
                    name: user.profile.name,
                    avatar: user.profile.avatar,
                    level: user.profile.level
                }
            })

            $('#addUserForm').reset();

        }
    })

    Meteor.methods({
        'deleteUsers': function(){
            Meteor.users.remove({});
        }
    })

    Meteor.publish('getImage', function (id) {
        return ProfileImages.find({_id: id});
    })

    Meteor.publish('allImages', function () {
        return ProfileImages.find();
    })
}