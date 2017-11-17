const expect = require('expect');
const { Users } = require('./../utils/users');

var users;

beforeEach(() => {
  users = new Users();
  users.users = [{
      id: '111',
      name: 'one',
      room: 'Room1'
    }, {
      id: '222',
      name: 'two',
      room: 'Room1'
    },
    {
      id: '333',
      name: 'three',
      room: 'Room2'
    }
  ];
});
describe('Users', () => {
  it('should add a new user', () => {
    var user = {
      id: '444',
      name: 'two',
      room: 'Room1'
    };
    var res = users.addUser(user.id, user.name, user.room);
    expect(res).toEqual(user);
  });


  it('should remove the user', () => {
    var user = users.removeUser('111');
    expect(user.id).toEqual('111');
    expect(users.users.length).toBe(2);
  });

  it('should not remove the user', () => {
    var user = users.removeUser('444');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should get user by id', () => {
    var user = users.getUser('222');
    expect(user).toEqual(users.users[1]);
  });

  it('should not get user by invalid id', () => {
    var user = users.getUser('444');
    expect(user).toNotExist();
  });

  it('should return the users for a room', () => {
    var room = 'Room2';
    var res = users.getUserList(room);
    expect(res).toEqual(['three']);
  });
});