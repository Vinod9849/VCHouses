using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Please enter city name.")]
        [StringLength(50),MinLength(2)]
        [RegularExpression(".*[a-zA-Z].*",ErrorMessage ="Only numeric will not allowed.")]
        public string Name { get; set; }
        [Required(ErrorMessage ="Please enter country name.")]
        public string Country { get; set; }
    }
}
