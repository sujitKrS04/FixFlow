/**
 * Content script that captures errors from the page
 */

// Store captured errors
let capturedErrors = [];

// Override console.error to capture errors
const originalConsoleError = console.error;
console.error = function(...args) {
  captureError('console.error', args.join(' '));
  originalConsoleError.apply(console, args);
};

// Capture unhandled errors
window.addEventListener('error', (event) => {
  captureError('runtime', event.message, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.stack || event.error?.toString()
  });
});

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  captureError('promise', event.reason?.toString() || 'Unhandled Promise Rejection', {
    reason: event.reason
  });
});

// Capture fetch errors
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  try {
    const response = await originalFetch.apply(this, args);
    if (!response.ok) {
      captureError('fetch', `HTTP ${response.status} ${response.statusText}`, {
        url: args[0],
        status: response.status
      });
    }
    return response;
  } catch (error) {
    captureError('fetch', error.message, {
      url: args[0],
      error: error.toString()
    });
    throw error;
  }
};

function captureError(type, message, details = {}) {
  const errorData = {
    type,
    message,
    details,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  capturedErrors.push(errorData);

  // Send to background script
  chrome.runtime.sendMessage({
    action: 'errorCaptured',
    error: errorData
  });

  // Keep only last 50 errors
  if (capturedErrors.length > 50) {
    capturedErrors = capturedErrors.slice(-50);
  }
}

// Listen for messages from popup/devtools
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getErrors') {
    sendResponse({ errors: capturedErrors });
  } else if (request.action === 'clearErrors') {
    capturedErrors = [];
    sendResponse({ success: true });
  }
});

console.log('FixFlow DevTools Integration active ✨');
