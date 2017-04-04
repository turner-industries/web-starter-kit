using System.Threading.Tasks;
using TurnerStarterKit.Core.Dtos;

namespace TurnerStarterKit.Core.Mediator
{
    public interface IRequestHandler<in TRequest> where TRequest : IRequest
    {
        Response Handle(TRequest request);
    }

    public interface IRequestHandler<in TRequest, TResult> where TRequest : IRequest<TResult>
    {
        Response<TResult> Handle(TRequest request);
    }

    public interface IAsyncRequestHandler<in TRequest> where TRequest : IRequest
    {
        Task<Response> HandleAsync(TRequest request);
    }

    public interface IAsyncRequestHandler<in TRequest, TResult> where TRequest : IRequest<TResult>
    {
        Task<Response<TResult>> HandleAsync(TRequest request);
    }
}