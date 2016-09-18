var fs = require('fs')
/*
* @param {string} path
* @param {object} mongoose
* @return {object} list models
*/
module.exports = function(path,mongoose){
    try{
      var pathParent = module.parent.id.replace(/\.js/,'');//path parent file and removing extension
      var pathParentArray = pathParent.split('/');//turning into array
      pathParentArray.pop();//delete file name
      //if not, add /
      if(path.substr(path.length -1) != '/'){
        path += '/';
      }
      //setting path
      if(path.substr(0,3) == '../'){
        var t = '';
        while(path.substr(0,3) == '../'){
          path = path.substr(3,(path.length -1));
          pathParentArray.pop();
        }
          for(var i in pathParentArray){
            t += pathParentArray[i]+'/';
          }
        path = t+path;
      }
      if(path.substr(0,2) == './'){
        path = path.substr(2,(path.length -1));
        path = __dirname.substr(0,(__dirname.length - 23))+path;
      }

      var e = fs.readdirSync(path);
      var data = {};
      e.forEach(function(file){
        var v = fs.statSync(path+file);
        //addressing if directory
        if(!v.isFile()){
          return;
        }
        //addressing if not a javascript file
        if(file.search(/.js/) == -1){
          return;
        }
          if(mongoose){
            data[file.replace(/\.js/,'').toLowerCase()] = require(path+file)(mongoose);
          }else{
            data[file.replace(/\.js/,'').toLowerCase()] = require(path+file);
          }
        });
        return data;
    }catch (e){
        throw new Error(e.toString());
    }
}
