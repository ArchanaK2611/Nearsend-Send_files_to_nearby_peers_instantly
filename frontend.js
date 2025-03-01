document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const selectFilesBtn = document.getElementById('select-files');
    const uploadBtn = document.getElementById('upload-files');
    
    let selectedFiles = [];

    // Drag & Drop Handling
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.style.backgroundColor = "#e9f5ff";
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = "#fff";
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropZone.style.backgroundColor = "#fff";
        
        const files = Array.from(event.dataTransfer.files);
        addFiles(files);
    });

    // File Input Click Handling
    selectFilesBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // File Input Change Handling
    fileInput.addEventListener('change', (event) => {
        const files = Array.from(event.target.files);
        addFiles(files);
    });

    // Function to Add Files to List
    function addFiles(files) {
        files.forEach(file => {
            if (!selectedFiles.some(f => f.name === file.name)) {
                selectedFiles.push(file);
                displayFiles();
            }
        });
    }

    // Function to Display Files
    function displayFiles() {
        fileList.innerHTML = "<h3>Selected Files:</h3>";
        selectedFiles.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            fileItem.innerHTML = `
                <span>${file.name} (${(file.size / 1024).toFixed(2)} KB)</span>
                <button onclick="removeFile('${file.name}')">Remove</button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    // Function to Remove Files
    window.removeFile = function (fileName) {
        selectedFiles = selectedFiles.filter(file => file.name !== fileName);
        displayFiles();
    };

    // Function to Upload Files
    uploadBtn.addEventListener('click', () => {
        if (selectedFiles.length === 0) {
            alert("No files selected!");
            return;
        }

        selectedFiles.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => console.log('File uploaded:', data))
            .catch(error => console.error('Error:', error));
        });

        alert("Files uploaded successfully!");
        selectedFiles = [];
        displayFiles();
    });
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);

    // ========= PEER DISCOVERY (SIMULATED) =========
    discoverPeersBtn.addEventListener('click', () => {
        peerList.innerHTML = ''; // Clear old list
        const peers = ['Peer 1', 'Peer 2', 'Peer 3']; // Simulated peer list

        peers.forEach(peer => {
            const listItem = document.createElement('li');
            listItem.textContent = peer;
            peerList.appendChild(listItem);
        });
    });
    
    
});