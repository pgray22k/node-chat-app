//array of user objects
// [{
//     id: '/#123poodopd',
//     name: 'Phil',
//     room: 'The Office Fans'
// }]

//addUser( id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

//creating ES6 classes

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push( user );
        return user;
    }

    removeUser( id ) {
        var user = this.getUser(id);

        //user exist then remove the user from the list
        if( user ) {
            this.users = this.users.filter((user)=> user.id !== id );
        }

        return user;
    }

    getUser( id ) {
        return this.users.filter( (user) => user.id === id )[0]; //ES6 destructing, returns the first item
    }

    getUserList( room ) {
        // var users = this.users.filter((user) => {
        //     return user.room === room;
        // });

        let users = this.users.filter( (user) => user.room === room ); //ES6 destructing

        // var namesArray = users.map( (user) => {
        //    return user.name
        // });

        //map returns the values we want to look at in the object instead of giving us back the whole structure
        let namesArray = users.map( (user) => user.name );

        return namesArray;
    }
}

module.exports = {Users};

// class Person {
//
//     constructor ( name, age ) {
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

//var me = new Person('Phil', 36);

//console.log( 'this.name', me.name );
//console.log( me.getUserDescription() );

