document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('imageContainer');
    let lastClickedItems = JSON.parse(localStorage.getItem('lastClickedItems')) || [];

    if (lastClickedItems.length) {
        const lastClickedLabel = lastClickedItems[0];
        const lastClickedItem = document.querySelector(`.image-item[data-label="${lastClickedLabel}"]`);
        if (lastClickedItem) {
            container.prepend(lastClickedItem);
        }
    }

    document.querySelectorAll('.image-item a').forEach(link => {
        link.addEventListener('click', handleItemClick);
    });

    function handleItemClick(event) {
        event.preventDefault();
        const item = event.target.closest('.image-item');
        const label = item.dataset.label;
        const href = event.target.href;
        updateLastClickedItems(label);
        window.location.href = href;
    }

    function updateLastClickedItems(label) {
        lastClickedItems = lastClickedItems.filter(existingLabel => existingLabel !== label);
        lastClickedItems.unshift(label);

        if (lastClickedItems.length > 5) {
            lastClickedItems.pop();
        }

        localStorage.setItem('lastClickedItems', JSON.stringify(lastClickedItems));
    }
});

function filterItems() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    document.querySelectorAll('.image-item').forEach(item => {
        const label = item.dataset.label.toLowerCase();
        item.style.display = label.includes(searchInput) ? '' : 'none';
    });
}
