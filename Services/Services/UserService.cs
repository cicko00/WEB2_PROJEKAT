using AutoMapper;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.DTO;
using Services.Infrastructure;
using Services.IServices;
using Services.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Services.IRepository;

namespace Services.Services
{
    public class UserService:IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly UsersDbContext _dbContext;
        private readonly IUserRepository _userreposotory;


        public UserService(IMapper mapper, IConfiguration config, UsersDbContext dbContext,IUserRepository iu)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
            _userreposotory = iu;
            _dbContext=dbContext;
        }

        public string Login(UserCredentialsDto credentialsDto)
        {
            UserDto user;
           
                user = _userreposotory.GetUserByLogin(credentialsDto.Email);
            
            if(user==null)
            {
                return "!";
            }

           




            if (user.Fbuser != true && !BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password))
            {
                return "!";
            }








            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim("UserType", user.UserType));

            claims.Add(new Claim("UserId", Convert.ToString(user.UserId)));
            claims.Add(new Claim("UserName", user.UserName));
            claims.Add(new Claim("Email", user.Email));
            claims.Add(new Claim("FirstName", user.FirstName));
            claims.Add(new Claim("LastName", user.LastName));
            claims.Add(new Claim("Password", user.Password));
            claims.Add(new Claim("DateOfBirth", Convert.ToString(user.DateOfBirth)));

            claims.Add(new Claim("Address", user.Address));
            claims.Add(new Claim("Verified", Convert.ToString(user.Verified)));

            claims.Add(new Claim("FbUser", Convert.ToString(user.Fbuser)));



            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:44398", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                signingCredentials: signinCredentials
            //kredencijali za potpis

            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;

        }
















        public string AddUser(UserDto newUser)
        {

            if (newUser.Fbuser == true)
            {
                if (newUser.Email != null && newUser.Email.Trim() != "")
                {
                    UserCredentialsDto usr = new UserCredentialsDto();
                    usr.Email = newUser.Email;
                    usr.Password = " ";

                    foreach (UserDto u in _userreposotory.GetAllUsers())
                    {
                        if (newUser.Email == u.Email)
                        {
                            if (u.Fbuser == false)
                            {
                                return "EMAIL IS ALREADY USED BY OTHER ACCOUNT!";
                            }



                            return Login(usr);
                        }
                    }
                    newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                   _userreposotory.AddNewUser(newUser);
                    return Login(usr);

                }

                return "UNABLE TO REGISTER VIA FACEBOOK. TRY OPENING NEW ACCOUNT";


            }
            else
            {
                foreach (UserDto u in _userreposotory.GetAllUsers())
                {
                    if (BCrypt.Net.BCrypt.Verify(newUser.Password, u.Password))
                    {
                        return "PASSWORD ALREADY EXISTS";
                    }
                    else if (newUser.Email == u.Email)
                    {
                        return "EMAIL ALREADY EXISTS";
                    }
                    else if (newUser.UserName == u.UserName)
                    {
                        return "USERNAME ALREADY EXISTS";
                    }
                }
            }
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            _userreposotory.AddNewUser(newUser);
            return "OK";

        }

        public bool DeleteUser(int id)
        {
           return _userreposotory.DeleteUser(id);
        }

        public UserDto GetById(int id)
        {
            return _userreposotory.GetUserById(id);
        }

        public List<UserDto> GetUsers()
        {
            return _userreposotory.GetUsersSellers();
        }

        public UserDto UpdateUser(int id, UserDto newUserData)
        {

            User user = _userreposotory.GetUserByIdUser(id);
            if (newUserData.Password == user.Password)
            {
                if (newUserData.UserName != user.UserName)
                {

                    
                        UserDto usr = _userreposotory.GetUserByUsername(newUserData.UserName);
                        if(usr != null) { return null; }
                    
                    
                }

                user.UserName= newUserData.UserName;
                user.Email = newUserData.Email;

                user.FirstName = newUserData.FirstName;
                user.LastName = newUserData.LastName;
                user.DateOfBirth = newUserData.DateOfBirth;
                user.Image = newUserData.Image;
                user.Address = newUserData.Address;
            }
            else
            {
                if (BCrypt.Net.BCrypt.Verify(newUserData.OldPassword, user.Password))
                {
                    if (_userreposotory.PasswordExists(newUserData.Password))
                    {
                        return null;
                    }
                    else
                    {
                        user.Password = BCrypt.Net.BCrypt.HashPassword(newUserData.Password);
                    }
                }
                else
                {
                    return null;
                }
            }

            _userreposotory.UpdateUser(id,user);
            

            return _mapper.Map<UserDto>(user);
        }

        public UserDto UpdateUserByAdmin(int id, int value)
        {





            User user = _userreposotory.GetUserByIdUser(id);
            user.Verified = value;
           _userreposotory.UpdateUser(id,user);

            return _mapper.Map<UserDto>(user);
        }

        public string getPhoto(int id)
        {
            User user =_userreposotory.GetUserByIdUser(id);
            if (user.Image == null) { return ""; }
            return user.Image;
        }

        public string getProductSellerName(int id)
        {
            return _userreposotory.getProductSellerName(id);
        }
    }
}
