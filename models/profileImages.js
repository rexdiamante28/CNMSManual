ProfileImages = new FS.Collection("profileimages", {
    //stores: [new FS.Store.FileSystem("profileimages", {path: "~/images/profile"})]
    stores: [new FS.Store.FileSystem("profileimages", {path: Meteor.absolutePath +"/images/profile"})]
});

ProfileImages.allow({
    'insert': function () {
        return true
    },
    'update': function () {
        return true
    },
    'remove': function () {
        return true
    },
    download:function(){
        return true;
    }
})