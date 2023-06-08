using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopAPI.Models;

namespace WebShopAPI.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.UserId); // Primary key of table
            builder.Property(x => x.UserId).ValueGeneratedOnAdd();

            
            builder.HasIndex(x => x.UserName).IsUnique();

            
            

            
            
            builder.Property(x => x.UserType).HasMaxLength(10);


        }
    }
}
