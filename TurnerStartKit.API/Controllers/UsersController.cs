using System.Net;
using Microsoft.AspNetCore.Mvc;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Features.Common;
using TurnerStarterKit.Core.Features.Users;

namespace TurnerStarterKit.Api.Controllers
{
    [Route("api/users")]
    public class UsersController : BaseApiController
    {
        [HttpGet]
        [Route("{id:int}", Name = "GetUserRoute")]
        [ProducesResponseType(typeof(GetUserDto), (int)HttpStatusCode.OK)]
        public IActionResult Get(int id)
        {
            return Handle(new GetUserRequest(id), HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("", Name = "GetUsersRoute")]
        [ProducesResponseType(typeof(PagedResponse<GetUserDto>), (int)HttpStatusCode.OK)]
        public IActionResult Get([FromQuery]GetUsersRequest request)
        {
            return Handle(request, HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("", Name = "AddUserRoute")]
        [ProducesResponseType(typeof(AddUserResponse), (int)HttpStatusCode.Created)]
        public IActionResult AddUser([FromBody]AddUserRequest request)
        {
            return Handle(request, HttpStatusCode.Created);
        }

        [HttpPut]
        [Route("", Name = "EditUserRoute")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        public IActionResult EditUser([FromBody]EditUserRequest request)
        {
            return Handle(request, HttpStatusCode.OK);
        }
    }
}