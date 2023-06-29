using Services.DTO;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IRepository
{
    public interface IUserRepository
    {
        List<UserDto> GetAllUsers();

        List<UserDto> GetUsersSellers();
        UserDto GetUserById(int id);
        User GetUserByIdUser(int id);

        UserDto GetUserByUsername(string username);
        bool PasswordExists(string password);

        UserDto GetUserByLogin(string email);

        bool AddNewUser(UserDto user);

        bool UpdateUser(int id,User user);

        bool DeleteUser(int id);
        string getProductSellerName(int id);
    }
}
