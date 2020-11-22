using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("image-upload")]
    public class ImageUploadController : ControllerBase
    {
        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromForm] UploadPacket packet)
        {
            try
            {
                var files = packet.Files;
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (files.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }

                foreach (var file in files)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName); //you can add this path to a list and then return all dbPaths to the client if require
                    using var stream = new FileStream(fullPath, FileMode.Create);
                    await file.CopyToAsync(stream);
                }
                return Ok("All the files are successfully uploaded");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        public class UploadPacket
        {
            public List<IFormFile> Files { get; set; }
            public string Metadata { get; set; }
        }
    }
}
