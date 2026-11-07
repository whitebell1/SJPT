(() => {
  const init = () => {
    const searchInput = document.getElementById('searchInput');
    const panel = document.querySelector('.filters') ||
      document.querySelector('.controls-panel') ||
      document.querySelector('.panel') ||
      (searchInput ? searchInput.closest('section') : null);

    if (!panel || panel.dataset.sjptCollapsible === 'true') return;
    panel.dataset.sjptCollapsible = 'true';

    const storageKey = `sjpt-filter-collapsed:${location.pathname}`;
    const toggleRow = document.createElement('div');
    toggleRow.className = 'sjptFilterToggleRow';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'sjptFilterToggle';
    toggle.setAttribute('aria-controls', panel.id || 'sjptFilterPanel');
    if (!panel.id) panel.id = 'sjptFilterPanel';
    toggleRow.appendChild(toggle);
    panel.parentNode.insertBefore(toggleRow, panel);

    const applyState = collapsed => {
      panel.classList.toggle('sjptFilterCollapsed', collapsed);
      toggle.textContent = collapsed ? '⌄' : '⌃';
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? '검색 및 필터 펼치기' : '검색 및 필터 접기');
      toggle.title = collapsed ? '검색 및 필터 펼치기' : '검색 및 필터 접기';
    };

    let collapsed = false;
    try { collapsed = localStorage.getItem(storageKey) === '1'; } catch {}
    applyState(collapsed);

    toggle.addEventListener('click', () => {
      collapsed = !collapsed;
      applyState(collapsed);
      try { localStorage.setItem(storageKey, collapsed ? '1' : '0'); } catch {}
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
