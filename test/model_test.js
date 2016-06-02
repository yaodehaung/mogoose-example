var chai = require('chai');
var should = chai.should();
var User = require('../Book.model.js');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);

    })
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);

    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');

    });
  });

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);

    });
  });
});
