var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({
         email:userDetails.email}, function(err,user){
            if(err){

            }else if(user){
               reject(false);
            }else{
               var userModelData = new userModel();
               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;

               userModelData.save(function resultHandle(error, result) {
                   if (error) {
                       reject(false);
                   } else {
                       resolve(true);
                   }
               });
           }

            });
         });
      }



module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (userDetails)=>{
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               

               if(result.email = userDetails.email) {
                  resolve({status: true,msg: "Usuario existente "+ result.email});
               }
            }
            else {
               reject({status: false,msg: "User not found"});
            }
         }
      });
   });
}

module.exports.deleteUserDBService = (userDetails)=>{
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndDelete({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               

               if(result.email = userDetails.email) {
                  resolve({status: true,msg: "Usuario eliminado"});
               }
            }
            else {
               reject({status: false,msg: "User not found"});
            }
         }
      });
   });
}



module.exports.updateUserDBService = (userDetails)=>{
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndUpdate(
         {email: userDetails.email},
         {$set:{
            password: encryptor.encrypt(userDetails.password),
            firstname: userDetails.firstname,
            lastname: userDetails.lastname
            }
         },
         {new: true},
         function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               

               if(result.email = userDetails.email) {
                  resolve({status: true,msg: "Usuario actualizado"});
               }
            }
            else {
               reject({status: false,msg: "User not found"});
            }
         }
      });
   });
}