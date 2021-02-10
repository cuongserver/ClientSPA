namespace DemoCms.Application.Repository
{
    using DemoCms.Domain.IdentityAndAccess;
    using System;
    using System.Threading.Tasks;

    #region Interfaces

    public interface IRoleAssignmentRepository
    {
        #region Methods

        Task<RoleAssignment> GetAssignementByUserId(Guid userId);

        #endregion
    }

    #endregion
}
