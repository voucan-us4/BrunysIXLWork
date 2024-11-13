document.addEventListener('DOMContentLoaded', () => {
    function filterItems() {
        const searchInput = document.getElementById('search').value.toLowerCase();
        document.querySelectorAll('.image-item').forEach(item => {
            const label = item.dataset.label.toLowerCase();
            item.style.display = label.includes(searchInput) ? '' : 'none';
        });
    }

    function moveToTop(event) {
        const container = document.querySelector('.container');
        const clickedImage = event.currentTarget;
        container.prepend(clickedImage);
    }

    document.getElementById('search').addEventListener('input', filterItems);

    document.querySelectorAll('.image-item').forEach(item => {
        item.addEventListener('click', moveToTop);
    });
});
