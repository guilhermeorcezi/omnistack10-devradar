module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(techs => techs.trim());
}