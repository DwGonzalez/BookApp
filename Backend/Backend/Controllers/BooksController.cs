using ExternalServices.Interface;
using ExternalServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _service;
        public BooksController(IBookService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var response = await _service.GetAllBooks();

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OperationResponse { StatusCode = 500, Message = ex.Message, Success = false });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var response = await _service.GetBook(id);

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OperationResponse { StatusCode = 500, Message = ex.Message, Success = false });
            }
        }


        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            try
            {
                var response = await _service.CreateBook(book);

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OperationResponse { StatusCode = 500, Message = ex.Message, Success = false });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            try
            {
                var response = await _service.UpdateBook(id, book);

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OperationResponse { StatusCode = 500, Message = ex.Message, Success = false });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var response = await _service.DeleteBook(id);

                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OperationResponse { StatusCode = 500, Message = ex.Message, Success = false });
            }
        }
    }
}
