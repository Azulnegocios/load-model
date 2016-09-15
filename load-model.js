var fs = require('fs')
/*
* @param {string} path
* @param {object} mongoose
* @return {object} list models
*/
module.exports = function(path,mongoose){
    try{
      if(path.substr(path.length -1) != '/'){
        path += '/';
      }
        var e = fs.readdirSync(path);
        var data = {};
        e.forEach(function(file){
          var v = fs.statSync(path+file);
          if(!v.isFile()){
            return;
          }
          if(file.search(/.js/) == -1){
            return;
          }
          console.log(path+file)
            if(mongoose){
              data[file.replace(/.js/,'').toLowerCase()] = require(path+file)(mongoose);
            }else{
              data[file.replace(/.js/,'').toLowerCase()] = require(path+file);
            }
        });
        return data;
    }catch (e){
        throw new Error(e.toString());
    }
}
