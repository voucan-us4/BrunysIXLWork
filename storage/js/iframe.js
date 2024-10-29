const urlParams = new URLSearchParams(window.location.search);
        const url = urlParams.get('url');
        const iframe = document.getElementById('myIframe');

        if (url) {
            iframe.src = url;
            localStorage.setItem('iframeUrl', url);
            history.replaceState(null, '', window.location.pathname);
        } else {
            const savedUrl = localStorage.getItem('iframeUrl');
            if (savedUrl) {
                iframe.src = savedUrl;
            } else {
                console.error("No URL parameter provided and no saved URL found.");
            }
        }
