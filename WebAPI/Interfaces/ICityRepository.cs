using WebAPI.Data.Entity;
using WebAPI.Dtos;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<CityEntity>> GetCitiesAsync();
        void AddCityAsync(CityEntity city);
        Task<CityEntity> FindCity(int id);
        void DeleteCity(int cityId);
    }
}
