  
const { User } = require('../models');

const userData = [
    {
        username: 'nateghsc',
        email: 'nate@gmailll.com',
        password: '1234'
    }

]
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;