using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoAPIREST.Models.Solicitudes;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ProyectoAPIREST.Models;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {
        private readonly string secretkey;

        public AutenticacionController(IConfiguration config)
        {
            secretkey = config.GetSection("settings").GetSection("secretkey").ToString();
        }

        [HttpPost]
        [Route("Validar")]
        public IActionResult Validar([FromBody] AutorizacionUsuarios request)
        {
            using(Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                //IQueryable<Usuario> usuario;
                //if(request.clave != "")
                //{
                    var usuario = (from user in db.Usuarios
                                   where user.Correo == request.correo && user.Contraseña == request.clave && user.Estado == "A"
                               select user);
                //}else
                //{
                //    usuario = (from user in db.Usuarios
                //                   where user.Correo == request.correo && user.Estado == "A"
                //                   select user);
                //}

                if (usuario.Count() > 0)
                {
                    var keybytes = Encoding.ASCII.GetBytes(secretkey);
                    var claims = new ClaimsIdentity();
                    claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, request.correo));

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = claims,
                        Expires = DateTime.UtcNow.AddSeconds(30),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keybytes), SecurityAlgorithms.HmacSha256Signature),
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                    string tokenCreado = tokenHandler.WriteToken(tokenConfig);

                    return StatusCode(StatusCodes.Status200OK, new { token = tokenCreado });
                }
                else
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, new { token = "" });
                }
            }
        }


    }
}
