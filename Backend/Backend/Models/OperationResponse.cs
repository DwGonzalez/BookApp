namespace Backend.Models
{
    public class OperationResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; } = true;
        public dynamic Data { get; set; }
    }
}
