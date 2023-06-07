namespace WebAPI.Interfaces
{
    public interface IUnitofWork
    {
        ICityRepository CityRepository { get; }
        IUserRepository UserRepository { get; }
        Task<bool> SaveAsync();
    }
}
