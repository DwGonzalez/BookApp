using Backend.Models;
using System;
using System.Threading.Tasks;

namespace ExternalServices.Interface
{
    public interface IBookService
    {
        Task CreateBook(Book book);
        Task UpdateBook(int id, Book book);
        Task GetAllBooks();
        Task GetBook(int id);
        Task DeleteBook(int id);
    }
}
