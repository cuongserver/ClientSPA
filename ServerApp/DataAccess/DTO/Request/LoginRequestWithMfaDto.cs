namespace DataAccess.DTO.Request
{
    class LoginRequestWithMfaDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string OneTimePassword { get; set; }
    }
}
