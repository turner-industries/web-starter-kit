using System.Collections.Generic;
using System.Linq;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Dtos
{
    public class Response
    {
        public bool HasErrors => Errors.Any();

        public List<Error> Errors { get; } = new List<Error>();
    }

    public class Response<TResult> : Response
    {
        public TResult Result { get; set; }
    }
}