using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using iMoocQA.Data;
using System.IO;
using System.Text.RegularExpressions;

namespace iMoocQA.API.Controllers
{
    public class AccountController : ApiController
    {
        private readonly JavaScriptSerializer _javaScriptSerializer = new JavaScriptSerializer();

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string Register(string mobile, string nickname, string password)
        {
            var returnData = new ReturnData();
            Regex regex = new Regex("^1[34578]\\d{9}$");
            if (!regex.Match(mobile).Success)
            {
                returnData.Status = "FAIL";
                returnData.StatusContent = "您输入的手机号码格式不正确。";
            }
            else
            {
                if (!string.IsNullOrEmpty(mobile) && !string.IsNullOrEmpty(password))
                {
                    string error;
                    var result = AccountBll.Save(new AccountPostData()
                    {
                        UserMobile = mobile,
                        UserPassword = password,
                        NickName = nickname
                    }, out error);
                    if (result)
                    {
                        returnData.Status = "OK";
                        returnData.StatusContent = "注册成功";
                    }
                    else
                    {
                        returnData.Status = "FAIL";
                        returnData.StatusContent = error;
                    }
                }
                else
                {
                    returnData.Status = "PARAERROR";
                    returnData.StatusContent = "参数错误";
                }
            }
            return _javaScriptSerializer.Serialize(returnData);
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string Login(string mobile, string password)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(mobile) && !string.IsNullOrEmpty(password))
            {
                var userId = AccountBll.Login(mobile, password);
                if (!string.IsNullOrEmpty(userId))
                {
                    returnData.UserId = userId.ToString();
                    returnData.Status = "OK";
                    returnData.StatusContent = "登录成功";
                }
                else
                {
                    returnData.Status = "FAIL";
                    returnData.StatusContent = "登录失败，请检查您的用户名和密码。";
                }
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
        public string LoginWithMd5(string mobile, string password)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(mobile) && !string.IsNullOrEmpty(password))
            {
                var userId = AccountBll.LoginWithMd5(mobile, password);
                if (!string.IsNullOrEmpty(userId))
                {
                    returnData.UserId = userId.ToString();
                    returnData.Status = "OK";
                    returnData.StatusContent = "登录成功";
                }
                else
                {
                    returnData.Status = "FAIL";
                    returnData.StatusContent = "登录失败，请检查您的用户名和密码。";
                }
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
        public string UserInfo(string userId)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(userId))
            {
                var account = AccountBll.GetUser(userId);
                if (!string.IsNullOrEmpty(userId))
                {
                    returnData.UserId = account.Id.ToString();
                    returnData.UserNickName = account.UserNickName;
                    returnData.UserHeadface = account.UserHeadface;
                    returnData.Status = "OK";
                    returnData.StatusContent = "登录成功";
                }
                else
                {
                    returnData.Status = "FAIL";
                    returnData.StatusContent = "获取用户信息失败";
                }
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
        public string UserNotifications(string userId)
        {
            var notifications = new iMoocQA.Data.Notifications();
            return _javaScriptSerializer.Serialize(notifications.GetNotificationList(userId));
        }

        #region 三个用户资源列表

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string GetUserQuestionList(string userId, string type)
        {
            switch (type.ToUpper())
            {
                case "QUESTION":
                    return _javaScriptSerializer.Serialize(QuestionBll.GetList(userId));
                case "ANSWER":
                    return _javaScriptSerializer.Serialize(QuestionBll.GetUserAnswerList(userId));
                case "FAVOURITE":
                    return _javaScriptSerializer.Serialize(iMoocQA.Data.UserFavourite.GetUserFavourites(userId));
                default:
                    return string.Empty;
            }
        }

        #endregion

        [HttpPost]
        public HttpResponseMessage UploadHeadFace()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        if (postedFile == null) continue;
                        var filePath = HttpContext.Current.Server.MapPath("~/users/" + postedFile.FileName);
                        //先删除
                        if (File.Exists(filePath))
                        {
                            File.Delete(filePath);
                        }
                        postedFile.SaveAs(filePath);
                        AccountBll.UpdateHeadFace(postedFile.FileName.Replace(".jpg", string.Empty).Trim());
                    }
                }
                return response;
            }
            catch (Exception e)
            {
                //在webapi中要想抛出异常必须这样抛出，否则之抛出一个默认500的异常
                var resp = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(e.ToString()),
                    ReasonPhrase = "error"
                };
                throw new HttpResponseException(resp);
            }
        }

        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpGet]
        public string UpdateNickName(string userId, string nickname)
        {
            var returnData = new ReturnData();
            if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(nickname))
            {

                if (AccountBll.UpdateNickName(userId, nickname))
                {
                    returnData.Status = "OK";
                    returnData.StatusContent = "修改成功";
                }
                else
                {
                    returnData.Status = "FAIL";
                    returnData.StatusContent = "您输入的昵称已经被占用，换一个吧。";
                }
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
