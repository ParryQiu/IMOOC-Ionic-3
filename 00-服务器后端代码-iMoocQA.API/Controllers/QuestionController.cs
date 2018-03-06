using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using iMoocQA.Data;
using Newtonsoft.Json.Linq;

namespace iMoocQA.API.Controllers
{
    public class QuestionController : ApiController
    {
        private readonly JavaScriptSerializer _javaScriptSerializer = new JavaScriptSerializer();

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string Save(string userId, string title, string content)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(title) && !string.IsNullOrEmpty(content) && !string.IsNullOrEmpty(userId))
            {
                QuestionBll.Save(userId, title, content);
                returnData.Status = "OK";
                returnData.StatusContent = "发表成功";
            }
            else
            {
                returnData.Status = "PARAERROR";
                returnData.StatusContent = "参数错误";
            }
            return _javaScriptSerializer.Serialize(returnData);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string SaveFavourite(string questionId, string userId)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(questionId) && !string.IsNullOrEmpty(userId))
            {
                iMoocQA.Data.UserFavourite.Save(userId, questionId);
                returnData.Status = "OK";
                returnData.StatusContent = "发表成功";
            }
            else
            {
                returnData.Status = "PARAERROR";
                returnData.StatusContent = "参数错误";
            }
            return _javaScriptSerializer.Serialize(returnData);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string List(int index, int number)
        {
            var collection = QuestionBll.GetList(index, number);
            return _javaScriptSerializer.Serialize(collection);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string Get(string id)
        {
            var entity = QuestionBll.Get(id);
            return _javaScriptSerializer.Serialize(entity);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string GetWithUser(string id, string userId)
        {
            var entity = QuestionBll.Get(id, userId);
            return _javaScriptSerializer.Serialize(entity);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string Answer(string userId, string questionId, string content)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(questionId) && !string.IsNullOrEmpty(content))
            {
                QuestionBll.Answer(userId, questionId, content);
                returnData.Status = "OK";
                returnData.StatusContent = "回答成功";
            }
            else
            {
                returnData.Status = "PARAERROR";
                returnData.StatusContent = "参数错误";
            }
            return _javaScriptSerializer.Serialize(returnData);
        }
    }
}
