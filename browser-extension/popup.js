/**
 * Popup script for displaying captured errors
 */

async function loadErrors() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'getErrors' }, (response) => {
    if (chrome.runtime.lastError) {
      // Content script not loaded yet
      displayEmptyState();
      return;
    }

    if (response && response.errors) {
      displayErrors(response.errors);
    } else {
      displayEmptyState();
    }
  });
}

function displayErrors(errors) {
  const container = document.getElementById('errorContainer');
  const countBadge = document.getElementById('errorCount');
  
  countBadge.textContent = errors.length;

  if (errors.length === 0) {
    displayEmptyState();
    return;
  }

  container.innerHTML = '<div class="error-list"></div>';
  const errorList = container.querySelector('.error-list');

  errors.forEach((error, index) => {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-item';
    errorEl.innerHTML = `
      <div class="error-type ${error.type}">${error.type}</div>
      <div class="error-message">${escapeHtml(error.message)}</div>
      <div class="error-details">
        ${new Date(error.timestamp).toLocaleTimeString()}
        ${error.details.filename ? ` • ${error.details.filename}:${error.details.lineno}` : ''}
      </div>
    `;
    errorList.appendChild(errorEl);
  });
}

function displayEmptyState() {
  const container = document.getElementById('errorContainer');
  const countBadge = document.getElementById('errorCount');
  
  countBadge.textContent = '0';
  container.innerHTML = `
    <div class="empty-state">
      No errors captured yet.<br>
      Errors will appear here automatically.
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Send to FixFlow button
document.getElementById('sendToFixFlow').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'getErrors' }, (response) => {
    if (response && response.errors && response.errors.length > 0) {
      chrome.runtime.sendMessage({
        action: 'sendToFixFlow',
        errors: response.errors
      });
    }
  });
});

// Clear errors button
document.getElementById('clearErrors').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'clearErrors' }, () => {
    chrome.runtime.sendMessage({ action: 'clearAllErrors' });
    displayEmptyState();
  });
});

// Load errors on popup open
loadErrors();

// Refresh every 2 seconds
setInterval(loadErrors, 2000);
