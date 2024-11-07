document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-line');
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    let commandHistory = [];
    let historyIndex = -1;

    // Show welcome message
    addOutput('', `
      <div style="color: var(--text-green); font-weight: bold; font-size: 1.125rem;">
        Welcome to my Terminal!
      </div>
      <p style="color: var(--text-dim);">
        Type <span style="color: var(--text-yellow);">help</span> to see available commands.
      </p>
    `);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const command = input.value.trim().toLowerCase();

        if (command) {
            commandHistory.unshift(command);
            historyIndex = -1;
            executeCommand(command);
            input.value = '';
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory(e.key === 'ArrowUp' ? 1 : -1);
        }
    });

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;

        historyIndex = Math.min(
            Math.max(historyIndex + direction, -1),
            commandHistory.length - 1
        );

        input.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
        // Move cursor to end of input
        setTimeout(() => input.selectionStart = input.selectionEnd = input.value.length, 0);
    }

    function executeCommand(command) {
        addOutput(command, getCommandOutput(command));
        scrollToBottom();
    }

    function getCommandOutput(command) {
        const cmd = commands[command];
        if (!cmd) {
            return `Command not found: ${command}. Type "help" for available commands.`;
        }
        return cmd.execute();
    }

    function addOutput(command, outputContent) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output-line';

        if (command) {
            const commandDiv = document.createElement('div');
            commandDiv.className = 'command-input';
            commandDiv.innerHTML = `
          <span class="prompt">➜</span>
          <span class="path">~</span>
          <span>${command}</span>
        `;
            outputDiv.appendChild(commandDiv);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'output-content';
        contentDiv.innerHTML = outputContent;
        outputDiv.appendChild(contentDiv);

        output.appendChild(outputDiv);
    }

    function scrollToBottom() {
        const terminal = document.querySelector('.terminal-content');
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Focus input when clicking anywhere in the terminal
    document.querySelector('.terminal').addEventListener('click', () => {
        input.focus();
    });

    // Prevent focus loss when clicking input
    input.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Window control buttons
    document.querySelector('.minimize').addEventListener('click', () => {
        document.querySelector('.terminal').style.opacity = '0.5';
    });

    document.querySelector('.maximize').addEventListener('click', () => {
        document.querySelector('.terminal').classList.toggle('maximized');
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.terminal').style.display = 'none';
    });
});