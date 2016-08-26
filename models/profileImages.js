ProfileImages = new FS.Collection("profileimages", {
    stores: [new FS.Store.FileSystem("profileimages", {path: "~/Images/profile"})]
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