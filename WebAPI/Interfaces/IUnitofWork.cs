namespace WebAPI.Interfaces
{
    public interface IUnitofWork
    {
        ICityRepository CityRepository { get; }
        Task<bool> SaveAsync();
    }
}
