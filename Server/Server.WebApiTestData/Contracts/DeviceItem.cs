using System;

namespace Server.WebApi.Contracts
{
    public class DeviceItem: IDataSummary, IParentDataSummary
    {
        public Guid Key { get; set; }

        public string Name { get; set; }

        public Guid ParentKey { get; set; }

        public string ParentName { get; set; }

        public bool CriticalOverride { get; set; }

        public bool OutOfService { get; set; }
    }
}