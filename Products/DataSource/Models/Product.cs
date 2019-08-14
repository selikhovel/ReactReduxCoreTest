using System;
using System.Collections.Generic;
using System.Text;

namespace DataSource.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsActive { get; set; }
        public decimal Price { get; set; }
    }
}
