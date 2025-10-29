// Singly Linked List Game
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert a new node at the end
    insert(value) {
        const newNode = { data: value, next: null };
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return true;
    }

    // Delete a node with given value
    delete(value) {
        if (!this.head) return false;
        
        if (this.head.data === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.data !== value) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        return false;
    }

    // Search for a value
    search(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Reverse the linked list
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
        return true;
    }

    // Get array representation
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    // Clear the list
    clear() {
        this.head = null;
        this.size = 0;
    }
}

// Game State
class GameState {
    constructor() {
        this.linkedList = new SinglyLinkedList();
        this.score = 0;
        this.level = 1;
        this.currentOperation = null;
        this.gameHistory = [];
        this.difficulty = 1;
    }

    startNewGame() {
        this.linkedList.clear();
        this.score = 0;
        this.level = 1;
        this.currentOperation = null;
        this.gameHistory = [];
        this.difficulty = 1;
        
        // Add some initial nodes for the game
        this.linkedList.insert(5);
        this.linkedList.insert(10);
        this.linkedList.insert(15);
        
        this.updateDisplay();
        this.showFeedback("New game started! The linked list has been initialized with some values.", "info");
    }

    selectOperation(operation) {
        this.currentOperation = operation;
        this.updateOperationButtons();
        this.showOperationInstructions(operation);
    }

    executeOperation(value) {
        if (!this.currentOperation) {
            this.showFeedback("Please select an operation first!", "error");
            return;
        }

        let success = false;
        let message = "";

        switch (this.currentOperation) {
            case 'insert':
                success = this.linkedList.insert(value);
                message = success ? 
                    `Successfully inserted ${value} into the linked list!` : 
                    `Failed to insert ${value}`;
                break;
            
            case 'delete':
                success = this.linkedList.delete(value);
                message = success ? 
                    `Successfully deleted ${value} from the linked list!` : 
                    `Value ${value} not found in the linked list`;
                break;
            
            case 'search':
                const found = this.linkedList.search(value);
                success = true;
                message = found ? 
                    `Value ${value} found in the linked list!` : 
                    `Value ${value} not found in the linked list`;
                break;
            
            case 'reverse':
                success = this.linkedList.reverse();
                message = success ? 
                    "Successfully reversed the linked list!" : 
                    "Failed to reverse the linked list";
                break;
        }

        if (success) {
            this.score += this.calculatePoints();
            this.checkLevelUp();
            this.gameHistory.push({
                operation: this.currentOperation,
                value: value,
                success: success,
                timestamp: new Date()
            });
        }

        this.showFeedback(message, success ? "success" : "error");
        this.updateDisplay();
        this.currentOperation = null;
        this.updateOperationButtons();
    }

    calculatePoints() {
        const basePoints = 10;
        const difficultyMultiplier = this.difficulty;
        const sizeBonus = Math.floor(this.linkedList.size / 5) * 5;
        return basePoints * difficultyMultiplier + sizeBonus;
    }

    checkLevelUp() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.difficulty = Math.min(this.level, 5);
            this.showFeedback(`🎉 Level Up! You're now at level ${this.level}!`, "success");
        }
    }

    showOperationInstructions(operation) {
        const instructions = {
            insert: "Enter a value to insert into the linked list",
            delete: "Enter a value to delete from the linked list",
            search: "Enter a value to search for in the linked list",
            reverse: "Click submit to reverse the entire linked list"
        };
        
        this.showFeedback(instructions[operation], "info");
        
        // Show/hide input panel based on operation
        const inputPanel = document.getElementById('inputPanel');
        if (operation === 'reverse') {
            inputPanel.style.display = 'none';
        } else {
            inputPanel.style.display = 'block';
        }
    }

    updateOperationButtons() {
        const buttons = document.querySelectorAll('.op-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.operation === this.currentOperation) {
                btn.classList.add('active');
            }
        });
    }

    showFeedback(message, type) {
        const feedbackText = document.getElementById('feedbackText');
        feedbackText.textContent = message;
        feedbackText.className = `feedback-text ${type}`;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            feedbackText.textContent = '';
            feedbackText.className = 'feedback-text';
        }, 3000);
    }

    updateDisplay() {
        this.updateScore();
        this.updateLevel();
        this.updateLinkedListVisual();
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }

    updateLevel() {
        document.getElementById('level').textContent = this.level;
    }

    updateLinkedListVisual() {
        const visual = document.getElementById('linkedListVisual');
        const nodes = this.linkedList.toArray();
        
        if (nodes.length === 0) {
            visual.innerHTML = '<p style="color: #666; font-style: italic;">Empty linked list</p>';
            return;
        }

        let html = '<div class="linked-list-container">';
        
        nodes.forEach((node, index) => {
            html += `<div class="node">${node}</div>`;
            if (index < nodes.length - 1) {
                html += '<span class="arrow">→</span>';
            }
        });
        
        html += '<span class="null-pointer">null</span>';
        html += '</div>';
        
        visual.innerHTML = html;
    }
}

// Game Controller
class GameController {
    constructor() {
        this.gameState = new GameState();
        this.initializeEventListeners();
        this.gameState.startNewGame();
    }

    initializeEventListeners() {
        // New Game Button
        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.gameState.startNewGame();
        });

        // Tutorial Button
        document.getElementById('tutorialBtn').addEventListener('click', () => {
            this.showTutorial();
        });

        // Operation Buttons
        document.querySelectorAll('.op-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const operation = e.target.dataset.operation;
                this.gameState.selectOperation(operation);
            });
        });

        // Submit Button
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.handleSubmit();
        });

        // Enter key in input field
        document.getElementById('valueInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        });

        // Tutorial Modal
        const modal = document.getElementById('tutorialModal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    handleSubmit() {
        const input = document.getElementById('valueInput');
        const value = parseInt(input.value);
        
        if (isNaN(value) || value < 0 || value > 999) {
            this.gameState.showFeedback("Please enter a valid number between 0 and 999", "error");
            return;
        }

        this.gameState.executeOperation(value);
        input.value = '';
        input.focus();
    }

    showTutorial() {
        document.getElementById('tutorialModal').style.display = 'block';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
});

// Add some fun easter eggs and animations
document.addEventListener('DOMContentLoaded', () => {
    // Add confetti effect for level ups
    const originalShowFeedback = GameState.prototype.showFeedback;
    GameState.prototype.showFeedback = function(message, type) {
        if (message.includes('Level Up')) {
            this.createConfetti();
        }
        originalShowFeedback.call(this, message, type);
    };

    // Confetti effect
    GameState.prototype.createConfetti = function() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                animation.onfinish = () => {
                    document.body.removeChild(confetti);
                };
            }, i * 50);
        }
    };
});
