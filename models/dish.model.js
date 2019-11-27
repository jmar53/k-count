const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        minlength: 1,
        required: [true, 'Please enter dish name']
    },
    /*ingredient_name: {
        type: String,
        minlength: 1,
        required: [true, 'Please enter ingredient name']
    },
    per: {
        type: Number,
        required: [true, 'Please enter per amount']
    },
    amount: {
        type: Number,
        required:[true, 'Please enter amount']
    },*/
    cals: {
        type: Number,
        required:[true, 'Please enter calorie amount']
    },
    fat: {
        type: mongoose.Decimal128,
        minlength: 3,
        required: [true, 'Please enter fat amount']
    },
    carbs: {
        type: mongoose.Decimal128,
        required: [true, 'Please enter carb amount']
    },
    protein: {
        type: mongoose.Decimal128,
        required: [true, 'Please enter protein amount']
    }
})

module.exports = mongoose.model('dish', dishSchema);