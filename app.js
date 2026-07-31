document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const pills = document.querySelectorAll('.pill');
  const faqItems = document.querySelectorAll('.faq-item');
  const noResults = document.getElementById('noResults');
  const toggleAllBtn = document.getElementById('toggleAllBtn');
  const copyKbBtn = document.getElementById('copyKbBtn');
  const rawKbText = document.getElementById('rawKbText');

  let activeCategory = 'all';
  let allExpanded = false;

  // Search filtering
  function filterFAQs() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    clearSearch.style.display = query.length > 0 ? 'block' : 'none';

    faqItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const text = item.textContent.toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = query === '' || text.includes(query);

      if (matchesCategory && matchesSearch) {
        item.classList.remove('hidden');
        visibleCount++;

        // Auto open item if searching
        if (query.length > 0) {
          const details = item.querySelector('details');
          if (details) details.open = true;
        }
      } else {
        item.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  searchInput.addEventListener('input', filterFAQs);

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    filterFAQs();
    searchInput.focus();
  });

  // Category Pills
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      filterFAQs();
    });
  });

  // Toggle All Expand/Collapse
  toggleAllBtn.addEventListener('click', () => {
    allExpanded = !allExpanded;
    faqItems.forEach(item => {
      if (!item.classList.contains('hidden')) {
        const details = item.querySelector('details');
        if (details) details.open = allExpanded;
      }
    });
    toggleAllBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
  });

  // Copy raw KB text
  copyKbBtn.addEventListener('click', () => {
    rawKbText.select();
    navigator.clipboard.writeText(rawKbText.value).then(() => {
      const originalText = copyKbBtn.innerHTML;
      copyKbBtn.innerHTML = '✓ Copied!';
      copyKbBtn.style.background = '#10b981';
      setTimeout(() => {
        copyKbBtn.innerHTML = originalText;
        copyKbBtn.style.background = '';
      }, 2000);
    });
  });
});
