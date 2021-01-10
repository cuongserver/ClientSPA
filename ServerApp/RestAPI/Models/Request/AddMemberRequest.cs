using Service.DTO.Input.AddMember;
using System.ComponentModel.DataAnnotations;
namespace RestAPI.Models.Request
{
    public class AddMemberRequest : InputAddMember
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9]{3,10}$")]
        public override string UserName { get => base.UserName; set => base.UserName = value; }
        [Required]
        public override string Password { get => base.Password; set => base.Password = value; }
    }
}
