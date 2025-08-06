document.addEventListener('DOMContentLoaded', () => {
    const signerForm = document.getElementById('signerForm');
    const ipaFileInput = document.getElementById('ipaFileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfoBox = document.getElementById('fileInfoBox');
    const fileNameSpan = document.getElementById('fileName');
    const signButton = document.getElementById('signButton');
    const loadingSpinner = signButton.querySelector('.loading-spinner');
    const signerStatus = document.getElementById('signerStatus');

    uploadArea.addEventListener('click', () => {
        ipaFileInput.click();
    });

    ipaFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

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
            displayStatus('Oops! Please drop an IPA file.', 'error');
            fileInfoBox.style.display = 'none';
            uploadArea.classList.remove('has-file');
        }
    });

    function handleFile(file) {
        fileNameSpan.textContent = file.name;
        fileInfoBox.style.display = 'block';
        uploadArea.classList.add('has-file');
        signerStatus.textContent = '';
    }

    signerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const file = ipaFileInput.files[0];

        if (!file) {
            displayStatus('Uh oh! You need to pick an IPA file first.', 'error');
            return;
        }

        signButton.disabled = true;
        signButton.innerHTML = 'Signing... <span class="loading-spinner"></span>';
        loadingSpinner.style.display = 'inline-block';
        signerStatus.textContent = '';
        
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; 

            if (isSuccess) {
                displayStatus('Awesome! Your IPA file is signed! It should start downloading soon.', 'success');
            } else {
                displayStatus('Oh no! Something went wrong while signing. Please try again.', 'error');
            }

            signButton.disabled = false;
            signButton.innerHTML = 'Sign IPA';
            loadingSpinner.style.display = 'none';

        }, 3000);
    });

    function displayStatus(message, type) {
        signerStatus.textContent = message;
        signerStatus.className = 'signer-status';
        signerStatus.classList.add('status-' + type);
        signerStatus.style.opacity = '1';
        signerStatus.style.transform = 'translateY(0)';
    }
});
