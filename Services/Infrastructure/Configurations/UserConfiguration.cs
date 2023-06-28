using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Models;

namespace Services.Infrastructure.Configurations
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
