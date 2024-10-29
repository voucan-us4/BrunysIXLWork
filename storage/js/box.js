let lastClickedItem = null; 

function filterItems() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const items = document.querySelectorAll('.image-item');

    items.forEach(item => {
        const label = item.getAttribute('data-label').toLowerCase();
        if (label.includes(searchInput)) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none'; 
        }
    });
}

document.querySelectorAll('.image-item a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const item = this.parentElement;


        if (lastClickedItem !== item) {
            lastClickedItem = item; 
            const container = document.getElementById('imageContainer');
            container.prepend(item); 
        }

        
        const href = this.getAttribute('href');
        window.location.href = href; 
    });
});
