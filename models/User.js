const fs = require('fs');
const path = require('path');

const usersFilePath = path.resolve(__dirname, '../data/usersDataBase.json');

const User = {

    filename: usersFilePath,

    getData: function(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usersDataBase.json'), 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop(); /* saca el ultimo elemento del array */
        if(lastUser){
            return lastUser.id +1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id:this.generateId(),
            ...usertData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, 4));
        return newUser;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, 4));
        return true;
    }

}

module.exports = User;