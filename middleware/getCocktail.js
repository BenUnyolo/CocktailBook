// Cocktail schema and model
const Cocktail = require('../models/Cocktail')

const getCocktail = async (req, res, next) => {
  let cocktail
  try {
    cocktail = await Cocktail.findById(req.params.id)
    if (cocktail == null) {
      return res.status(404).json({ message: 'Cannot find cocktail' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.cocktail = cocktail
  next()
}

module.exports = getCocktail;