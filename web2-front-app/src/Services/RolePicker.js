

export function PickRole() {
    var roles={
      isBuyer:false,
      isSeller:false,
      isAdmin:false
    }
    try {
      var user=JSON.parse(sessionStorage["User"]);
      console.log(user.userType);
      console.log(user.email);
      if(user.userType==='admin'){
        roles.isAdmin=true;
      }
      else if(user.userType==='seller'){
        roles.isSeller=true;
      }
      else if(user.userType==='buyer'){
        roles.isBuyer=true;
      }
      
  }
  catch(error){console.log(error)}

return roles;
}
  export default PickRole();
  