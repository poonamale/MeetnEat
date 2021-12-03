var fs = require('fs')

require.extensions['.json'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
}

const offices = ["Belgrave", "Sussex", "John_Street"]

function getRestaurantsNearOffice(office) {
    if (offices.includes(office)) {
        restaurantsJson = require(`../restaurant_api/assets/${office}_restaurants.json`)
        console.log(JSON.parse(restaurantsJson))
    } else {
        console.error("Office not included")
    }
}

// var words = require("../restaurant_api/assets/Belgrave_restaurants.json")

getRestaurantsNearOffice("Belgrave")