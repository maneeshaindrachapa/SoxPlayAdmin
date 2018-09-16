

module.exports = function(app){
    Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) throw err;
  
        console.log('Created role:', role);
  
        //make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[2].id
        }, function(err, principal) {
          if (err) throw err;
  
          console.log('Created principal:', principal);
        });
  });
};