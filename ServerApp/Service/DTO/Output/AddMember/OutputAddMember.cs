using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DTO.Output.AddMember
{
    public class OutputAddMember
    {
        public Guid Id { get; set; }
        public AddMemberResult Result { get; set; }

    }

    public enum AddMemberResult
    {
        Success,
        UsernameExists,
        Error
    }
}
