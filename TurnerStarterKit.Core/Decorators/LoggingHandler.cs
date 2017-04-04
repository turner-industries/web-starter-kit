using System.Collections.Generic;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Extensions;
using TurnerStarterKit.Core.Logging;
using TurnerStarterKit.Core.Mediator;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Decorators
{
    public class LoggingHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IRequest
    {
        private readonly ILogger _logger;
        private readonly IRequestHandler<TRequest> _inner;

        public LoggingHandler(ILogger logger, IRequestHandler<TRequest> inner)
        {
            _logger = logger;
            _inner = inner;
        }

        public Response Handle(TRequest request)
        {
            var response = _inner.Handle(request);

            _logger.Info($"Executed {typeof(TRequest).GetPrettyName()}",
                new LoggingResult<TRequest>
                {
                    Errors = response.Errors,
                    Result = response,
                    Request = request,
                });

            return response;
        }
    }

    public class LoggingHandler<TRequest, TResult> : IRequestHandler<TRequest, TResult> where TRequest : IRequest<TResult>
    {
        private readonly IRequestHandler<TRequest, TResult> _inner;
        private readonly ILogger _logger;

        public LoggingHandler(IRequestHandler<TRequest, TResult> inner, ILogger logger)
        {
            _inner = inner;
            _logger = logger;
        }

        public Response<TResult> Handle(TRequest request)
        {
            var response = _inner.Handle(request);

            _logger.Info($"Executed {typeof(TRequest).GetPrettyName()}",
                new LoggingResult<TRequest, TResult>
                {
                    Errors = response.Errors,
                    Result = response.Result,
                    Request = request,
                });

            return response;
        }
    }

    public class LoggingResult<TRequest>
    {
        public TRequest Request { get; set; }
        public List<Error> Errors { get; set; }
        public Response Result { get; set; }
    }

    public class LoggingResult<TRequest, TResult>
    {
        public TRequest Request { get; set; }
        public List<Error> Errors { get; set; }
        public TResult Result { get; set; }
    }
}