/* signer.js - Handles functionality specific to the IPA signer page */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element References ===
    const signForm = document.getElementById('signForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonSpinner = submitButton.querySelector('.spinner');
    const resultsDiv = document.getElementById('results');
    const extrasToggle = document.getElementById('extrasToggle');
    const extrasContent = document.getElementById('extrasContent');
    const chevronIcon = extrasToggle.querySelector('.chevron-icon');

    // === Notification System ===
    /**
     * Displays a temporary notification message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - The type of notification ('error', 'info', 'success').
     */
    function showNotification(message, type = 'error') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        const messageP = document.createElement('p');
        messageP.textContent = message;
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.onclick = () => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => notification.remove());
        };
        notification.appendChild(messageP);
        notification.appendChild(closeButton);
        container.appendChild(notification);
        // Automatically remove the notification after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('fade-out');
                notification.addEventListener('animationend', () => notification.remove());
            }
        }, 5000);
    }

    // === Form Submission Handler ===
    signForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Show loading state on button
        submitButton.disabled = true;
        buttonText.hidden = true;
        buttonSpinner.hidden = false;
        resultsDiv.innerHTML = ''; // Clear previous results

        const formData = new FormData(this);

        try {
            // Simulate a server request for demonstration purposes
            // In a real application, this would be an actual API call
            const response = await new Promise(resolve => setTimeout(() => {
                // Simulate a successful response
                const mockData = {
                    success: true,
                    results: [
                        {
                            iconUrl: 'https://placehold.co/64x64/A68C41/ffffff?text=App1',
                            displayName: 'Signed App 1',
                            bundleId: 'com.sideloading.app1',
                            bundleVersion: '1.0.1',
                            signedIpaUrl: '#',
                            installLink: '#'
                        },
                        {
                            iconUrl: 'https://placehold.co/64x64/A68C41/ffffff?text=App2',
                            displayName: 'Signed App 2',
                            bundleId: 'com.sideloading.app2',
                            bundleVersion: '2.5.0',
                            signedIpaUrl: '#',
                            installLink: '#'
                        }
                    ]
                };
                resolve({ ok: true, json: () => mockData });
            }, 2000));

            const data = await response.json();

            if (response.ok && data.success) {
                if (data.results && data.results.length > 0) {
                    // Display the results
                    const resultsTitle = document.createElement('h2');
                    resultsTitle.className = 'section-title';
                    resultsTitle.textContent = 'Signing Complete!';
                    resultsDiv.appendChild(resultsTitle);

                    data.results.forEach(result => {
                        const card = document.createElement('div');
                        card.className = 'result-card';
                        card.innerHTML = `
                            <div class="result-header">
                                <img src="${result.iconUrl || ''}" alt="App Icon" class="result-icon">
                                <div class="result-info">
                                    <h3>${result.displayName}</h3>
                                    <p>${result.bundleId} • v${result.bundleVersion}</p>
                                </div>
                            </div>
                            <div class="result-links">
                                <a href="${result.signedIpaUrl}" class="button-secondary" target="_blank">Download IPA</a>
                                <a href="${result.installLink}" class="button-primary" target="_blank">Install via Manifest</a>
                            </div>`;
                        resultsDiv.appendChild(card);
                    });
                    showNotification('Signing successful!', 'success');
                } else {
                    showNotification('Signing completed, but no results were returned.', 'info');
                }
            } else {
                showNotification(data.error || 'An unknown server error occurred.');
            }
        } catch (err) {
            showNotification('A network or client-side error occurred: ' + err.message);
        } finally {
            // Revert button to original state
            submitButton.disabled = false;
            buttonText.hidden = false;
            buttonSpinner.hidden = true;
        }
    });

    // === Extras Toggle Handler ===
    extrasToggle.addEventListener('click', function() {
        const isExpanded = extrasContent.style.display === 'block';

        if (isExpanded) {
            extrasContent.style.display = 'none';
            chevronIcon.style.transform = 'rotate(0deg)';
            extrasToggle.setAttribute('aria-expanded', 'false');
        } else {
            extrasContent.style.display = 'block';
            chevronIcon.style.transform = 'rotate(180deg)';
            extrasToggle.setAttribute('aria-expanded', 'true');
        }
    });

    // === Initial State Setup ===
    // Reset form and hide results on page load
    window.addEventListener('load', () => {
        signForm.reset();
        resultsDiv.innerHTML = '';
    });
    // Set initial state for the extras section
    extrasContent.style.display = 'none';
    extrasToggle.setAttribute('aria-expanded', 'false');
});
