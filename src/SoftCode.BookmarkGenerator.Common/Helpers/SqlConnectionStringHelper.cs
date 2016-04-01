using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.OptionsModel;
using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.Common.Helpers;

namespace SoftCode.BookmarkGenerator.Common.Helpers
{
    public class SqlConnectionStringHelper : IConnectionStringHelper
    {
        private readonly string _dbUser; 
        private readonly string _dbPassword;
        private readonly string _connectionStringTemplate = "Server={0};Database={1};User={2};Password={3}";

        public SqlConnectionStringHelper(IOptions<SqlConnectionStringHelperOptions> options)
        {
            _dbUser = options.Value.UserName;
            _dbPassword = options.Value.Password;
        }

        public string GetConnectionString(DatabaseLocation dbMeta)
        {
            return string.Format(_connectionStringTemplate, dbMeta.ServerName, dbMeta.DbName, _dbUser, _dbPassword);
        }

    }
}
