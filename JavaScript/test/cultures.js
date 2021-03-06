var Culture = require('../compiled/culture').Culture;

// List of supported cultures
module.exports = {
    'English': Culture.supportedCultures.find(c => c.cultureCode === Culture.English),
    'Spanish': Culture.supportedCultures.find(c => c.cultureCode === Culture.Spanish)
};