using AutoMapper;
using WebAPI.Data.Entity;
using WebAPI.Dtos;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<CityEntity, CityDto>().ReverseMap();

            //also we can ReverseMap like this.
            //CreateMap<CityDto, CityEntity>();
        }
    }
}
