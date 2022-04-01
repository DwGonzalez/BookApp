using Backend.Models;
using ExternalServices.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Service
{
    public class BookService : IBookService
    {
        static readonly HttpClient _client;

        static BookService()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api");
        }

        public async Task<OperationResponse> CreateBook(Book book)
        {
            var result = await _client.PostAsJsonAsync("/v1/Books", book);

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Message = result.IsSuccessStatusCode ? "Book created" : "Something went wrong!";
            op.Data = await result.Content.ReadFromJsonAsync<Book>();

            return op;
        }

        public async Task<OperationResponse> DeleteBook(int id)
        {
            var result = await _client.DeleteAsync($"/v1/Books/{id}");

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Message = result.IsSuccessStatusCode ? "Book deleted" : "Something went wrong!";

            return op;
        }

        public Task<OperationResponse> GetAllBooks()
        {
            throw new NotImplementedException();
        }

        public Task<OperationResponse> GetBook(int id)
        {
            throw new NotImplementedException();
        }

        public Task<OperationResponse> UpdateBook(int id, Book book)
        {

            throw new NotImplementedException();
        }
    }
}
