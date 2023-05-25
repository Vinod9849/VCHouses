using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Data.Entity;
using WebAPI.Dtos;
using System.Globalization;

namespace WebAPI.Data.Repository
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;
        public CityRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CityEntity>> GetCitiesAsync()
        {
            return await _context.Cities.Where(x => x.RowState < 3).ToListAsync();
        }
        public void AddCityAsync(CityEntity city)
        {
            _context.Cities.Add(city);
        }
        public async Task<CityEntity> FindCity(int id)
        {
            return await _context.Cities.FindAsync(id);
        }
        public void DeleteCity(int cityId)
        {
            var city = _context.Cities.Find(cityId);
            if (city != null)
            {
                var deleteItem = _context.Cities.Where(x => x.Id == cityId && x.RowState < 3).SingleOrDefault();
                if (deleteItem != null)
                {
                    deleteItem.RowState = 3;
                    _context.Cities.Update(deleteItem);
                }
            }
        }
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
