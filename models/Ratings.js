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