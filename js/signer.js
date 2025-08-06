document.addEventListener('DOMContentLoaded', () => {
    const signerForm = document.getElementById('signerForm');
    const ipaFileInput = document.getElementById('ipaFileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfoBox = document.getElementById('fileInfoBox');
    const fileNameSpan = document.getElementById('fileName');
    const signButton = document.getElementById('signButton');
    const loadingSpinner = signButton.querySelector('.loading-spinner');
    const signerStatus = document.getElementById('signerStatus');

    // Handle file input click
    uploadArea.addEventListener('click', () => {
        ipaFileInput.click();
    });

    // Handle file selection
    ipaFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // Handle drag and drop events
    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = event.dataTransfer.files[0];
        if (file && file.name.endsWith('.ipa')) {
            ipaFileInput.files = event.dataTransfer.files;
            handleFile(file);
        } else {
            displayStatus('Please upload a valid .ipa file.', 'error');
        }
    });

    function handleFile(file) {
        fileNameSpan.textContent = file.name;
        fileInfoBox.style.display = 'block';
        uploadArea.classList.add('has-file');
        signerStatus.textContent = '';
    }

    // Handle form submission
    signerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const file = ipaFileInput.files[0];

        if (!file) {
            displayStatus('Please select an IPA file to sign.', 'error');
            return;
        }

        // Show loading state
        signButton.disabled = true;
        signButton.innerHTML = 'Signing... <span class="loading-spinner"></span>';
        loadingSpinner.style.display = 'inline-block';
        signerStatus.textContent = '';
        
        // Simulate an asynchronous signing process
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; 

            if (isSuccess) {
                displayStatus('IPA file signed successfully! Your download will start shortly.', 'success');
            } else {
                displayStatus('An error occurred during signing. Please try again.', 'error');
            }

            // Reset button state
            signButton.disabled = false;
            signButton.innerHTML = 'Sign IPA';
            loadingSpinner.style.display = 'none';

        }, 3000);
    });

    function displayStatus(message, type) {
        signerStatus.textContent = message;
        signerStatus.className = 'signer-status';
        signerStatus.classList.add('status-' + type);
    }
});
