using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager){
            if (!userManager.Users.Any()){
                var user = new AppUser
                {
                    DisplayName = "pasternak",
                    Email = "pasternak@test.com",
                    UserName = "pasternak@test.com",
                    Address = new Address
                    {
                        FirstName = "David",
                        LastName = "Pasternak",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        ZipCode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}