var express = require('express');
var router = express.Router();
var toDoModel = require('./../todoManagementController/todo_model').TodoModel;
var commonController = require('./../commonFunctionController/common_controller');

// Adding data to collection
router.post('/todoManage', async function (req, res, next) {
    let reqBody = req.body;

    req.checkBody('title', 'title is required field!').notEmpty();
    req.checkBody('description', 'description is required field!').notEmpty();

    let errors = await req.validationErrors();

    if (errors) {
        return res.status(400).send({ message: await commonController.returnErrorMessage(errors), status: false });
    }

    try {
        let newTodo = new toDoModel();
        newTodo.title = reqBody.title;
        newTodo.description = reqBody.description;
        newTodo.save(function (err, data) {
            if (err) {
                console.log(err);
                return res.status(400).send({ err: err, status: false });
            }
            console.log(data);
            res.status(200).send({ message: 'Todo data added successfully !', status: true });
        })

    } catch (err) {
        console.error(err.stack);
        return res.status(502).send({ message: 'Unknown Error', status: false });
    }
});


// Getting data from collection
router.get('/todoManage', async function (req, res, next) {
    try {
        var findData = {};

        if (req.query.hasOwnProperty('id')) {
            findData = {
                _id: req.query.id.toObjectId()
            }
        }

        toDoModel.find(findData, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(400).send({ error: err, status: false });
            }
            if (data.length == 0)
                return res.status(400).send({ message: 'No Todo list found!', status: false });
            let outputData;

            if (req.query.hasOwnProperty('id'))
                outputData = data[0];
            else
                outputData = data;


            res.status(200).send({ message: 'Todo list found successfully', status: true, data: outputData });
        });
    } catch (err) {
        console.log(err.stack);
        return res.status(502).send({ message: 'Unknown Error', status: false });
    }
});


// Deleting data from collection
router.delete('/todoManage', async function (req, res, next) {

    let queryData = req.query;

    req.check('id', 'id is required field!').notEmpty();

    let errors = await req.validationErrors();

    if (errors) {
        return res.status(400).send({ message: await commonController.returnErrorMessage(errors), status: false });
    }

    let findData = {
        _id: queryData.id.toObjectId()
    };

    try {
        toDoModel.findByIdAndRemove(findData, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(400).send({ error: err, status: false });
            }

            if (data == null)
                return res.status(400).send({ message: 'No todo item found with this id!', status: false });

            res.status(200).send({ message: 'Todo iteam deleteed suscessfully!', status: true });
        });
    } catch (err) {
        console.log(err.stack);
        return res.status(502).send({ message: 'Unknown Error', status: false });
    }
});

// Updating data from collection
router.put('/todoManage', async function (req, res, next) {

    let reqBody = req.body;

    req.check('id', 'id is required field!').notEmpty();
    req.check('title', 'title is required field!').notEmpty();
    req.check('description', 'description is required field!').notEmpty();

    let errors = await req.validationErrors();

    if (errors) {
        return res.status(400).send({ message: await commonController.returnErrorMessage(errors), status: false });
    }

    try {
        let findData = {
            _id: reqBody.id.toObjectId()
        };

        let updateData = {
            title: reqBody.title,
            description: reqBody.description
        }

        toDoModel.findByIdAndUpdate(findData, updateData, { new: true }, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(400).send({ error: err, status: false });
            }
            res.status(200).send({ message: 'Todo iteam updated suscessfully!', status: true, data: data });
        });

    } catch (err) {
        console.log(err.stack);
        return res.status(502).send({ message: 'Unknown Error', status: false });
    }
});


module.exports = router;

