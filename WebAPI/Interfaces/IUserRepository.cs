using WebAPI.Data.Entites;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<UserEntity> Authounticate(string username, string password);

        void Register(string userName, string password);
        Task<bool> UserAlredyExists(string userName);
    }
}
