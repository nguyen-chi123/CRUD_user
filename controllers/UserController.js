const User = require('../models/User');
const { body } = require('express-validator');
const faker = require('faker');


class UserController {
    // GET /users
    async index(req, res, next) {
        const pageNumber = parseInt(req.query.page);
        const perPage = parseInt(req.query.limit);
        const skipIndex = (pageNumber - 1) * perPage;
        try {
            const total = await User.count();
            var users = await User.find()
                .sort({ _id: 1 })
                .skip(skipIndex)
                .limit(perPage);
            res.json({
                success: true,
                data: {
                    users: users,
                    page_number: pageNumber,
                    page_size: perPage,
                    page_count: total / perPage,
                    total_record_count: total
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }
    
    // GET /users/:id
    async show(req, res, next) {
        try {
            const user = await User.findOne({ id: req.params.id});
            if (user == null) {
                return res.json({
                    success: false,
                    mess: 'user not found!'
                });
            }
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }

    // POST /users
    async create(req, res, next) {
        
        try {
            const userSave = await User.create(req.body);
            res.json({
                success: true,
                user: userSave
            });
        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }

    // PUT /users/:id 
    async update(req, res, next) {
        try {
            const userUpdate = await User.updateOne({ id: req.params.id }, req.body);
            res.json({
                success: true,
                user_update: userUpdate
            });
        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }

    //DELETE /users/:id
    async delete(req, res, next) {
        try {
            const userDelete = await User.deleteOne({ id: req.params.id });
            if (!userDelete.deletedCount) {
                return res.json({
                    success: false,
                    message: 'user not found!',
                });
            }
            res.json({
                success: true,
                message: 'deleted successfully!',
            });
        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }

    // use faker
    async fakeData(req, res, next) {
        try {
            for (let i = 1; i < 61; i++) {
                let newUser = new User();
                newUser.id = i;
                newUser.username = faker.name.findName();
                newUser.password = faker.internet.password();
                newUser.email = faker.internet.email();
                newUser.birthday = faker.datatype.datetime();
                newUser.gender = faker.name.gender();
                newUser.phone = faker.phone.phoneNumber();
                newUser.address = faker.address.cityName();
                await newUser.save();
            }
            res.json({ mess: "fake done!" })
        } catch (error) {
            res.json({ error: error });
        }
    }
}

module.exports = new UserController;