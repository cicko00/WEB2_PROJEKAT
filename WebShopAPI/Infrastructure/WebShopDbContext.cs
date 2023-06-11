using Microsoft.EntityFrameworkCore;
using WebShopAPI.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WebShopAPI.Infrastructure
{
    public class WebShopDbContext : DbContext
    {
        public WebShopDbContext(DbContextOptions<WebShopDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(WebShopDbContext).Assembly);

            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(op => op.ProductId);

            modelBuilder.Entity<OrderProduct>()
                .Property(op => op.Quantity);

            modelBuilder.Entity<OrderProduct>()
                .ToTable("OrderProducts"); // You can specify a custom table name if needed
        }

    }
}
