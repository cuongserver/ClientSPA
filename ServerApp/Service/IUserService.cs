using System;
using System.Collections.Generic;
using System.Text;
using Service.DTO.Output.Authentication;
using Service.DTO.Output.AddMember;
using Service.DTO.Input.AddMember;
using System.Threading.Tasks;
namespace Service
{
    public interface IUserService
    {
        Task<OutputAuthentication> Authenticate(string password, string userName, string pepper);
        Task<OutputAddMember> AddNewMember(InputAddMember member, string pepper);
        Task<int> UpdateAvatar(Guid imageId, Guid userId);
    }
}
