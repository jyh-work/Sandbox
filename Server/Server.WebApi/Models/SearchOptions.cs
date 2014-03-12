using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.WebApi.Models
{
    public enum SearchType
    {
        Contains,
        BeginWith,
        EndWith,
        ExactMatch
    }

    public class SearchOptions
    {
        public SearchOptions()
        {
            CaseInsensitive = true;
            AdvancedSearchValues = new Dictionary<string, object>();
        }

        public bool CaseInsensitive { get; set; }

        public string SearchText { get; set; }

        public SearchType SearchType { get; set; }

        public IDictionary<string, object> AdvancedSearchValues { get; set; }
    }
}