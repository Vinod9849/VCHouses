using System.ComponentModel.DataAnnotations;

namespace WebAPI.Data.Entites
{
    public class UserEntity
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
    }
}
