namespace DemoCms.Helper.Encryption
{
    public interface IHashHelper
    {
        string GenerateHashedPassword(string password, string loginName, string pepper);
    }
}