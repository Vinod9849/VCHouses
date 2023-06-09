using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Data.Entites;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitofWork _uow;
        private readonly IConfiguration _configuration;
        public AccountController(IUnitofWork uow, IConfiguration configuration)
        {
            _uow = uow;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReqDto)
        {
            var user = await _uow.UserRepository.Authounticate(loginReqDto.UserName, loginReqDto.Password);

            if (user == null)
            {
                throw new UnauthorizedAccessException();
            }
            LoginResDto respons = new LoginResDto
            {
                UserName = user.UserName,
                Token = CreateJWT(user)
            };

            return Ok(respons);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto registerReqDto)
        {
            if (await _uow.UserRepository.UserAlredyExists(registerReqDto.UserName))
                return BadRequest("User already exists,Please try another.");

            _uow.UserRepository.Register(registerReqDto.UserName, registerReqDto.Password);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(UserEntity userEntity)
        {
            var securityKey = _configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,userEntity.UserName),
                new Claim(ClaimTypes.NameIdentifier,userEntity.Id.ToString()),
            };

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}
