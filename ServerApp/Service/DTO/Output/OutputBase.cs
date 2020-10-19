using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DTO.Output
{
    public abstract class OutputBase
    {
        public bool Success { get; set; }
        public string ErrorCode { get; set; }
    }
}
