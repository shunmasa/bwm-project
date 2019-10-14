const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
username:{
  type:String,
  min:[4,'Too short ,min is 4 characters'],
  max:[32,'Too long ,max is 32 characters']
},
email:{
  type:String,
  min:[4,'Too short ,min is 4 characters'],
  max:[32,'Too long ,max is 32 characters'],
  unique:true,
  required:'Email is required',
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
},
password:{
  type:String,
  min:[4,'Too short ,min is 4 characters'],
  max:[32,'Too long ,max is 32 characters'],
  required:'Password is required'  
},
rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}],
bookings:[{type:Schema.Types.ObjectId,ref:'Booking'}]
});

userSchema.methods.hasSamePassword = function(requestedPassword){
  
//compareSync() compare func //compare encrpited password and 
//bcrypt.compareSync check password
  return bcrypt.compareSync(requestedPassword,this.password);
}


//pre data manipulation with hash code
//salt is required when hashed //<body><pre></pre></body>
userSchema.pre('save',function(next){
  const user = this;//this is user name email so on

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
    });
});
})




module.exports = mongoose.model('User',userSchema);