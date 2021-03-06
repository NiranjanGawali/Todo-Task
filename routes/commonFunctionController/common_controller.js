var exports = module.exports = {};

/*
 |--------------------------------------------------------------------------
 | Return error message
 |--------------------------------------------------------------------------
 */

exports.returnErrorMessage = async function (errorList) {
    let errorMsg = new Promise(function (resolve, reject) {
        if (errorList.length > 0) {
            errorList.forEach(function (singleErr) {
                if (singleErr.msg.length != 0) {
                    resolve(singleErr.msg);
                }
            });
        }
    });
    return errorMsg;
}


