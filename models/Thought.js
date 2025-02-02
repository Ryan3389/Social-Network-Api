const { Schema, model } = require('mongoose')
const reactionSchema = require('../models/Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString()
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })


const Thought = model('Thought', thoughtSchema)

module.exports = Thought