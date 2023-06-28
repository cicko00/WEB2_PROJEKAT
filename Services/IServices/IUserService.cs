using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto GetById(int id);
        string AddUser(UserDto newUser);
        UserDto UpdateUser(int id, UserDto newUserData);
        UserDto UpdateUserByAdmin(int id, int value);
        bool DeleteUser(int id);
        string getPhoto(int id);

        string Login(UserCredentialsDto credentialsDto);
    }
}
