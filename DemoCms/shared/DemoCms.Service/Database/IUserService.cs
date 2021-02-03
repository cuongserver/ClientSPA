using DemoCms.Service.DTO.Output;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
	public interface IUserService
	{
		Task<AuthOutput> Authenticate(string password, string loginName, string secretKey, int validPeriodInMinutes);
	}
}