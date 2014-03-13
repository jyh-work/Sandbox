using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Server.WebApi.Models;

namespace Server.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{option}",
                defaults: new { controller = "Search", action = "GetDeviceItems", option = new SearchOptions() }
                );
        }
    }
}
