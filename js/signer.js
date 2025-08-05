document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const signerForm = document.getElementById('signerForm');
    const ipaFile = document.getElementById('ipaFile');
    const fileNameDisplay = document.getElementById('fileName');
    const extrasToggle = document.getElementById('extrasToggle');
    const extrasContent = document.getElementById('extrasContent');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const notificationContainer = document.getElementById('notificationContainer');

    // Event listener for the file input change
    ipaFile.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
            fileNameDisplay.style.color = 'var(--text-primary)';
        } else {
            fileNameDisplay.textContent = 'Choose an IPA File';
            fileNameDisplay.style.color = 'var(--text-secondary)';
        }
    });

    // Event listener for the advanced options toggle
    extrasToggle.addEventListener('click', () => {
        const isExpanded = extrasToggle.getAttribute('aria-expanded') === 'true' || false;
        extrasToggle.setAttribute('aria-expanded', !isExpanded);
        extrasContent.classList.toggle('active');
        extrasToggle.classList.toggle('expanded');
    });

    // Event listener for form submission
    signerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Disable button and show spinner
        submitButton.disabled = true;
        buttonText.textContent = 'Signing...';
        
        // Form validation
        if (!validateForm()) {
            submitButton.disabled = false;
            buttonText.textContent = 'Sign IPA';
            return;
        }

        // Simulating the signing process
        try {
            showNotification('info', 'Signing process started. This may take a few moments...');
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call or processing time

            // Generate a fake download link
            const fakeDownloadUrl = URL.createObjectURL(new Blob(['This is a fake signed IPA file.'], { type: 'application/octet-stream' }));

            showNotification('success', 'IPA file signed successfully!');
            showDownloadLink(fakeDownloadUrl);

        } catch (error) {
            console.error('Signing failed:', error);
            showNotification('error', 'Signing failed. Please check your credentials and try again.');
        } finally {
            // Re-enable button and hide spinner
            submitButton.disabled = false;
            buttonText.textContent = 'Sign IPA';
        }
    });

    // Function to validate the form
    function validateForm() {
        const requiredInputs = signerForm.querySelectorAll('input[required]');
        for (const input of requiredInputs) {
            if (!input.value) {
                showNotification('error', `Please fill in the '${input.labels[0].textContent}' field.`);
                input.focus();
                return false;
            }
        }
        return true;
    }

    // Function to show a notification
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        
        let iconSvg;
        if (type === 'success') {
            iconSvg = `<svg class="notification-icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg class="notification-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
        } else { // info
            iconSvg = `<svg class="notification-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>`;
        }
        
        notification.innerHTML = `
            ${iconSvg}
            <span class="notification-text">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Close the notification automatically after 5 seconds
        const timeout = setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Allow manual closing
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
            clearTimeout(timeout);
        });
    }

    // Function to show the download link for the signed IPA
    function showDownloadLink(url) {
        const downloadNotification = document.createElement('div');
        downloadNotification.classList.add('notification', 'success');
        downloadNotification.style.animationDelay = '0.5s';
        
        downloadNotification.innerHTML = `
            <svg class="notification-icon" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span class="notification-text">Your signed IPA is ready. <a href="${url}" download="signed-app.ipa" class="download-link">Click here to download.</a></span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;
        
        notificationContainer.appendChild(downloadNotification);
        
        // Allow manual closing
        downloadNotification.querySelector('.notification-close').addEventListener('click', () => {
            downloadNotification.remove();
            URL.revokeObjectURL(url); // Clean up the object URL
        });
    }
});
