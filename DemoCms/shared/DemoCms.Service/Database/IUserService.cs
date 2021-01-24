using DemoCms.Service.DTO.Output;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
	public interface IUserService
	{
		Task<AuthOutput> Authenticate(string password, string loginName, string pepper, string secretKey, int validPeriodInMinutes);
	}
}