

export function RolePicker() {
    var roles={
      isBuyer:false,
      isSeller:false,
      isAdmin:false
    }
    try {
      var user=JSON.parse(sessionStorage["User"]);
      if(user.UserType==='admin'){
        roles.isAdmin=true;
      }
      else if(user.UserType==='seller'){
        roles.isSeller=true;
      }
      else if(user.UserType==='buyer'){
        roles.isBuyer=true;
      }
      
  }
  catch(error){}

return roles;
}
  export default RolePicker();
  