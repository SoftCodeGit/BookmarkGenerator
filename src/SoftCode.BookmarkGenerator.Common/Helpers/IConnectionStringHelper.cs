using SoftCode.BookmarkGenerator.Common.DTO;

namespace SoftCode.BookmarkGenerator.Common.Helpers
{
    public interface IConnectionStringHelper
    {
        string GetConnectionString(DatabaseLocation dbMeta);
    }
}
