document.addEventListener('DOMContentLoaded', () => {
    async function loadNotifications() {
        try {
            const response = await fetch('notification.json');
            const notifications = await response.json();

            const container = document.getElementById('notification-container');
            notifications.forEach(notification => {
                const notificationElement = document.createElement('div');

                const notificationType = notification.type === 'warning' ? 'warning' : 'default';
                notificationElement.classList.add('notification', notificationType);

                notificationElement.innerHTML = `
                    <span class="close-btn">&times;</span>
                    <h3>${notification.title}</h3>
                    <p>${notification.message}</p>
                `;

                notificationElement.querySelector('.close-btn').addEventListener('click', () => {
                    notificationElement.remove();
                });

                container.appendChild(notificationElement);
            });
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }
    loadNotifications();

    function decodeBase64(encoded) {
        return atob(encoded);
    }

    const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges')) || {};

    document.querySelectorAll('.challenge-form').forEach(form => {
        const challengeId = form.dataset.id;
        const encodedAnswer = form.dataset.answer;
        const answer = decodeBase64(encodedAnswer);
        const solvedStatus = solvedChallenges[challengeId];

        if (solvedStatus) {
            form.parentElement.classList.add('solved');
            form.querySelector('.feedback').textContent = 'Wais Siap Jadi Hacker Nih!';
        }

        form.addEventListener('submit', event => {
            event.preventDefault();

            const answerInput = form.querySelector('input[name="answer"]');

            if (answerInput.value === answer) {
                form.parentElement.classList.add('solved');
                form.querySelector('.feedback').textContent = 'Wais Siap Jadi Hacker Nih!';
                solvedChallenges[challengeId] = true;
                localStorage.setItem('solvedChallenges', JSON.stringify(solvedChallenges));
            } else {
                form.querySelector('.feedback').textContent = 'Salah. Tetottt!';
            }
        });
    });
});
