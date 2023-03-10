var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    try {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": "Error creando al usuario" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ "status": false, "message": "Correo electrónico ya existente" });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}
var searchUserControllerFunc = async(req, res)=> {
    var result = null;
    try {
        result = await userService.searchUserDBService(req.body);
        if (result.status){
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message":result.msg});
        }
    }catch (err) {
        console.error(err);
        res.send({"status": false, "message":err.msg});
    }
    

}

var deleteUserControllerFunc = async(req, res)=> {
    var result = null;
    try {
        result = await userService.deleteUserDBService(req.body);
        if (result.status){
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message":result.msg});
        }
    }catch (err) {
        console.error(err);
        res.send({"status": false, "message":err.msg});
    }
    

}

var updateUserControllerFunc = async(req, res)=> {
    var result = null;
    try {
        result = await userService.updateUserDBService(req.body);
        if (result.status){
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message":result.msg});
        }
    }catch (err) {
        console.error(err);
        res.send({"status": false, "message": err.msg || "Error al actualizar el usuario"});
    }
    
}






module.exports = { createUserControllerFunc, loginUserControllerFunc , searchUserControllerFunc, deleteUserControllerFunc, updateUserControllerFunc};