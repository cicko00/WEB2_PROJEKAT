using AutoMapper;
using Microsoft.Extensions.Configuration;
using Services.DTO;
using Services.Infrastructure;
using Services.IRepository;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repository
{



    public class UserRepository : IUserRepository
    {

        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly UsersDbContext _dbContext;


        public UserRepository(IMapper mapper, IConfiguration config, UsersDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }



        public bool AddNewUser(UserDto user)
        {
            try
            {
                User userr = _mapper.Map<User>(user);
                _dbContext.Users.Add(userr);
                _dbContext.SaveChanges();
                return true;
            } catch (Exception ex) { return false; }
        }

        public bool DeleteUser(int id)
        {
            try
            {
                User user = _dbContext.Users.Find(id);
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<UserDto> GetAllUsers()
        {
            return _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
        }

        public UserDto GetUserById(int id)
        {
            return _mapper.Map<UserDto>(_dbContext.Users.Find(id));
        }

        public User GetUserByIdUser(int id)
        {
           return _dbContext.Users.Find(id);
        }

        public UserDto GetUserByLogin(string email)
        {
            try
            {
                return _mapper.Map<List<UserDto>>(_dbContext.Users.ToList()).First(x => x.Email == email);
            }
            catch (Exception ex) { return null; }
        }

        public bool PasswordExists(string password)
        {
            if (_mapper.Map<List<UserDto>>(_dbContext.Users.ToList()).Any(usr => usr.Password == BCrypt.Net.BCrypt.HashPassword(password)))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public UserDto GetUserByUsername(string username)
        {
            try
            {
                return _mapper.Map<UserDto>(_dbContext.Users.ToList().First(x => x.UserName == username));
            }
            catch(Exception ex) { return null; }
        }

        public List<UserDto> GetUsersSellers()
        {
            return _mapper.Map<List<UserDto>>(_dbContext.Users.Where(x => x.UserType == "seller").ToList());
        }

        public bool UpdateUser(int id, User user)
        {
            User u = _dbContext.Users.Find(id);
           u = user;
           _dbContext.SaveChanges();
            return true;
        }

        public string getProductSellerName(int id)
        {
            return _dbContext.Users.Find(id).UserName;
        }
    }
}
