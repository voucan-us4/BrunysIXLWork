document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.image-item');
    let lastClickedItem = localStorage.getItem('lastClickedItem'); 

    
    if (lastClickedItem) {
        const itemToMove = document.querySelector(`.image-item[data-label="${lastClickedItem}"]`);
        if (itemToMove) {
            const container = document.getElementById('imageContainer');
            container.prepend(itemToMove);
        }
    }

 
    document.querySelectorAll('.image-item a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const item = this.parentElement; 
            const label = item.getAttribute('data-label'); 


            localStorage.setItem('lastClickedItem', label);

            
            const container = document.getElementById('imageContainer');
            container.prepend(item);

            
            const href = this.getAttribute('href');
            window.location.href = href; 
        });
    });
});


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
