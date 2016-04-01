using System.ComponentModel.DataAnnotations;

namespace SoftCode.BookmarkGenerator.Common.DTO
{
    public class DatabaseLocation
    {
        [Required, MaxLength(30)]
        public string ServerName { get; set; }

        [Required, MaxLength(30)]
        public string DbName { get; set; }
    }
}
