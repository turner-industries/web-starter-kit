using System;
using System.Linq;
using FluentValidation;
using SimpleInjector;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Logging;
using TurnerStarterKit.Core.Mediator;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Decorators
{
    public class ValidationHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IRequest
    {
        private readonly Func<IRequestHandler<TRequest>> _decorateeFactory;
        private readonly BaseValidationHandler<TRequest, Response> _baseValidationHandler;

        public ValidationHandler(Func<IRequestHandler<TRequest>> decorateeFactory,
            BaseValidationHandler<TRequest, Response> baseValidationHandler)
        {
            _decorateeFactory = decorateeFactory;
            _baseValidationHandler = baseValidationHandler;
        }

        public Response Handle(TRequest request)
        {
            return _baseValidationHandler.Handle(request, () => _decorateeFactory().Handle(request));
        }
    }

    public class ValidationHandler<TRequest, TResult> : IRequestHandler<TRequest, TResult> where TRequest : IRequest<TResult>
    {
        private readonly Func<IRequestHandler<TRequest, TResult>> _decorateeFactory;
        private readonly BaseValidationHandler<TRequest, Response<TResult>> _baseValidationHandler;

        public ValidationHandler(Func<IRequestHandler<TRequest, TResult>> decorateeFactory,
            BaseValidationHandler<TRequest, Response<TResult>> baseValidationHandler)
        {
            _decorateeFactory = decorateeFactory;
            _baseValidationHandler = baseValidationHandler;
        }

        public Response<TResult> Handle(TRequest request)
        {
            return _baseValidationHandler.Handle(request, () => _decorateeFactory().Handle(request));
        }
    }

    public class BaseValidationHandler<TRequest, TResult> where TResult : Response, new()
    {
        private readonly Container _container;
        private readonly ILogger _logger;

        public BaseValidationHandler(Container container, ILogger logger)
        {
            _container = container;
            _logger = logger;
        }

        public TResult Handle(TRequest request, Func<TResult> processRequest)
        {
            var validator = _container.GetInstance<IValidator<TRequest>>();

            var validationResult = validator.Validate(request);
            if (validationResult.IsValid)
            {
                return processRequest();
            }

            var result = new TResult();
            result.Errors.AddRange(validationResult.Errors.Select(x => new Error
            {
                ErrorMessage = x.ErrorMessage,
                PropertyName = x.PropertyName
            }));

            return result;
        }
    }

}