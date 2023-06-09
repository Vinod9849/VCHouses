using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;
using WebAPI.Data.Entites;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<UserEntity> Authounticate(string username, string passwordText)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null || user.PasswordKey == null)
                return null;

            if(!MatchPasswordHas(passwordText,user.Password,user.PasswordKey))
                return null;

            return user;
        }

        private bool MatchPasswordHas(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
              var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

                for(int i=0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                        return false;
                }
                return true;
            }
        }

        public void Register(string userName, string password)
        {
            byte[] passwordKey, passwordHash;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            UserEntity userEntity = new UserEntity
            {
                UserName = userName,
                Password = passwordHash,
                PasswordKey = passwordKey
            };

            _context.Users.Add(userEntity);
        }

        public async Task<bool> UserAlredyExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName);
        }
    }
}
