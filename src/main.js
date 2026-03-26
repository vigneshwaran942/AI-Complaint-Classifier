// AI Customer Support Complaint Classification System

function classifyComplaint(text) {
  const lower = text.toLowerCase();
  
  let category = "General";
  let priority = "Low";
  let solution = "Our support team will contact you.";

  // Classification + Solutions
  if (lower.includes("internet") || lower.includes("network")) {
    category = "Network Issue";
    priority = "High";
    solution = "Restart your router. If the issue continues, contact technical support.";
  } 
  else if (lower.includes("bill") || lower.includes("payment")) {
    category = "Billing Issue";
    priority = "Medium";
    solution = "Check your billing details. If incorrect, raise a complaint in billing support.";
  } 
  else if (lower.includes("account") || lower.includes("login")) {
    category = "Account Problem";
    priority = "Medium";
    solution = "Try resetting your password or contact support.";
  } 
  else if (lower.includes("upgrade") || lower.includes("plan")) {
    category = "Service Request";
    priority = "Low";
    solution = "Go to your dashboard → My Plans → Upgrade.";
  }

  // Critical detection
  if (lower.includes("urgent") || lower.includes("not working") || lower.includes("down")) {
    priority = "Critical";
    solution = "Critical issue detected. Please contact support immediately.";
  }

  // Question handling
  if (lower.includes("how") || lower.includes("what") || lower.includes("why")) {
    solution = "Q&A: " + solution;
  }

  return { category, priority, solution };
}

// Wait until DOM is ready and attach event listeners
function initApp() {
  const inputText = document.getElementById('inputText');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultBox = document.getElementById('result');

  if (!analyzeBtn || !inputText || !resultBox) {
    console.error('Required elements not found');
    return;
  }

  analyzeBtn.addEventListener('click', function() {
    const text = inputText.value.trim();
    
    if (!text) {
      alert('Please enter a complaint or question');
      inputText.focus();
      return;
    }

    const data = classifyComplaint(text);
    resultBox.innerHTML = `
      <p><b>Category:</b> ${data.category}</p>
      <p><b>Priority:</b> ${data.priority}</p>
      <p><b>Solution:</b> ${data.solution}</p>
    `;
    resultBox.classList.add('show');
  });

  // Allow Enter + Ctrl to submit
  inputText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      analyzeBtn.click();
    }
  });

  // Focus on input when page loads
  inputText.focus();
}

// Initialize in timeline: readystatechange, then DOMContentLoaded, then load event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}