document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary elements from the DOM
    const signerForm = document.getElementById('signerForm');
    const ipaFile = document.getElementById('ipaFile');
    const ipaFileName = document.getElementById('ipaFileName');
    const bundleIdInput = document.getElementById('bundleId');
    const appNameInput = document.getElementById('appName');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const buttonSpinner = document.getElementById('buttonSpinner');
    const extrasToggle = document.getElementById('extrasToggle');
    const extrasContent = document.getElementById('extrasContent');
    const chevronIcon = extrasToggle.querySelector('.chevron-icon');
    const certificateTypeSelect = document.getElementById('certificateType');
    const p12Fields = document.getElementById('p12Fields');
    const p12File = document.getElementById('p12File');
    const p12FileName = document.getElementById('p12FileName');
    const mobileProvisionFields = document.getElementById('mobileProvisionFields');
    const mobileProvisionFile = document.getElementById('mobileProvisionFile');
    const mobileProvisionFileName = document.getElementById('mobileProvisionFileName');
    const generatedInfoSection = document.getElementById('generatedInfo');
    const infoBundleId = document.getElementById('infoBundleId');
    const infoAppName = document.getElementById('infoAppName');
    const downloadLink = document.getElementById('downloadLink');
    const notificationContainer = document.getElementById('notificationContainer');

    // Handle file input changes to display the file name
    ipaFile.addEventListener('change', () => {
        ipaFileName.textContent = ipaFile.files.length ? ipaFile.files[0].name : 'Choose a file...';
    });

    p12File.addEventListener('change', () => {
        p12FileName.textContent = p12File.files.length ? p12File.files[0].name : 'Choose a file...';
    });

    mobileProvisionFile.addEventListener('change', () => {
        mobileProvisionFileName.textContent = mobileProvisionFile.files.length ? mobileProvisionFile.files[0].name : 'Choose a file...';
    });

    // Toggle the advanced settings section
    extrasToggle.addEventListener('click', function() {
        const isExpanded = extrasContent.classList.contains('active');
        if (isExpanded) {
            extrasContent.classList.remove('active');
            extrasToggle.setAttribute('aria-expanded', 'false');
            chevronIcon.style.transform = 'rotate(0deg)';
        } else {
            extrasContent.classList.add('active');
            extrasToggle.setAttribute('aria-expanded', 'true');
            chevronIcon.style.transform = 'rotate(180deg)';
        }
    });

    // Show/hide certificate fields based on selection
    certificateTypeSelect.addEventListener('change', function() {
        p12Fields.classList.add('hidden');
        mobileProvisionFields.classList.add('hidden');
        if (this.value === 'p12') {
            p12Fields.classList.remove('hidden');
        } else if (this.value === 'mobileProvision') {
            mobileProvisionFields.classList.remove('hidden');
        }
    });

    // Function to create and show notifications
    function showNotification(message, type = 'error') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="close-button">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        `;
        notificationContainer.appendChild(notification);
        notification.querySelector('.close-button').addEventListener('click', () => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => notification.remove());
        });
        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => notification.remove());
        }, 5000);
    }

    // Handle form submission
    signerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form inputs (e.g., check if IPA file is selected)
        if (!ipaFile.files.length) {
            showNotification('Please select an IPA file to sign.', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        buttonText.hidden = true;
        buttonSpinner.hidden = false;
        generatedInfoSection.classList.add('hidden');

        // Simulate a signing process (replace with actual fetch call to a backend)
        setTimeout(() => {
            const isSuccess = Math.random() > 0.1; // 90% chance of success
            if (isSuccess) {
                // Mock response data
                const mockData = {
                    success: true,
                    bundleId: bundleIdInput.value || 'com.example.mockapp',
                    appName: appNameInput.value || 'Mock Signed App',
                    downloadUrl: '#' // In a real app, this would be a real URL
                };

                // Display success info
                infoBundleId.textContent = mockData.bundleId;
                infoAppName.textContent = mockData.appName;
                downloadLink.href = mockData.downloadUrl;
                generatedInfoSection.classList.remove('hidden');
                showNotification('IPA signed successfully!', 'success');
            } else {
                showNotification('Signing failed. Please try again.', 'error');
            }

            // Reset loading state
            submitButton.disabled = false;
            buttonText.hidden = false;
            buttonSpinner.hidden = true;
        }, 3000); // Simulate a 3-second delay for the signing process
    });
});
