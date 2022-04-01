using ExternalServices.Interface;
using ExternalServices.Models;
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
            _client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net");
        }

        public async Task<OperationResponse> CreateBook(Book book)
        {
            var result = await _client.PostAsJsonAsync("/api/v1/Books", book);

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Message = result.IsSuccessStatusCode ? "Book created" : "Something went wrong!";
            op.Data = await result.Content.ReadFromJsonAsync<Book>();

            return op;
        }

        public async Task<OperationResponse> DeleteBook(int id)
        {
            var result = await _client.DeleteAsync($"/api/v1/Books/{id}");

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Message = result.IsSuccessStatusCode ? "Book deleted" : "Something went wrong!";

            return op;
        }

        public async Task<OperationResponse> GetAllBooks()
        {
            var result = await _client.GetAsync("/api/v1/Books");

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Data = await result.Content.ReadFromJsonAsync<List<Book>>();

            return op;
        }

        public async Task<OperationResponse> GetBook(int id)
        {
            var result = await _client.GetAsync($"/api/v1/Books/{id}");

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Data = await result.Content.ReadFromJsonAsync<Book>();

            return op;
        }

        public async Task<OperationResponse> UpdateBook(int id, Book book)
        {
            var result = await _client.PutAsJsonAsync($"/api/v1/Books/{id}", book);

            var op = new OperationResponse();
            op.StatusCode = Convert.ToInt32(result.StatusCode);
            op.Success = result.IsSuccessStatusCode;
            op.Message = result.IsSuccessStatusCode ? "Book updated" : "Something went wrong!";
            op.Data = await result.Content.ReadFromJsonAsync<Book>();

            return op;
        }
    }
}
