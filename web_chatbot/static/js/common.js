const chatbotToggle = document.querySelector('.chatbot__button');
        const sendChatBtn = document.querySelector('.chatbot__input-box span');
        const chatInput = document.querySelector('.chatbot__textarea');
        const chatBox = document.querySelector('.chatbot__box');
        const chatbotCloseBtn = document.querySelector('.chatbot__header span');
        const inputInitHeight = chatInput.scrollHeight;

        let userMessage;

        const createChatLi = (message, className, time) => {
            const chatLi = document.createElement('li');
            chatLi.classList.add('chatbot__chat', className);
            let chatContent =
                className === 'outgoing'
                    ? `<p class="text-break"></p><span class="d-flex justify-center align-items-center mb-2 outgoing-time">${time}</span>`
                    : `<span class="material-symbols-outlined">smart_toy</span> <p></p><span id="datetime">${time}</span>`;
            chatLi.innerHTML = chatContent;
            chatLi.querySelector('p').textContent = message;
            return chatLi;
        };

        const generateResponse = (incomingChatLi) => {
            const messageElement = incomingChatLi.querySelector('p');
            const userName = localStorage.getItem('username');

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
                },
                body: JSON.stringify({
                    message: [{ role: 'user', content: userMessage }],
                    username: userName
                }),
            };
            fetch('http://127.0.0.1:8000/api/', requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    messageElement.innerHTML = data.message;
                })
                .catch((error) => {
                    messageElement.classList.add('error');
                    messageElement.textContent = 'Oops! Please try again!';
                })
                .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
        };

        document.getElementById("datetime").innerHTML = formatAMPM();
        function formatAMPM() {
            var d = new Date();
            var minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes();
            var hours = d.getHours();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        const handleChat = () => {
            userMessage = chatInput.value.trim();
            if (!userMessage) return;
            chatInput.value = '';
            chatInput.style.height = `${inputInitHeight}px`;

            const outgoingChatLi = createChatLi(userMessage, 'outgoing', formatAMPM());
            chatBox.appendChild(outgoingChatLi);
            chatBox.scrollTo(0, chatBox.scrollHeight);

            if (!localStorage.getItem('username')) {
                localStorage.setItem('username', userMessage);
                document.getElementById('ask-name').style.display = 'none';
                const greetingMessage = `Hello, ${userMessage}! How can I assist you today?`;
                const greetingChatLi = createChatLi(greetingMessage, 'incoming', formatAMPM());
                chatBox.appendChild(greetingChatLi);
                chatBox.scrollTo(0, chatBox.scrollHeight);
                return;
            }

            setTimeout(() => {
                const incomingChatLi = createChatLi('Thinking...', 'incoming', formatAMPM());
                chatBox.appendChild(incomingChatLi);
                chatBox.scrollTo(0, chatBox.scrollHeight);
                generateResponse(incomingChatLi);
            }, 600);
        };

        chatInput.addEventListener('input', () => {
            chatInput.style.height = `${inputInitHeight}px`;
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
                e.preventDefault();
                handleChat();
            }
        });
        chatbotToggle.addEventListener('click', () =>
            document.body.classList.toggle('show-chatbot')
        );
        chatbotCloseBtn.addEventListener('click', () =>
            document.body.classList.remove('show-chatbot')
        );
        sendChatBtn.addEventListener('click', handleChat);

        // Check if user name is already stored
        window.addEventListener('load', () => {
            localStorage.removeItem('username');

            const storedUserName = localStorage.getItem('username');
            if (storedUserName) {
                document.getElementById('ask-name').style.display = 'none';
                const greetingChatLi = createChatLi(greetingMessage, 'incoming', formatAMPM());
                chatBox.appendChild(greetingChatLi);
                chatBox.scrollTo(0, chatBox.scrollHeight);
            }
        });