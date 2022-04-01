using ExternalServices.Models;
using System.Threading.Tasks;

namespace ExternalServices.Interface
{
    public interface IBookService
    {
        Task<OperationResponse> CreateBook(Book book);
        Task<OperationResponse> UpdateBook(int id, Book book);
        Task<OperationResponse> GetAllBooks();
        Task<OperationResponse> GetBook(int id);
        Task<OperationResponse> DeleteBook(int id);
    }
}
