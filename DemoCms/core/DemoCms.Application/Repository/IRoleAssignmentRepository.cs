namespace DemoCms.Application.Repository
{
    using DemoCms.Domain.IdentityAndAccess;
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    #region Interfaces

    public interface IRoleAssignmentRepository
    {
        #region Methods

        Task<RoleAssignment> GetAssignementByUserId(Guid userId);
        IQueryable<RoleAssignment> GetAll();

        #endregion
    }

    #endregion
}
