const modelsTodos = require('../models/todo');


var Todos = {

    add: function(req, res, next) {
        var addTodos = new modelsTodos({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        })
        addTodos.save(function(err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    },

    getAll: function(req, res, next) {
        modelsTodos.find({}, function(err, result) {
            res.send(result)
        });
    },

    update: function(req, res, next) {
        modelsTodos.findById(req.body.id, function(err, result) {
            if (err) res.send(err)
            else {
                result.title = req.body.title
                result.description = req.body.description
                result.status = req.body.status
                result.save()
                res.send(result)
            }
        })

    },
    delete: function(req, res, next) {
        var dataRemove = JSON.parse(req.body.arrId)
        dataRemove.forEach(function(data) {
            modelsTodos.find({
                _id: data
            }, function(err, result) {
                if (err) res.send(err)
                else {
                    result[0].remove(function(err) {
                        if (err) res.send(err)
                    })
                }
            })
        })
        res.send({
            status: true
        })
    }
}

module.exports = Todos
