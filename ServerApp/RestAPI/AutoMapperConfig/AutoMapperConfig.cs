using AutoMapper;
using DataStorage;
using Service.DTO.Output.Authentication;
using Service;
using RestAPI.Models.Response;

namespace RestAPI.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            this.ConfigureMappingServiceLayer();
            CreateMap<UserLoginResponse, OutputAuthentication>().ReverseMap();
        }
    }
}
