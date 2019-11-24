const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    date: {
        type: Date,
        required: [true, 'Please enter date of meal']
    },
    time: {
        type: String,
        required: [true, 'Please enter time of meal']
    },
    name: {
        type: String,
        minlength: 1,
        required: [true, 'Please enter meal name']
    },
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

module.exports = mongoose.model('meal', mealSchema);