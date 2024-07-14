import "./Message.css";
import Markdown from "markdown-to-jsx";

function Message({ role, content,isLoad }) {

    return (
        <div className={`chat__message ${role === "assistant" ? 'chat__message_assistant' : 'chat__message_user'}`}>
                <img
                    src={role === "assistant" ? '/icons/bot.png' : "/icons/user.png"}
                    className={`chat__avatar ${role === "assistant" ? 'chat__avatar_assistant' : 'chat__avatar_user'}`}
                    alt="profile avatar"
                />
                <Markdown children={content} options={{
                        overrides: {
                            p: {
                                props: {
                                    className: 'chat__message-text',
                                },
                            },
                        },
                    }}/>
        </div>
    );
}

export default Message