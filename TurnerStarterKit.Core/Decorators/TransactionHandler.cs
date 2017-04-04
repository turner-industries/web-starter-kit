using System;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Logging;
using TurnerStarterKit.Core.Mediator;

namespace TurnerStarterKit.Core.Decorators
{
    public class TransactionHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IRequest
    {
        private readonly Func<IRequestHandler<TRequest>> _decorateeFactory;
        private readonly BaseTransactionHandler<Response> _transactionHandler;

        public TransactionHandler(Func<IRequestHandler<TRequest>> decorateeFactory,
            BaseTransactionHandler<Response> transactionHandler)
        {
            _decorateeFactory = decorateeFactory;
            _transactionHandler = transactionHandler;
        }

        public Response Handle(TRequest request)
        {
            return _transactionHandler.Handle(() => _decorateeFactory().Handle(request));
        }
    }

    public class TransactionHandler<TRequest, TResult> : IRequestHandler<TRequest, TResult> where TRequest : IRequest<TResult>
    {
        private readonly Func<IRequestHandler<TRequest, TResult>> _decorateeFactory;
        private readonly BaseTransactionHandler<Response<TResult>> _transactionHandler;
        private readonly ILogger _logger;

        public TransactionHandler(
            Func<IRequestHandler<TRequest, TResult>> decorateeFactory,
            BaseTransactionHandler<Response<TResult>> transactionHandler,
            ILogger logger)
        {
            _decorateeFactory = decorateeFactory;
            _transactionHandler = transactionHandler;
            _logger = logger;
        }

        public Response<TResult> Handle(TRequest request)
        {
            var response = _transactionHandler.Handle(() => _decorateeFactory().Handle(request));

            return response;
        }
    }

    public class BaseTransactionHandler<TResult> where TResult : Response
    {
        private readonly DataContext _context;

        public BaseTransactionHandler(DataContext context)
        {
            _context = context;
        }

        public TResult Handle(Func<TResult> handler)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                var result = handler();
                if (result.HasErrors)
                {
                    transaction.Rollback();
                    return result;
                }

                _context.SaveChanges();
                transaction.Commit();
                return result;
            }
        }
    }
}