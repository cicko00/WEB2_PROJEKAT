export class User {
    constructor(
      UserId="",
      UserName="",
      Password="",
      FirstName="",
      LastName="",
      DateOfBirth="",
      Address="",
      Email="",
      Image="",
      FbUser,
      UserType=""
    ) {
      this.userId=UserId;
      this.userName = UserName;
      this.password = Password;
      this.firstName = FirstName;
      this.lastName = LastName;
      this.dateOfBirth = DateOfBirth;
      this.address = Address;
      this.email = Email;
      this.image = Image;
      this.fbUser = FbUser;
      this.userType = UserType;
    }
  }
  export default User;
  
  