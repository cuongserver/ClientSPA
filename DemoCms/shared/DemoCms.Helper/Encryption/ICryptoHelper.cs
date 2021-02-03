namespace DemoCms.Helper.Encryption
{
    public interface ICrypytoHelper
    {
        string GenerateSalt(string loginName);
        string GenerateHashedPassword(string password, string salt);
    }
}