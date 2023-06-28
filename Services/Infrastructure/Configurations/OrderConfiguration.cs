using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Infrastructure.Configurations
{
    public class OrderConfiguration: IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.OrderId); // Primary key of table
            builder.Property(x => x.OrderId).ValueGeneratedOnAdd();

            builder.Property(x => x.Comment).HasMaxLength(100);
            builder.Property(x => x.Address).HasMaxLength(100);

            builder.HasOne(x => x.UserBuyer)
                .WithMany(x => x.CreatedOrders)
                .HasForeignKey(x => x.UserBuyerId)
                .IsRequired(false);



        }
    }
}
