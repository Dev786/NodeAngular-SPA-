var mysql = require('mysql');
var pool;

exports.module = {
    createConnection: function (hostName, userName, passwordMain = "", databaseMain) {
        pool = mysql.createPool({
            host: hostName,
            user: userName,
            password: passwordMain,
            database: databaseMain
        });
    },

    checkConnection: function () {
        pool.getConnection(function (err, connection) {
            if (err)
                throw err;
            else
                console.log("Connection Established");
        });
        connection.release;
    },

    Query: function (type, query, data = null, response) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query(query, data, function (err, result) {
                    if (err) throw err;
                    else{
                        if(type=="INSERT")
                            response.send("success");
                        else{
                            response.send(JSON.stringify(result));
                        }
                    }
                });
                connection.release();
            }
        });
    }
}