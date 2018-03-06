using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;

namespace iMoocQA.API.Controllers
{
    public class FeedsController : ApiController
    {
        private readonly JavaScriptSerializer _javaScriptSerializer = new JavaScriptSerializer();

        // GET api/values
        public string Get()
        {
            var feedBll = new Data.Feed();
            //return new HttpResponseMessage()
            //{
            //    Content = new StringContent(JArray.FromObject(feedBll.GetFeedList()).ToString(), Encoding.UTF8, "application/json")
            //};
            return _javaScriptSerializer.Serialize(feedBll.GetFeedList());
        }

        public void Post([FromBody]string value)
        {

        }
    }
}
