const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
    name: String,
    glass: String,
    category: String,
    ingredients: [{
        ingredient: String,
        amount: String,
        unit: String
    }],
    garnish: String,
    preparation: String,
    source: String,
    owner: String,
}, { timestamps: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;