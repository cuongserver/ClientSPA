using AutoMapper;
using DataStorage;
using Service.DTO.Output.Authentication;
using Service;
namespace RestAPI.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            this.ConfigureMappingServiceLayer();
        }
    }
}
