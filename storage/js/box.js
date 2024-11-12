document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('imageContainer');
    const items = document.querySelectorAll('.image-item');
    let lastClickedItems = JSON.parse(localStorage.getItem('lastClickedItems')) || [];

    if (lastClickedItems.length) {
        lastClickedItems.slice().reverse().forEach(label => {
            const itemToMove = document.querySelector(`.image-item[data-label="${label}"]`);
            itemToMove && container.prepend(itemToMove);
        });
    }

    document.querySelectorAll('.image-item a').forEach(link => {
        link.addEventListener('click', handleItemClick);
    });

    function handleItemClick(event) {
        const item = event.target.closest('.image-item');
        const label = item.dataset.label;
        const href = event.target.href;

        window.location.href = href;

        updateLastClickedItems(label);
        moveItemToTop(item);
    }

    function updateLastClickedItems(label) {
        lastClickedItems = lastClickedItems.filter(existingLabel => existingLabel !== label);
        lastClickedItems.unshift(label);

        if (lastClickedItems.length > 5) {
            lastClickedItems.pop();
        }

        localStorage.setItem('lastClickedItems', JSON.stringify(lastClickedItems));
    }

    function moveItemToTop(item) {
        container.prepend(item);
    }
});

function filterItems() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    document.querySelectorAll('.image-item').forEach(item => {
        const label = item.dataset.label.toLowerCase();
        item.style.display = label.includes(searchInput) ? '' : 'none';
    });
}
