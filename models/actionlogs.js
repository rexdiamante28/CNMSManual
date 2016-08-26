ActionLogs = new Mongo.Collection('actionlogs');

ActionLogs.attachSchema(new SimpleSchema({

    'alertId': {
        type: String,
        optional: true
    },
    'userId': {
        type: String
    },
    'name': {
        type: String
    },
    'action': {
        type: String
    },
    'timestamp': {
        type: Date
    }

}))