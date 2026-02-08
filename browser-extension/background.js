/**
 * Background service worker
 */

let errorStore = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'errorCaptured') {
    errorStore.push(request.error);
    
    // Keep only last 100 errors
    if (errorStore.length > 100) {
      errorStore = errorStore.slice(-100);
    }

    // Update badge with error count
    chrome.action.setBadgeText({ 
      text: errorStore.length.toString() 
    });
    chrome.action.setBadgeBackgroundColor({ 
      color: '#ef4444' 
    });
  } else if (request.action === 'getAllErrors') {
    sendResponse({ errors: errorStore });
  } else if (request.action === 'clearAllErrors') {
    errorStore = [];
    chrome.action.setBadgeText({ text: '' });
    sendResponse({ success: true });
  } else if (request.action === 'sendToFixFlow') {
    sendToFixFlow(request.errors);
    sendResponse({ success: true });
  }
  
  return true; // Keep message channel open for async response
});

async function sendToFixFlow(errors) {
  try {
    // Get FixFlow URL from storage or use default
    const { fixflowUrl = 'http://localhost:3000' } = await chrome.storage.sync.get('fixflowUrl');
    
    // Open FixFlow in new tab with errors
    const errorText = errors.map(e => 
      `[${e.type}] ${e.message}\n${e.details.error || ''}`
    ).join('\n\n---\n\n');

    chrome.tabs.create({
      url: `${fixflowUrl}?errors=${encodeURIComponent(errorText)}`
    });
  } catch (error) {
    console.error('Failed to send to FixFlow:', error);
  }
}

// Clear badge on browser startup
chrome.runtime.onStartup.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
});
