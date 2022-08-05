using Microsoft.AspNetCore.Mvc;
using PigeonBox.Application.Commands.Chats;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using PigeonBox.Core.CQRS;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PigeonBox.API.Controllers
{
    [Route("/api/v1/chatting")]
    [ApiController]
    public class ChattingController : ControllerBase
    {
        private readonly IMediatorHandler _mediator;
        private readonly IChatQueries _chatQueries;

        public ChattingController(IMediatorHandler mediator, IChatQueries chatQueries)
        {
            _mediator = mediator;
            _chatQueries = chatQueries;
        }

        /// <summary>
        /// Start a new chat passing InputModel
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("/chat/start")]
        public async Task<ActionResult<CommandResponse<bool>>> StartNewChat([FromBody] StartChatInputModel input)
        {
            var commandResponse = await _mediator
                .SendCommand(new StartChatCommand(input.UniqueIdentifier, input.CreatorId, input.Title, input.Participants));

            if (!commandResponse.Success)
                return BadRequest(commandResponse.ValidationResult);

            return Ok(commandResponse.ValidationResult);
        }

        /// <summary>
        /// Send new message passing InputModel
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("/chat/message/send")]
        public async Task<ActionResult<CommandResponse<bool>>> SendMessage([FromBody] SendMessageInputModel input)
        {
            var commandResponse = await _mediator
                .SendCommand(new SendMessageCommand(input.UniqueIdentifier, input.Text, input.UserId, input.ChatId));

            if (!commandResponse.Success)
                return BadRequest(commandResponse.ValidationResult);

            return Ok(commandResponse.ValidationResult);
        }

         /// <summary>
        /// Get all chats by User Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("/chat/get")]
        public async Task<ActionResult<IEnumerable<ChatViewModel>>> GetChatsByUserId([FromQuery] int userId)
        {
            var chats = await _chatQueries.GetChatsByUserId(userId);
            return Ok(chats);
        }
    }
}
