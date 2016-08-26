Categories = new Mongo.Collection('categories');

Categories.attachSchema(new SimpleSchema({

    'name': {
        type: String
    },
    'description':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    }
}))