using System.Collections.Generic;

namespace TurnerStarterKit.Core.Features.Common
{
    public class PagedResponse<T> 
    {
        private List<T> _items;

        public List<T> Items
        {
            get { return _items ?? (_items = new List<T>()); }
            set { _items = value; }
        }

        public int TotalItemCount { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public int PageCount { get; set; }
    }
}