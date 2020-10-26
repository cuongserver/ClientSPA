using System;
using System.Collections.Generic;
using System.Text;
using Service.DTO.Output.Authentication;
using System.Threading.Tasks;
namespace Service
{
    public interface IUserService
    {
        Task<OutputAuthentication> Authenticate(string password, string userName, string pepper);
    }
}
