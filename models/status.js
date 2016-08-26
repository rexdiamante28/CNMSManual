Status = new Mongo.Collection('status');

Status.attachSchema(new SimpleSchema({

    'lastFetch': {
        type: Date,
        optional: true
    },
    'fetchedToday': {
        type: Number,
        optional: true
    },
    'lastFetchedNumber': {
        type: Number,
        optional: true
    },
    'fetchingIn': {
        type: Number,
        optional: true
    },
    'serverHealth': {
        type: String,
        optional: true
    },
    'interval':{
        type: Number,
        optional: true
    }
}))