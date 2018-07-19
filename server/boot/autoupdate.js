module.exports = function (app) {
  app.dataSources.mysql.autoupdate([
    "ACL", 
    "RoleMapping", 
    "Role",
    "address", 
    "theme", 
    "item", 
    "wishListDetail", 
    "order", 
    "orderDetail", 
    "user",
    "combinationDetails",
  ], err => {
    if(err) throw err;
    console.log('MySql Model Synced.')
  });
};

