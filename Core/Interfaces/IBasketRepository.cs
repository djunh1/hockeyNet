using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
         Task<CustomerBasket> GetBasketAsync(string basketId);
         Task<CustomerBasket> UpdatebasketAsync(CustomerBasket basket);
         Task<bool> DeletebasketAsync(string basketId);
    }
}