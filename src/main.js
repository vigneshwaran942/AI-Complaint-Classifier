// AI Customer Support Complaint Classification System

function classifyComplaint(text) {
  const lower = text.toLowerCase().trim();

  if (!lower) {
    return {
      category: 'General',
      priority: 'Low',
      solution: 'Please enter a complaint or question.'
    };
  }

  let category = 'General';
  let priority = 'Low';
  let solution = 'Our support team will contact you shortly.';

  if (lower.includes('internet') || lower.includes('network')) {
    category = 'Network Issue';
    priority = 'High';
    solution = 'Restart your router. If the issue continues, contact technical support.';
  } else if (lower.includes('bill') || lower.includes('payment')) {
    category = 'Billing Issue';
    priority = 'Medium';
    solution = 'Check your billing details. If anything looks incorrect, contact billing support.';
  } else if (lower.includes('account') || lower.includes('login')) {
    category = 'Account Problem';
    priority = 'Medium';
    solution = 'Try resetting your password or contact support for account help.';
  } else if (lower.includes('upgrade') || lower.includes('plan')) {
    category = 'Service Request';
    priority = 'Low';
    solution = 'You can upgrade your plan from your dashboard.';
  }

  if (lower.includes('urgent') || lower.includes('not working') || lower.includes('down')) {
    priority = 'Critical';
    solution = 'Critical issue detected. Please contact support immediately.';
  }

  if (lower.includes('how') || lower.includes('what') || lower.includes('why')) {
    solution = `Q&A: ${solution}`;
  }

  return { category, priority, solution };
}

function showResult(resultBox, message) {
  resultBox.innerHTML = message;
  resultBox.classList.add('show');
}

function initApp() {
  const inputText = document.getElementById('inputText');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultBox = document.getElementById('result');

  if (!analyzeBtn || !inputText || !resultBox) {
    console.error('Required elements were not found in the page.');
    return;
  }

  const handleAnalysis = () => {
    const text = inputText.value.trim();

    if (!text) {
      showResult(resultBox, '<p>Please enter a complaint or question.</p>');
      inputText.focus();
      return;
    }

    const data = classifyComplaint(text);
    showResult(
      resultBox,
      `
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Priority:</strong> ${data.priority}</p>
        <p><strong>Solution:</strong> ${data.solution}</p>
      `
    );
  };

  analyzeBtn.addEventListener('click', handleAnalysis);

  inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleAnalysis();
    }
  });

  inputText.focus();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}