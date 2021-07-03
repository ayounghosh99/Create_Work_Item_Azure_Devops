using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    static class Azure
    {
        public const string BASE = "https://dev.azure.com";
        public const string PAT = "h4btwjoms5teytulymiss7g3cjmqzjuuwghml4cibz7kp6tn2lgq";
        public const string ORG = "Veena0200";
        public const string API = "api-version=6.0";
        public const string PROJECT = "test proj";
        public const string WIT_TYPE = "$L1 Objective";
    }

    [Route("api/[controller]")]
    [ApiController]
    public class WorkItemController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public WorkItemController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(WorkItem workItem)
        {
            // Create and initialize HttpClient instance.
            HttpClient client = new HttpClient();

            // Set Media Type of Response.
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Generate base64 encoded authorization header.
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", "", Azure.PAT))));

            // Build the URI for creating Work Item.
            string uri = String.Join("?", String.Join("/", Azure.BASE, Azure.ORG, Azure.PROJECT, "_apis/wit/workitems", Azure.WIT_TYPE), Azure.API);

            // Create Request body in JSON format.
            string json = "[" +
                "{ \"op\": \"add\", \"path\": \"/fields/System.Title\", \"from\": null, \"value\": \"" + workItem.Title + "\"}," +
                "{ \"op\": \"add\", \"path\": \"/fields/System.Description\", \"from\": null, \"value\": \"" + workItem.Objective + "\"}," +
                "{ \"op\": \"add\", \"path\": \"/fields/Custom.NeedByDate\", \"from\": null, \"value\": \"" + workItem.NeedByDate + "\"}," +
                "{ \"op\": \"add\", \"path\": \"/fields/Custom.Impact\", \"from\": null, \"value\": \"" + workItem.Impact + "\"}," +
                "]";
            HttpContent content = new StringContent(json, Encoding.UTF8, "application/json-patch+json");

            // Call CreateWIT method.
            string result = CreateWIT(client, uri, content).Result;

            // Pretty print the JSON if result not empty or null.
            if (!String.IsNullOrEmpty(result))
            {
                dynamic wit = JsonConvert.DeserializeObject<object>(result);
                //Console.WriteLine(JsonConvert.SerializeObject(wit, Formatting.Indented));
                return new JsonResult(JsonConvert.SerializeObject(wit, Formatting.Indented));
            }

            client.Dispose();
            return new JsonResult("Added Successfully");

        }

        public static async Task<string> CreateWIT(HttpClient client, string uri, HttpContent content)
        {
            try
            {
                // Send asynchronous POST request.
                using (HttpResponseMessage response = await client.PostAsync(uri, content))
                {
                    response.EnsureSuccessStatusCode();
                    return (await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return string.Empty;
            }
        } // End of CreateWIT method
    }
}