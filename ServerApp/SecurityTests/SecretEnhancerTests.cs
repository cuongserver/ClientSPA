using Microsoft.VisualStudio.TestTools.UnitTesting;
using Security;
using System;
using System.Collections.Generic;
using System.Text;

namespace Security.Tests
{
    [TestClass()]
    public class SecretEnhancerTests
    {
        public TestContext TestContext { get; set; }
        [TestMethod()]
        public void GenerateHashedPasswordTest()
        {
            var enhancer = new SecretEnhancer();
            TestContext.WriteLine(enhancer.GenerateHashedPassword("1234", "superuser", "e9ghp6"));
        }
    }
}