# load-model
Load model Mongoose
[![NPM version](https://badge.fury.io/js/load-model.svg)](http://badge.fury.io/js/load-model)

### Example of creating models

```
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var Model = Schema({
        name:String
    },{collection:'collection_name'});
    return mongoose.model('model_name',Model);
}
```
#### or

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = Schema({
        name:String
},{collection:'collection_name'});
module.exports = mongoose.model('model_name',Model);
```
### Example usage

```
var mongoose = require('mongoose');
var load = require('./load-model');
var Models = load(__dirname+'/models/',mongoose);
Models.jobs.find({},function(e,jobs){});
```
#### or

```
var Models = load(__dirname+'/models/');
Models.jobs.find({},function(e,jobs){});
```
> the name of the sample template is "jobs" is the naming of the file corresponding to "./models/jobs.js"
