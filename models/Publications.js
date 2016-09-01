Publications = new Mongo.Collection('publications');

Publications.attachSchema(new SimpleSchema({

    'name': {
        type: String,
        unique: true
    },

    'status': {
        type: String,
        autoform: {
            type: "select-radio",
            options: function () {
                return [
                    {label: "Active", value: "Active"},
                    {label: "Inactive", value: "Inactive"}
                ];
            }
        }
    },

    'number': {
        type: Number,
        unique: true,
        autoform: {
            type: "text"
        }
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