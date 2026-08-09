let tasks = [];
let alarmEnabled = false;
let currentTab = 'all';
let alarmTimers = [];

const CATS = { work: 'Work', personal: 'Personal', health: 'Health', study: 'Study', other: 'Other' };

function init() {
    const saved = localStorage.getItem('taskflow_tasks');
    if (saved) try { tasks = JSON.parse(saved); } catch (e) { tasks = []; }
    setDate();
    render();
    setInterval(checkAlarms, 15000);
}

function setDate() {
    const d = new Date();
    const opts = { weekday: 'short', month: 'short', day: 'numeric' };
    document.getElementById('dateBadge').textContent = d.toLocaleDateString('en-US', opts);
}

function save() {
    try { localStorage.setItem('taskflow_tasks', JSON.stringify(tasks)); } catch (e) { }
}

function openModal() {
    document.getElementById('modalOverlay').classList.add('open');
    document.getElementById('taskTitle').focus();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDue').value = today;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes() + 5 > 59 ? 0 : now.getMinutes() + 5).padStart(2, '0');
    document.getElementById('alarmTime').value = hh + ':' + mm;
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    resetForm();
}

function closeModalOnBg(e) {
    if (e.target.id === 'modalOverlay') closeModal();
}

function toggleAlarm() {
    alarmEnabled = !alarmEnabled;
    const el = document.getElementById('alarmToggle');
    if (alarmEnabled) el.classList.add('on'); else el.classList.remove('on');
}

function resetForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskNote').value = '';
    document.getElementById('taskCat').value = 'work';
    alarmEnabled = false;
    document.getElementById('alarmToggle').classList.remove('on');
}

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    if (!title) {
        document.getElementById('taskTitle').style.borderColor = 'var(--red)';
        setTimeout(() => document.getElementById('taskTitle').style.borderColor = '', 1200);
        return;
    }
    const task = {
        id: Date.now(),
        title,
        note: document.getElementById('taskNote').value.trim(),
        cat: document.getElementById('taskCat').value,
        due: document.getElementById('taskDue').value,
        alarm: alarmEnabled ? document.getElementById('alarmTime').value : null,
        done: false,
        created: Date.now()
    };
    tasks.unshift(task);
    save();
    closeModal();
    render();
    if (task.alarm) scheduleAlarm(task);
}

function toggleDone(id) {
    const t = tasks.find(x => x.id === id);
    if (t) {
        t.done = !t.done;
        save();
        render();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(x => x.id !== id);
    save();
    render();
}

function setTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach((el, i) => {
        const tabs = ['all', 'work', 'personal', 'health', 'study', 'done'];
        el.classList.toggle('active', tabs[i] === tab);
    });
    render();
}

function getDueLabel(due) {
    if (!due) return null;
    const today = new Date().toISOString().split('T')[0];
    if (due < today) return { label: '⚠ Overdue', cls: 'overdue' };
    if (due === today) return { label: '📅 Today', cls: 'today' };
    return { label: '📅 ' + formatDate(due), cls: '' };
}

function formatDate(s) {
    if (!s) return '';
    const [y, m, d] = s.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(m) - 1] + ' ' + parseInt(d);
}

function render() {
    let filtered = tasks;
    if (currentTab === 'done') filtered = tasks.filter(t => t.done);
    else if (currentTab !== 'all') filtered = tasks.filter(t => t.cat === currentTab && !t.done);
    else filtered = tasks.filter(t => !t.done).concat(tasks.filter(t => t.done));

    const done = tasks.filter(t => t.done).length;
    const pending = tasks.filter(t => !t.done).length;
    const alarms = tasks.filter(t => t.alarm && !t.done).length;
    document.getElementById('statTotal').textContent = tasks.length;
    document.getElementById('statDone').textContent = done;
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statAlarms').textContent = alarms;
    document.getElementById('badgeAll').textContent = pending;
    document.getElementById('badgeDone').textContent = done;

    const list = document.getElementById('taskList');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="icon">✦</div><p>No tasks here yet.<br>Tap + to add one!</p></div>';
        return;
    }

    const pendingTasks = filtered.filter(t => !t.done);
    const doneTasks = filtered.filter(t => t.done);
    let html = '';

    if (pendingTasks.length) {
        if (currentTab === 'all') html += '<div class="section-label">Pending</div>';
        pendingTasks.forEach(t => { html += taskHTML(t); });
    }
    if (doneTasks.length) {
        html += '<div class="section-label">Completed</div>';
        doneTasks.forEach(t => { html += taskHTML(t); });
    }

    list.innerHTML = html;
}

function taskHTML(t) {
    const due = getDueLabel(t.due);
    const dueHTML = due ? `<span class="due-tag ${due.cls}">${due.label}</span>` : '';
    const alarmHTML = t.alarm ? `<span class="alarm-tag">🔔 ${t.alarm}</span>` : '';
    const noteHTML = t.note ? `<div style="font-size:11px;color:var(--text3);margin-top:4px;line-height:1.4">${t.note}</div>` : '';
    return `<div class="task-card ${t.done ? 'done' : ''}">
        <button class="check-btn ${t.done ? 'checked' : ''}" onclick="toggleDone(${t.id})">${t.done ? '✓' : ''}</button>
        <div class="task-body">
            <div class="task-title">${t.title}</div>
            ${noteHTML}
            <div class="task-meta">
                <span class="cat-badge cat-${t.cat}">${CATS[t.cat]}</span>
                ${dueHTML}
                ${alarmHTML}
            </div>
        </div>
        <button class="del-btn" onclick="deleteTask(${t.id})">✕</button>
    </div>`;
}

function scheduleAlarm(task) {
    if (!task.alarm || !task.due) return;
    const [h, m] = task.alarm.split(':').map(Number);
    const alarmDate = new Date(task.due);
    alarmDate.setHours(h, m, 0, 0);
    const diff = alarmDate - Date.now();
    if (diff > 0 && diff < 86400000) {
        const timer = setTimeout(() => fireAlarm(task), diff);
        alarmTimers.push(timer);
    }
}

function checkAlarms() {
    const now = new Date();
    const hhmm = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const today = now.toISOString().split('T')[0];
    tasks.filter(t => !t.done && t.alarm && t.due === today && t.alarm === hhmm).forEach(t => fireAlarm(t));
}

function fireAlarm(task) {
    document.getElementById('notifTitle').textContent = '⏰ Reminder: ' + task.title;
    document.getElementById('notifBody').textContent = 'Category: ' + CATS[task.cat] + (task.due ? '  •  Due: ' + formatDate(task.due) : '');
    const banner = document.getElementById('notifBanner');
    banner.classList.add('show');
    if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification('TaskFlow Reminder', { body: task.title, icon: '' }); } catch (e) { }
    }
    setTimeout(() => banner.classList.remove('show'), 5000);
}

function requestNotifPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', init);

// Request notification permission on load
setTimeout(requestNotifPermission, 2000);

// Schedule alarms for existing tasks
setTimeout(() => {
    tasks.filter(t => !t.done && t.alarm).forEach(t => scheduleAlarm(t));
}, 1000);

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => console.log('SW registration skipped'));
}
