﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data.Entity;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitofWork _uow;
        private readonly IMapper _mapper;
        public CityController(IUnitofWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        //Get api/Cityes
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            //throw new UnauthorizedAccessException();
            var cities = await _uow.CityRepository.GetCitiesAsync();
            var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(citiesDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            if (cityDto != null)
            {
                var cityEntity = _mapper.Map<CityEntity>(cityDto);
                cityEntity.UpdatedOn = DateTime.Now;
                cityEntity.UpdatedBy = 1;

                _uow.CityRepository.AddCityAsync(cityEntity);
                await _uow.SaveAsync();
                return StatusCode(201);
            }

            return StatusCode(404);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("Update not allowed.");

            var updateCity = await _uow.CityRepository.FindCity(id);

            if (updateCity == null)
                return BadRequest("Update not allowed.");

            updateCity.UpdatedOn = DateTime.Now;
            updateCity.UpdatedBy = 1;
            _mapper.Map(cityDto, updateCity);
            await _uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<CityEntity> cityEntityPatch)
        {
            var updateCityPatch = await _uow.CityRepository.FindCity(id);
            updateCityPatch.UpdatedBy = 1;
            updateCityPatch.UpdatedOn = DateTime.Now;

            cityEntityPatch.ApplyTo(updateCityPatch, ModelState);
            await _uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _uow.CityRepository.DeleteCity(id);
            await _uow.SaveAsync();
            return Ok(id);
        }
    }
}
