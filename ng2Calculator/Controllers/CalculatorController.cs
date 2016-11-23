using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ng2Calculator.Controllers
{
    public class CalculatorController : ApiController
    {
        // GET api/calculator/5/3
        [HttpGet]
        public HttpResponseMessage CalculateResult(int num1, int num2, string calcOperation)
        {
            object result = null;

            try
            {
                switch (calcOperation)
                {
                    case "add":
                        result = num1 + num2;
                        break;
                    case "subtract":
                        result = num1 - num2;
                        break;
                    case "multiply":
                        result = num1 * num2;
                        break;
                    case "divide":
                        result = (float)num1 / num2;
                        break;
                }

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (System.Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }            
        }
    }
}
