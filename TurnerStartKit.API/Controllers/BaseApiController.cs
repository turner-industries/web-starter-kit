using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Mediator;

namespace TurnerStarterKit.Api.Controllers
{
    public class BaseApiController : Controller
    {
        public IMediator Mediator { get; set; }

        protected IActionResult Handle(IRequest request, HttpStatusCode successCode = HttpStatusCode.OK)
        {
            var response = Mediator.Handle(request);
            return HandleResult(response, successCode);
        }

        protected IActionResult Handle<T>(IRequest<T> request, HttpStatusCode successCode = HttpStatusCode.OK)
        {
            var response = Mediator.Handle(request);
            return HandleResult(response, successCode);
        }

        private IActionResult HandleResult(Response response, HttpStatusCode successCode)
        {
            if (response.HasErrors)
            {
                if (response.Errors.Any(x => x.PropertyName == "[Unauthorized]"))
                {
                    return Unauthorized();
                }

                return BadRequest(response);
            }

            return StatusCode((int)successCode, response);
        }
    }
}