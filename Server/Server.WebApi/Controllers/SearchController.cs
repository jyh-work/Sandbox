using System;
using System.Collections.Generic;
using System.Web.Http;
using Server.WebApi.Contracts;
using Server.WebApi.Models;

namespace Server.WebApi.Controllers
{
    public class SearchController : ApiController
    {
        public IEnumerable<DeviceItem> GetDeviceItems(SearchOptions options)
        {
            return FakeGetDevideSummariesFromService(options);
        }


        private static readonly DeviceItem[] FakeDeviceItems =
        {
            new DeviceItem {Key = Guid.NewGuid(), Name = "ICU Med Station 1", ParentName = "UCSD San Marcos"},
            new DeviceItem {Key = Guid.NewGuid(), Name = "ER Station 1", ParentName = "UCSD San Marcos"},
            new DeviceItem {Key = Guid.NewGuid(), Name = "Device 3", ParentName = "UCSD San Marcos"},
            new DeviceItem {Key = Guid.NewGuid(), Name = "ICU Med Station 1", ParentName = "UCSD La Jolla"},
            new DeviceItem {Key = Guid.NewGuid(), Name = "Device 3", ParentName = "UCSD La Jolla"},
            new DeviceItem {Key = Guid.NewGuid(), Name = "ER Station 1", ParentName = "UCSD La Jolla"},
        };

        private IEnumerable<DeviceItem> FakeGetDevideSummariesFromService(SearchOptions options)
        {
            return FakeDeviceItems;
        }
    }
}
