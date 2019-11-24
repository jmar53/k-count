const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        minlength: 1,
        required: [true, 'Please enter ingredient name']
    },
    per: {
        type: Number,
        required: [true, 'Please enter per amount']
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

module.exports = mongoose.model('ingredient', ingredientSchema);