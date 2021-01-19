using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Service
{
    public interface IAvatarUploadService
    {
        Task<Guid> UploadImage(IFormFile file, Guid imageId, string fileName, Guid userId);
    }
}