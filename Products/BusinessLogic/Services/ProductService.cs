using DataSource;
using DataSource.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetPage(int startIndex);
        Task<Product> GetById(int id);
        Task Update(Product user);
        Task<bool> ProductExists(int id);
        Task<IEnumerable<Category>> GetAllCategories();
    }

    public class ProductService : IProductService
    {
        private DataContext _context;

        public ProductService(DataContext context)
        {
            _context = context;
            _context.Database.EnsureCreated(); //https://github.com/aspnet/EntityFrameworkCore/issues/13322
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync(); ;
        }

        public async Task<IEnumerable<Product>> GetPage(int startIndex)
        {
            return await _context.Products.Include(c => c.Category).Skip(startIndex).Take(5).ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            return await _context.Products.Include(c => c.Category).FirstOrDefaultAsync(c => c.ProductId == id);
        }

        public async Task Update(Product newProduct)
        {
            var existingProduct = await _context.Products.FindAsync(newProduct.ProductId);

            if (existingProduct == null)
                throw new AppException("Product not found");
           
            var existingCategory = await _context.Categories.FindAsync(newProduct.CategoryId);
            if (existingProduct == null)
                throw new AppException("Category not found");

            existingProduct.Name = newProduct.Name;
            existingProduct.IsActive = newProduct.IsActive;
            existingProduct.Price = newProduct.Price;
            existingProduct.CategoryId = newProduct.CategoryId;
            existingProduct.Category = existingCategory;

            _context.Products.Update(existingProduct);

            await _context.SaveChangesAsync();
        }


        public async Task<bool> ProductExists(int id)
        {
            return await _context.Products.AnyAsync(e => e.ProductId == id);
        }
    }
}
