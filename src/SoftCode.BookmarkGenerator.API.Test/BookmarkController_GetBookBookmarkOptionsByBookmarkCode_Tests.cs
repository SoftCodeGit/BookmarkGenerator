using Xunit;
using Moq;
using SoftCode.BookmarkGenerator.API.Controllers;
using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.Common.Helpers;
using SoftCode.BookmarkGenerator.Common.Repository;
using Softcore.BookmarkGenerator.API.ViewModelHelpers;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http.Internal;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace SoftCode.BookmarkGenerator.API.Test
{
    /// <summary>
    /// Test class for BookmarkController.GetBookBookmarkOptionsByBookmarkCode
    /// Separate class for each end point/method seems to be cleaner
    /// Testing Framework: xUnit
    /// Mocking Framework: Moq, this is from a fork created by Microsoft. In Nuget Package Manager add a new source: https://api.nuget.org/v3/index.json
    /// </summary>
    public class BookmarkController_GetBookBookmarkOptionsByBookmarkCode_Tests
    {
        private BookmarkController _subject;
        private Mock<IBookmarkRepository> _repository;
        private Mock<IConnectionStringHelper> _helper;
        private Mock<ILogger<BookmarkController>> _logger;
        private List<BookmarkOption> _returnObject;
        private Mock<IBookmarkValueMapper> _valueMapping;
  
        /// <summary>
        /// Set up testing objects in the constructor
        /// </summary>
        public BookmarkController_GetBookBookmarkOptionsByBookmarkCode_Tests()
        {
            // TO-DO: pull Setup to a base class for reuse
            SetupBookmarkControllerDependencies();
            _subject.ActionContext = new ActionContext
            {
                // We can set the context for the request here
                // For example, if the controller is requires authentication,
                // we can mock a user here to gain passage to the controller
                // For illustration purpose only, we don't need it for these tests
                HttpContext = new DefaultHttpContext
                {
                    User = new GenericPrincipal(new GenericIdentity("Tester"), null)
                }
            };
        }

        /// <summary>
        /// Try to use the test name to show the purpose of the test
        /// </summary>
        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Success_Test()
        {
            // Note that controller's Model State is not checked here because we are
            // not going through the normal MVC request pipeline
            var result = _subject.GetBookmarkOptionsByBookmarkCode(new DatabaseLocation(), "code");
            Assert.IsType<ObjectResult>(result);
        }

        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Failed_ModelState_Null()
        {
            // a null model should trigger a failure, regardless of request pipeline
            var result = _subject.GetBookmarkOptionsByBookmarkCode(null, "code");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Failed_ModelState_Is_Checked()
        {
            // to test that Model state is checked, we manually create a model state error here
            _subject.ModelState.AddModelError("", "Error");

            var result = _subject.GetBookmarkOptionsByBookmarkCode(new DatabaseLocation(), "code");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Model_IsValid()
        {
            // Need to check the model that we post is valid separately
            // We are not going to test how the framework handle the posting of the model via the request pipeline
            // We are just going to test that DataAnnotations are in place for the model
            var dataBaseLocation = new DatabaseLocation
            {
                DbName = "someDB",
                ServerName = "someServer"
            };

            var context = new ValidationContext(dataBaseLocation);
            var result = new List<ValidationResult>();

            var valid = Validator.TryValidateObject(dataBaseLocation, context, result);
            Assert.True(valid);
        }

        /// <summary>
        /// Separate test for ModelState
        /// </summary>
        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Model_Missing_DbName()
        {
            // If DBName is missing, model validation should fail
            var dataBaseLocation = new DatabaseLocation
            {
                DbName = null,
                ServerName = "someServer"
            };

            var context = new ValidationContext(dataBaseLocation);
            var result = new List<ValidationResult>();

            var valid = Validator.TryValidateObject(dataBaseLocation, context, result);

            Assert.False(valid);
            var failure = Assert.Single(result);
            Assert.Single(failure.MemberNames, x => x == "DbName");
        }

        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Failed_Invalid_BookmarkCode_Test()
        {
            // set up reposistory to return null
            // note, can't just use null directly
            // need List<BookmarkOption> = null
            _returnObject = null;
            _repository.Setup(r => r.GetBookBookmarkOptionsByBookmarkCode(It.IsAny<string>()))
                .Returns(_returnObject);

            var result = _subject.GetBookmarkOptionsByBookmarkCode(new DatabaseLocation(), "badCode");
            Assert.IsType<HttpNotFoundResult>(result);
        }

        [Fact]
        public void GetBookBookmarkOptionsByBookmarkCode_Failed_Repository_Exception_Test()
        {
            _repository.Setup(r => r.GetBookBookmarkOptionsByBookmarkCode(It.IsAny<string>()))
                .Throws(new Exception("This isn't working as expected"));
            var result = _subject.GetBookmarkOptionsByBookmarkCode(new DatabaseLocation(), "code");

            Assert.IsType<BadRequestObjectResult>(result);
            // TO-DO, the following failed because could not configure Mock to be verifiable
            //_logger.Verify(l => l.LogError(It.IsAny<string>(), It.IsAny<Exception>()), Times.Once);
        }

        /// <summary>
        /// Set up all the DI injected mock objects
        /// Note the use of Mock.Object... This always gets me!
        /// </summary>
        private void SetupBookmarkControllerDependencies()
        {
            _helper = new Mock<IConnectionStringHelper>();
            _helper.Setup(h => h.GetConnectionString(It.IsAny<DatabaseLocation>()))
                .Returns("Some Connection String");

            _returnObject = new List<BookmarkOption>();
            _repository = new Mock<IBookmarkRepository>();
            _repository.Setup(r => r.GetBookBookmarkOptionsByBookmarkCode(It.IsAny<string>()))
                .Returns(_returnObject);

            _logger = new Mock<ILogger<BookmarkController>>();
            // TO-DO, figure out why the following is giving a run time error
            //_logger.Setup(l => l.LogError(It.IsAny<string>(), It.IsAny<Exception>())).Verifiable();

            _valueMapping = new Mock<IBookmarkValueMapper>();
            
            _subject = new BookmarkController(_repository.Object, _helper.Object, _logger.Object, _valueMapping.Object);
                
        }
    }
}
