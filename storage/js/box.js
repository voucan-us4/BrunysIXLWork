function filterItems() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    console.log("Search input:", searchInput); 
    const items = document.querySelectorAll('.image-item');

    items.forEach(item => {
        const label = item.getAttribute('data-label').toLowerCase();
        console.log("Checking item:", label); 
        if (label.includes(searchInput)) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none'; 
        }
    });
}

