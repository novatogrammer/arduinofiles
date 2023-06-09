        const responses = document.querySelector("#responses");
        const btn = document.querySelector("#btn");

        createResponse("Hola, soy <i>Novato AI</i> el asistente conectado al sensor de distancia ultrasónico.", "ASSISTANT");
        
        setTimeout(function () {
            createResponse("Para saber la distancia del sensor, haz click en <b>Medir</b>", "ASSISTANT")
        }, 2000)

        btn.addEventListener("click", function () {
                fetch('/sensor')
                    .then(response => response.json())
                    .then(data => {
                        createResponse(`La distancia medida desde el sensor es de <b>${data.distance}cm</b> aproximadamente.`, "SENSOR");
                    })
                    .catch(error => console.error(error));
        });

        function createResponse(text, type) {
            const date = new Date();
            const response = document.createElement("div");
            response.classList.add("response");
            response.setAttribute("id", `response-${date.getTime()}`);
            response.innerHTML = `
            <div class="response-avatar">
                <img src="https://i.scdn.co/image/ab6761610000e5eb4fe0468c1573f0b4692dd14d">
            </div>
            <div class="response-content">
                <div class="response-flex">
                    <div class="response-type">${type}</div>
                    <div class="response-author">NOVATO AI</div>
                </div>
                <div class="response-flex-base">
                    <div class="response-text">${text}</div>
                    <p class="response-time">${date.getHours() <= 12 ? date.getHours() : (date.getHours() - 12 > 9 ? date.getHours() - 12 : `0${+ date.getHours() - 12}`)}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`} ${date.getHours() < 12 ? "a.m." : "p.m."}</p>
                </div>
            </div>
            `;

            responses.appendChild(response);
            Scroll();
        }

        window.scroll({
            top: 2500,
            left: 0,
            behavior: 'smooth'
        });

        function Scroll() {
            document.getElementById("scroll").scrollIntoView({
                behavior: 'smooth'
            });
        }
