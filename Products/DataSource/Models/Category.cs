using System;
using System.Collections.Generic;
using System.Text;

namespace DataSource.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
