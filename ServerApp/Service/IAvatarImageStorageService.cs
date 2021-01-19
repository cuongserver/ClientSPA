using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Service
{
    public interface IAvatarImageStorageService
    {
        Task<string> SaveImage(IFormFile file, Guid id, string fileName);
    }
}