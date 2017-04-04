using SimpleInjector;
using TurnerStarterKit.Core.Dtos;

namespace TurnerStarterKit.Core.Mediator
{
    public interface IMediator
    {
        Response Handle(IRequest request);

        Response<TResult> Handle<TResult>(IRequest<TResult> request);
    }

    public class Mediator : IMediator
    {
        private readonly Container _container;

        public Mediator(Container container)
        {
            _container = container;
        }

        public Response Handle(IRequest request)
        {
            dynamic type = typeof(IRequestHandler<>).MakeGenericType(request.GetType());
            return (Response)HandleBase(type, request);
        }

        public Response<TResult> Handle<TResult>(IRequest<TResult> request)
        {
            dynamic type = typeof(IRequestHandler<,>).MakeGenericType(request.GetType(), typeof(TResult));
            return (Response<TResult>)HandleBase(type, request);
        }

        private object HandleBase(dynamic type, dynamic request)
        {
            var handler = _container.GetInstance(type);
            return handler.Handle(request);
        }
    }
}