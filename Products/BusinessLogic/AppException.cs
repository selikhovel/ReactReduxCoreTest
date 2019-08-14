using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic
{
    public class AppException : Exception
    {
        public AppException() : base() { }

        public AppException(string message) : base(message) { }

    }
}
