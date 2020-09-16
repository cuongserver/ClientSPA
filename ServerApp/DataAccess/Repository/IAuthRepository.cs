using DataStorage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IAuthRepository
    {
        Task<User> SignIn(string userName);
    }
}
