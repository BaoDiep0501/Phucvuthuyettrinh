(() => {
  const KEY = 'bingo-classroom-v1';
  const initial = () => ({ done: [], current: null, deadline: null, started: false });

  let state;

  try {
    state = JSON.parse(localStorage.getItem(KEY)) || initial();
  }
  catch { state = initial(); }
  if (!Array.isArray(state.done)) state = initial();

  state.done = [...new Set(state.done.filter(n => Number.isInteger(n) && n >= 1 && n <= 20))];

  if (!Number.isInteger(state.current) || state.current < 1 || state.current > 20 || state.done.includes(state.current)) state.current = null;

  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const $ = id => document.getElementById(id);
  const questionPage = !!$('question-text');

  if (!questionPage) {
    $('progress').textContent = `${state.done.length} / 20`;
    $('empty').hidden = state.done.length > 0;
    state.done.forEach(n => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = n; $('numbers').append(chip);
    });

    if (state.current) { 
      location.replace('question.html'); 
      return; 
    }

    if (state.done.length === 20) { 
      $('random').disabled = true; 
      $('random').textContent = 'Hoàn thành ✓'; 
      $('result').textContent = '✓'; 
      $('message').textContent = 'Bạn đã hoàn tất tất cả 20 câu hỏi!'; 
    }
    
    $('random').addEventListener('click', () => {
      $('random').disabled = true;
      const remaining = Array.from({ length: 20 }, (_, i) => i + 1).filter(n => !state.done.includes(n));
      if (!remaining.length) return;
      state.current = remaining[Math.floor(Math.random() * remaining.length)];
      state.started = false; state.deadline = null; state.attempts = []; save();

      let ticks = 0;
      $('message').textContent = 'Đang chọn câu hỏi…';
      const spin = setInterval(() => {
        $('result').textContent = remaining[Math.floor(Math.random() * remaining.length)];
        if (++ticks === 9) { clearInterval(spin); 
          $('result').textContent = state.current; 
          $('result').classList.add('revealed'); 
          $('message').textContent = `Câu số ${state.current}`; setTimeout(() => location.assign('question.html'), 1100); 
        }
      }, 70);
    });
  } 
  else {
    if (!state.current) { 
      location.replace('index.html'); 
      return; 
    }

    $('question-number').textContent = `CÂU SỐ ${String(state.current).padStart(2, '0')}`;

    const item = questions[state.current];
    $('question-text').textContent = item.question;
    if (item.code) {
      $('code-block').hidden = false;
      // Build highlighted tokens with textContent so code stays literal and safe.
      const tokens = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|return|if|else|function)\b|\b\d+\b|\b(?:console|log|setTimeout|app|get|res|json|status|send)\b)/g;
      let offset = 0;
      for (const match of item.code.matchAll(tokens)) {
        $('question-code').append(document.createTextNode(item.code.slice(offset, match.index)));
        const token = document.createElement('span');
        token.textContent = match[0];
        token.className = /^["']/.test(match[0]) ? 'syntax-string' : /^\d/.test(match[0]) ? 'syntax-number' : /^(const|let|return|if|else|function)$/.test(match[0]) ? 'syntax-keyword' : 'syntax-function';
        $('question-code').append(token); offset = match.index + match[0].length;
      }
      $('question-code').append(document.createTextNode(item.code.slice(offset)));
    }

    const optionNodes = [];
    const isChoice = item.options.length > 0;
    state.attempts = Array.isArray(state.attempts) ? [...new Set(state.attempts.filter(i => Number.isInteger(i) && i >= 0 && i < item.options.length))].slice(0, 2) : [];
    const correct = 'ABCD'.indexOf(item.answer);
    const finished = () => state.attempts.includes(correct) || state.attempts.length >= 2;
    const showAnswer = () => {
      $('answer').hidden = false;
      $('answer').textContent = isChoice ? `Đáp án: ${item.answer}. ${item.options[correct]}` : `Đáp án: ${item.answer}`;
      if (isChoice) optionNodes[correct].classList.add('correct');
      $('reveal').disabled = true; $('reveal').textContent = 'Đã hiện đáp án';
    };
    
    const renderChoices = () => {
      optionNodes.forEach((option, i) => {
        option.disabled = finished() || state.attempts.includes(i);
        option.classList.toggle('wrong', state.attempts.includes(i) && i !== correct);
        option.classList.toggle('correct', finished() && i === correct);
      });
      if (finished()) {
        showAnswer();
        $('choice-feedback').textContent = state.attempts.includes(correct) ? 'Chính xác!' : 'Đã hết 2 lượt trả lời.';
      } else if (state.attempts.length) {
        $('choice-feedback').textContent = 'Chưa đúng. Còn 1 lượt trả lời.';
      }
    };

    item.options.forEach((text, i) => {
      const option = document.createElement('button');
      option.type = 'button'; option.className = 'option';
      const letter = document.createElement('span');
      letter.className = 'option-letter'; letter.textContent = 'ABCD'[i];
      const content = document.createElement('span'); content.textContent = text;
      option.append(letter, content); $('options').append(option); optionNodes.push(option);
      option.addEventListener('click', () => {
        if (finished() || state.attempts.includes(i)) return;
        state.attempts.push(i); save(); renderChoices();
      });
    });
    $('reveal').hidden = isChoice;
    $('reveal').addEventListener('click', showAnswer);
    if (isChoice) renderChoices();

    let interval;
    const update = () => {
      const seconds = state.started ? Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000)) : 15;
      $('timer').textContent = String(seconds).padStart(2, '0');
      $('clock').classList.toggle('urgent', seconds <= 5);
      $('clock').style.setProperty('--remaining', `${seconds / 15 * 100}%`);
      $('start').disabled = state.started;
      if (state.started) { $('start').textContent = seconds ? 'Đang đếm…' : 'Hết giờ'; $('timer-status').textContent = seconds ? 'Thời gian đang chạy' : 'Hết 15 giây!'; }
      if (seconds === 0) clearInterval(interval);
    };
    $('start').addEventListener('click', () => { state.started = true; state.deadline = Date.now() + 15000; save(); update(); interval = setInterval(update, 100); });
    $('complete').addEventListener('click', () => { $('complete').disabled = true; clearInterval(interval); state.done.push(state.current); state.current = null; state.deadline = null; state.started = false; state.attempts = []; save(); location.replace('index.html'); });
    update(); if (state.started && state.deadline > Date.now()) interval = setInterval(update, 100);
  }
})();
