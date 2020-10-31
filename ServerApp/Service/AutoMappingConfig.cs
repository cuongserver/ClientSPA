using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using AutoMapper;
using DataStorage;
using Service.DTO.Output.Authentication;

namespace Service
{
    public static class MappingConfigExtension
    {
        public static void ConfigureMappingServiceLayer(this Profile profile)
        {
            profile.CreateMap<User, UserDetail>().ReverseMap();
        }
    }
}
