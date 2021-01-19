using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Service
{
    public class AvatarImageStorageService : IAvatarImageStorageService
    {
        public async Task<string> SaveImage(IFormFile file, Guid id, string fileName)
        {
            var folderName = Path.Combine("Resources", "Avatar");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fullPath = Path.Combine(pathToSave, id.ToString() + "-" + fileName);
            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);
            return fullPath;
        }
    }
}
