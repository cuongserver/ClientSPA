using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Models
{
	public class AuthRequest
	{
		public string LoginName { get; set; }
		public string Password { get; set; }
	}
}
