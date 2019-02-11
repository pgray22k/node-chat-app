const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=> {

    //create a seed data
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'And',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Mike',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Phil',
            room: 'Node Course'
        }]
    });

    it('should add new user', ()=>{
        let users = new Users();
        let user = {
            id: 123,
            name: 'Jerry',
            room: 'The Office Fans'
        }

        var resUser = users.addUser( user.id, user.name, user.room );

        expect( users.users ).toEqual([user]);
    });

    it('should return names for Node Course', ()=>{
       let userList = users.getUserList('Node Course');

       expect( userList ).toEqual(['And', 'Phil']);

    });

    it('should remove a user', ()=>{
       let userId = '99';
       let user = users.removeUser(userId);

       expect(user).toBeFalsy(); //if it was removed we should have got the user back
        expect(users.users.length).toBe(3);
    });

    it('should not remove user', ()=> {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe( userId ); //if it was removed we should have got the user back
        expect(users.users.length).toBe(2);
    });

    it('should find user', ()=>{
        let userId = '2';
        let user = users.getUser( userId );
        expect(user.id).toBe(userId);
    });

    it('should not find user',()=> {
        var userId = '99';
        var user = users.getUser( userId );
        expect(user).toBeFalsy();
    });
})