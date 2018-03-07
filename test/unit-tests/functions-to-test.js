module.exports = {
  capitalize: function(string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      if (!splitStr[i].charAt(0).match(/[a-z]/i) && splitStr[i].charAt(1).match(/[a-z]/i)) {
        splitStr[i] = splitStr[i].charAt(0) + splitStr[i].charAt(1).toUpperCase() + splitStr[i].substring(2);
      } else {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
    }
    return splitStr.join(' ');
  }
}
