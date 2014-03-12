using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.WebApi.Contracts
{
    public interface IDataSummary
    {
        Guid Key { get; set; }

        string Name { get; set; }
    }

    public interface IParentDataSummary
    {
        Guid ParentKey { get; set; }

        string ParentName { get; set; }
    }
}