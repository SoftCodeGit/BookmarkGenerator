using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softcore.BookmarkGenerator.API.Helpers
{
    public class SqlConnectionStringHelper
    {
        private readonly string _dbServerName;
        private readonly string _dbName;
        private readonly string _dbUser = "sa"; // put into appsettings.json?
        private readonly string _dbPassword = "Handbasket2003"; // put into appsettings.json?
        private readonly string _connectionStringTemplate = "Server={0};Database={1};User={2};Password={3}";

        public SqlConnectionStringHelper(string dbServerName, string dbName)
        {
            _dbServerName = dbServerName;
            _dbName = dbName;
        }

        public string ConnectionString {
            get
            {
                return string.Format(_connectionStringTemplate, _dbServerName, _dbName, _dbUser, _dbPassword);
            }
        }
    }
}
