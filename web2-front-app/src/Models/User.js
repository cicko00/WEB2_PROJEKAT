export class User {
    constructor(
      UserName,
      Password,
      FirstName,
      LastName,
      DateOfBirth,
      Address,
      Email,
      PhotoString,
      FbUser,
      UserType
    ) {
      this.UserName = UserName;
      this.Password = Password;
      this.FirstName = FirstName;
      this.LastName = LastName;
      this.DateOfBirth = DateOfBirth;
      this.Address = Address;
      this.Email = Email;
      this.PhotoString = PhotoString;
      this.FbUser = FbUser;
      this.UserType = UserType;
    }
  }
  export default User;
  
  