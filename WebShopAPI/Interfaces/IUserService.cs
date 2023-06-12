using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto GetById(int id);
        string AddUser(UserDto newUser);
        UserDto UpdateUser(int id, UserDto newUserData);
        UserDto UpdateUserByAdmin(int id, int value);
        bool DeleteUser(int id);

        string Login(UserCredentialsDto credentialsDto);
    }
}
