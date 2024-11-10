document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.image-item');
    let lastClickedItems = JSON.parse(localStorage.getItem('lastClickedItems')) || [];

    if (lastClickedItems.length > 0) {
        const container = document.getElementById('imageContainer');
        
        lastClickedItems.slice().reverse().forEach(label => {
            const itemToMove = document.querySelector(`.image-item[data-label="${label}"]`);
            if (itemToMove) {
                container.prepend(itemToMove);
            }
        });
    }

    document.querySelectorAll('.image-item a').forEach(link => {
        link.addEventListener('click', function() {
            const item = this.parentElement;
            const label = item.getAttribute('data-label');
            const href = this.getAttribute('href');

          
            window.location.href = href;

        
            setTimeout(() => {
                lastClickedItems = lastClickedItems.filter(existingLabel => existingLabel !== label);
                lastClickedItems.unshift(label);

                if (lastClickedItems.length > 5) {
                    lastClickedItems.pop();
                }

                localStorage.setItem('lastClickedItems', JSON.stringify(lastClickedItems));

                const container = document.getElementById('imageContainer');
                container.prepend(item);
            }, 0);
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
