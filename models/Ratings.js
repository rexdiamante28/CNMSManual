Ratings = new Mongo.Collection('ratings');

Ratings.attachSchema(new SimpleSchema({

    'name': {
        type: String,
        unique: true
    },
    'description':{
        type: String,
        unique: true,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    }
}))


Ratings.allow({
    'insert': function () {
        return true
    },
    'update': function () {
        return true
    },
    'remove': function () {
        return true
    }
})