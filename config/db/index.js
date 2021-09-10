const mongoose = require('mongoose');
require('dotenv/config');

async function connect() 
{
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('connect successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };