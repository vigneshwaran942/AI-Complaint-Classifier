// JavaScript-based complaint classification app

function classifyComplaint(text) {
  const lowerText = text.toLowerCase().trim();

  if (!lowerText) {
    return {
      category: 'General',
      priority: 'Low',
      solution: 'Please enter a complaint or question.'
    };
  }

  let category = 'General';
  let priority = 'Low';
  let solution = 'Our support team will contact you shortly.';

  if (lowerText.includes('internet') || lowerText.includes('network')) {
    category = 'Network Issue';
    priority = 'High';
    solution = 'Restart your router. If the issue continues, contact technical support.';
  } else if (lowerText.includes('bill') || lowerText.includes('payment')) {
    category = 'Billing Issue';
    priority = 'Medium';
    solution = 'Check your billing details. If anything looks incorrect, contact billing support.';
  } else if (lowerText.includes('account') || lowerText.includes('login')) {
    category = 'Account Problem';
    priority = 'Medium';
    solution = 'Try resetting your password or contact support for account help.';
  } else if (lowerText.includes('upgrade') || lowerText.includes('plan')) {
    category = 'Service Request';
    priority = 'Low';
    solution = 'You can upgrade your plan from your dashboard.';
  }

  if (lowerText.includes('urgent') || lowerText.includes('not working') || lowerText.includes('down')) {
    priority = 'Critical';
    solution = 'Critical issue detected. Please contact support immediately.';
  }

  if (lowerText.includes('how') || lowerText.includes('what') || lowerText.includes('why')) {
    solution = `Q&A: ${solution}`;
  }

  return { category, priority, solution };
}

function renderResult(resultBox, data) {
  resultBox.innerHTML = `
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Priority:</strong> ${data.priority}</p>
    <p><strong>Solution:</strong> ${data.solution}</p>
  `;
  resultBox.classList.add('show');
}

function initApp() {
  const inputText = document.getElementById('inputText');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultBox = document.getElementById('result');

  if (!inputText || !analyzeBtn || !resultBox) {
    console.error('Required elements were not found on the page.');
    return;
  }

  analyzeBtn.addEventListener('click', () => {
    const text = inputText.value.trim();

    if (!text) {
      resultBox.innerHTML = '<p>Please enter a complaint or question.</p>';
      resultBox.classList.add('show');
      inputText.focus();
      return;
    }

    const data = classifyComplaint(text);
    renderResult(resultBox, data);
  });

  inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      analyzeBtn.click();
    }
  });

  inputText.focus();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}