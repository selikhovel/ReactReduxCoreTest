using DataSource.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Internal;

namespace DataSource
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Initialize();
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
                entity.HasKey(o => o.CategoryId);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey("CategoryId");
                entity.Property(e => e.Name).IsRequired();
                entity.HasKey(c => c.ProductId);
            });
        }

        public void Initialize()
        {
            // Look for any board games.
            if (Products.Any())
            {
                return;   // Data was already seeded
            }

            this.Categories.AddRange(
                new Category { CategoryId = 1, Name = "firstClass" }, new Category { CategoryId = 2, Name = "secondClass" }
               );
            this.Products.AddRange(
                new Product() { CategoryId = 1, ProductId = 1, Category = Categories.Find(1), Name = "VISI/Pocket", IsActive = true, Price = 999 },
                new Product() { CategoryId = 2, ProductId = 2, Category = Categories.Find(2), Name = "VISI/Frame", IsActive = true, Price = 888.10m },
                new Product() { CategoryId = 2, ProductId = 3, Category = Categories.Find(2), Name = "VISI/product3", IsActive = false, Price = 100500 },
                new Product() { CategoryId = 1, ProductId = 4, Category = Categories.Find(1), Name = "VISI/product4", IsActive = false, Price = 100.500m },
                new Product() { CategoryId = 1, ProductId = 5, Category = Categories.Find(1), Name = "VISI/product5", IsActive = false, Price = 123m },
                new Product() { CategoryId = 2, ProductId = 6, Category = Categories.Find(2), Name = "VISI/product6", IsActive = true, Price = 123 }
                );

            this.SaveChanges();
        }
    }
}
