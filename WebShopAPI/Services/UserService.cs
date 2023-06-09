using AutoMapper;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{  
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;


        public UserService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public string Login(UserCredentialsDto credentialsDto)
        {
            UserDto user=null;
            try
            {
                 user = _mapper.Map<List<UserDto>>(_dbContext.Users.ToList()).First(x => x.Email == credentialsDto.Email);
            }
            catch(Exception ex)
            {
                return "!";
            }
            

            

            if (user.Fbuser!=true && !BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password))
            {
                return "!";
            }

            



            
            
            
                List<Claim> claims = new List<Claim>();
                
                claims.Add(new Claim("UserType",user.UserType));
                
                   
                claims.Add(new Claim("UserName",user.UserName));
                claims.Add(new Claim("Email", user.Email));
                claims.Add(new Claim("FirstName", user.FirstName));
                claims.Add(new Claim("LastName", user.LastName));
                //claims.Add(new Claim("Address", user.Address));
                claims.Add(new Claim("DateOfBirth",Convert.ToString( user.DateOfBirth)));
                claims.Add(new Claim("Photo", user.Image));
                claims.Add(new Claim("FbUser",Convert.ToString(user.Fbuser)));



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
                if(newUser.Email != null && newUser.Email.Trim() !="") 
                {
                    UserCredentialsDto usr = new UserCredentialsDto();
                    usr.Email = newUser.Email;
                    usr.Password = "";

                    foreach (UserDto u in _mapper.Map<List<UserDto>>(_dbContext.Users.ToList()))
                    {
                        if (newUser.Email == u.Email)
                        {
                            
                            
                            return Login(usr);
                        }
                    }
                    newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                    User userr = _mapper.Map<User>(newUser);
                    _dbContext.Users.Add(userr);
                    _dbContext.SaveChanges();
                    return Login(usr);

                }

                return "UNABLE TO REGISTER VIA FACEBOOK. TRY OPENING NEW ACCOUNT";
                

            }
            else
            {
                foreach (UserDto u in _mapper.Map<List<UserDto>>(_dbContext.Users.ToList()))
                {
                    if (BCrypt.Net.BCrypt.Verify(newUser.Password, u.Password))
                    {
                        return "PASSWORD ALREADY EXISTS";
                    }
                    else if(newUser.Email == u.Email)
                    {
                        return "EMAIL ALREADY EXISTS";
                    }
                    else if(newUser.UserName == u.UserName)
                    {
                        return "USERNAME ALREADY EXISTS";
                    }
                }
            }
            newUser.Password=BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return "OK";
              
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
            catch(Exception e)
            {
                return false;
            }
        }

        public UserDto GetById(int id)
        {
            return _mapper.Map<UserDto>(_dbContext.Users.Find(id));
        }

        public List<UserDto> GetUsers()
        {
            return _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
        }

        public UserDto UpdateUser(int id, UserDto newUserData)
        {
            User user = _dbContext.Users.Find(id);
            user.UserName = newUserData.UserName;
            user.Email = newUserData.Email;
            user.Password = newUserData.Password;
            user.FirstName = newUserData.FirstName;
            user.LastName = newUserData.LastName;
            user.DateOfBirth = newUserData.DateOfBirth;
            user.Image= newUserData.Image;
           
            _dbContext.SaveChanges();

            return _mapper.Map<UserDto>(user);
        }
    }
}
