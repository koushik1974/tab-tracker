chrome.tabs.query({}, function(tabs) {
  const tabsList = document.getElementById('tabs-list');
  tabsList.innerHTML = '';

  tabs.forEach(tab => {
    let url;
    try {
      url = new URL(tab.url);
    } catch {
      url = { hostname: 'Unknown' };
    }
    const domain = url.hostname;

    const tabItem = document.createElement('div');
    tabItem.style.cursor = 'pointer';
    tabItem.style.padding = '12px';
    tabItem.style.marginBottom = '10px';
    tabItem.style.borderRadius = '12px';
    tabItem.style.backgroundColor = '#f8f8ff';
    tabItem.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
    tabItem.style.display = 'flex';
    tabItem.style.alignItems = 'center';
    tabItem.style.gap = '12px';
    tabItem.style.transition = 'background 0.3s';

    const favicon = document.createElement('img');
    favicon.src = tab.favIconUrl && tab.favIconUrl !== '' 
      ? tab.favIconUrl 
      : 'icons/default-icon.png';
    favicon.style.width = '28px';
    favicon.style.height = '28px';
    favicon.style.borderRadius = '6px';
    favicon.style.objectFit = 'cover';

    const textContainer = document.createElement('div');
    textContainer.innerHTML = `<strong>${tab.title}</strong><br/><small>${domain}</small>`;

    tabItem.appendChild(favicon);
    tabItem.appendChild(textContainer);

    tabItem.onclick = function() {
      chrome.windows.update(tab.windowId, { focused: true }, () => {
        chrome.tabs.update(tab.id, { active: true });
      });
    };
  const closeBtn = document.createElement('button');
closeBtn.textContent = 'x';
closeBtn.title = "Close this tab";

// Minimal, compact style
closeBtn.style.all = 'unset'; // Reset all default styles
closeBtn.style.cursor = 'pointer';
closeBtn.style.fontSize = '12px';
closeBtn.style.marginLeft = 'auto';
closeBtn.style.color = '#999';
closeBtn.style.padding = '2px 4px'; // tight padding
closeBtn.style.lineHeight = '1';

closeBtn.onmouseenter = () => closeBtn.style.color = '#ff4b4b';
closeBtn.onmouseleave = () => closeBtn.style.color = '#999';

closeBtn.onclick = (e) => {
  e.stopPropagation(); // Prevent activating tab
  chrome.tabs.remove(tab.id);
  tabItem.remove();
};

tabItem.appendChild(closeBtn);

    document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const allTabs = document.querySelectorAll('#tabs-list > div');

  allTabs.forEach(tab => {
    const text = tab.innerText.toLowerCase();
    tab.style.display = text.includes(searchTerm) ? 'flex' : 'none';
  });
});
  
    tabItem.onmouseover = () => {
      tabItem.style.backgroundColor = '#e0dffe';
    };
    tabItem.onmouseleave = () => {
      tabItem.style.backgroundColor = '#f8f8ff';
    };

    tabsList.appendChild(tabItem);
  });
});
