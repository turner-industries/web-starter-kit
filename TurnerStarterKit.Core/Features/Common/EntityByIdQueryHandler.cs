using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Extensions;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Features.Common
{
    public class EntityByIdQueryHandler<TEntity, TDto> 
        where TEntity : class, IEntity
        where TDto : class
    {
        private readonly DataContext _context;

        public ICollection<Expression<Func<TEntity, object>>> Includes { get; set; } 

        public EntityByIdQueryHandler(DataContext context)
        {
            _context = context;
            Includes = new List<Expression<Func<TEntity, object>>>();
        }

        public Response<TDto> Handle(int id)
        {
            IQueryable<TEntity> queryable = _context.Set<TEntity>();

            Includes.ForEach(x => queryable = queryable.Include(x));

            var result = queryable
                .Where(x => x.Id == id)
                .ProjectTo<TDto>()
                .SingleOrDefault();

            var response = new Response<TDto>();
            if (result == null)
            {
                response.Errors.Add(new Error {ErrorMessage = $"{typeof(TEntity).Name} with id {id} was not found.", PropertyName = "Id"});
                return response;
            }

            response.Result = result;
            return response;
        }
    }
}