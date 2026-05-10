document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ===== Unit Converter =====
  const converterForm = document.getElementById('converter-form');
  if (converterForm) {
    const convType = document.getElementById('conv-type');
    const convInput = document.getElementById('conv-input');
    const convResult = document.getElementById('conv-result');

    const conversions = {
      'c-to-f': { fn: v => (v * 9/5) + 32, from: '°C', to: '°F' },
      'f-to-c': { fn: v => (v - 32) * 5/9, from: '°F', to: '°C' },
      'km-to-mi': { fn: v => v * 0.621371, from: 'km', to: 'mi' },
      'mi-to-km': { fn: v => v * 1.60934, from: 'mi', to: 'km' },
      'kg-to-lb': { fn: v => v * 2.20462, from: 'kg', to: 'lb' },
      'lb-to-kg': { fn: v => v * 0.453592, from: 'lb', to: 'kg' },
      'cm-to-in': { fn: v => v * 0.393701, from: 'cm', to: 'in' },
      'in-to-cm': { fn: v => v * 2.54, from: 'in', to: 'cm' },
      'l-to-gal': { fn: v => v * 0.264172, from: 'L', to: 'gal' },
      'gal-to-l': { fn: v => v * 3.78541, from: 'gal', to: 'L' },
      'm-to-ft': { fn: v => v * 3.28084, from: 'm', to: 'ft' },
      'ft-to-m': { fn: v => v * 0.3048, from: 'ft', to: 'm' },
    };

    converterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseFloat(convInput.value);
      if (isNaN(val)) return;
      const c = conversions[convType.value];
      const result = c.fn(val);
      convResult.textContent = `${val} ${c.from} = ${result.toFixed(4)} ${c.to}`;
      convResult.classList.add('visible');
    });
  }

  // ===== Science Trivia Quiz =====
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    const questions = [
      { q: "What is the hardest natural substance on Earth?", options: ["Titanium", "Diamond", "Quartz", "Graphene"], answer: 1 },
      { q: "How long does it take for light from the Sun to reach Earth?", options: ["8 seconds", "8 minutes", "80 minutes", "8 hours"], answer: 1 },
      { q: "What gas makes up roughly 78% of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], answer: 2 },
      { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
      { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], answer: 2 },
      { q: "At what temperature are Celsius and Fahrenheit equal?", options: ["-40°", "0°", "-32°", "100°"], answer: 0 },
      { q: "What element does 'Fe' represent on the periodic table?", options: ["Fluorine", "Fermium", "Iron", "Lead"], answer: 2 },
      { q: "How many bones are in the adult human body?", options: ["196", "206", "256", "312"], answer: 1 },
      { q: "What is the speed of sound in air at sea level (approx)?", options: ["343 m/s", "299 m/s", "150 m/s", "500 m/s"], answer: 0 },
      { q: "Which scientist developed the theory of general relativity?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"], answer: 2 },
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
      answered = false;
      const q = questions[current];
      quizContainer.innerHTML = `
        <div class="quiz-progress">
          <span>Question ${current + 1} of ${questions.length}</span>
          <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${((current) / questions.length) * 100}%"></div></div>
          <span>${score} pts</span>
        </div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
        </div>
      `;
      quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
      });
    }

    function handleAnswer(idx) {
      if (answered) return;
      answered = true;
      const q = questions[current];
      const buttons = quizContainer.querySelectorAll('.quiz-option');
      buttons.forEach((btn, i) => {
        btn.classList.add('disabled');
        if (i === q.answer) btn.classList.add('correct');
        if (i === idx && idx !== q.answer) btn.classList.add('wrong');
      });
      if (idx === q.answer) score++;
      setTimeout(() => {
        current++;
        if (current < questions.length) {
          renderQuestion();
        } else {
          showScore();
        }
      }, 1200);
    }

    function showScore() {
      const pct = Math.round((score / questions.length) * 100);
      let msg = pct >= 80 ? "🏆 Outstanding! You're a science star!" :
                pct >= 50 ? "👏 Good job! Keep learning!" :
                "📚 Keep exploring — science is fascinating!";
      quizContainer.innerHTML = `
        <div class="quiz-score">
          <div class="score-number">${score}/${questions.length}</div>
          <p style="margin:12px 0;color:var(--text-secondary)">${pct}% correct</p>
          <p style="font-size:1.2rem;margin:16px 0">${msg}</p>
          <button class="btn-primary" onclick="location.reload()" style="max-width:240px;margin:20px auto 0">Play Again</button>
        </div>
      `;
    }

    renderQuestion();
  }
});



// ============================================
// GLOBAL PREMIUM UX ENHANCEMENTS (Auto-Injected)
// ============================================

(function() {
  // 1. Override native alert with Premium Toast Notifications
  const originalAlert = window.alert;
  window.alert = function(message) {
    let toastContainer = document.getElementById('premium-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'premium-toast-container';
      toastContainer.style.cssText = 'position:fixed; bottom:30px; right:30px; z-index:99999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #ff4d4f; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 10px 25px rgba(255,77,79,0.4); font-family: system-ui, -apple-system, sans-serif; font-weight: 600; font-size: 14px; transform: translateX(120%); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); display: flex; align-items: center; gap: 12px; pointer-events:auto;';
    toast.innerHTML = '<span style="font-size:20px;">⚠️</span> ' + message;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    
    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // 2. Global Button Ripple Effect
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, .btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `position: absolute; background: rgba(255, 255, 255, 0.4); border-radius: 50%; transform: scale(0); animation: rippleAnim 0.6s linear; pointer-events: none; left: ${x}px; top: ${y}px; width: 100px; height: 100px; margin-left: -50px; margin-top: -50px;`;
    
    if(target.style.position === '') target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.innerHTML = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
      document.head.appendChild(style);
    }

    setTimeout(() => ripple.remove(), 600);
  });

  // 3. Smart Success Particle Animations for specific action buttons
  const triggerKeywords = ['calc', 'convert', 'gen', 'submit', 'estimate'];
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const id = (target.id || '').toLowerCase();
    const text = (target.textContent || '').toLowerCase();
    
    const isActionBtn = triggerKeywords.some(kw => id.includes(kw) || text.includes(kw));
    
    if (isActionBtn) {
      // Create a subtle loading state
      const originalText = target.innerHTML;
      target.style.opacity = '0.8';
      target.style.pointerEvents = 'none';
      target.innerHTML = '<span style="display:inline-block; width:14px; height:14px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin 0.75s linear infinite; margin-right:8px; vertical-align:middle;"></span> Processing...';
      
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        target.innerHTML = originalText;
        target.style.opacity = '1';
        target.style.pointerEvents = 'auto';
        
        // Fire particles from the button
        fireParticles(e.clientX, e.clientY);
      }, 600);
    }
  });

  function fireParticles(x, y) {
    const colors = ['#007bff', '#28a745', '#ffc107', '#17a2b8'];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      
      particle.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; background: ${color}; border-radius: 50%; pointer-events: none; z-index: 99999;`;
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 50;

      particle.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 500 + 500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });

      setTimeout(() => particle.remove(), 1000);
    }
  }
})();
