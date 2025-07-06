// Application data
const appData = {
  "threatHunts": [
    {
      "id": "SO-Agent-7",
      "status": "active",
      "title": "Anomalous Egress Traffic Investigation",
      "target": "web-frontend-3a7f",
      "steps": 5,
      "currentStep": 3,
      "startTime": "2025-07-05T17:15:23Z",
      "reasoning": "Investigating 47MB transfer to external IP 203.0.113.42 in 3-second burst",
      "workflow": [
        {"step": 1, "name": "Event Detection", "status": "completed", "description": "eBPF sensor detected anomalous network flow"},
        {"step": 2, "name": "Data Gathering", "status": "completed", "description": "Queried OpenSearch for 30-day baseline"},
        {"step": 3, "name": "Threat Intel Correlation", "status": "active", "description": "RAG service searching threat database"},
        {"step": 4, "name": "Autonomous Remediation", "status": "pending", "description": "Await correlation results"},
        {"step": 5, "name": "Human Handoff", "status": "pending", "description": "Generate investigation report"}
      ]
    },
    {
      "id": "SO-Agent-12",
      "status": "active", 
      "title": "Suspicious Container Behavior",
      "target": "api-gateway-2b8c",
      "steps": 4,
      "currentStep": 2,
      "startTime": "2025-07-05T17:14:45Z",
      "reasoning": "Container making unexpected syscalls to kernel modules"
    },
    {
      "id": "SO-Agent-19",
      "status": "completed",
      "title": "Privilege Escalation Attempt",
      "target": "database-cluster-1",
      "steps": 6,
      "currentStep": 6,
      "startTime": "2025-07-05T17:12:10Z",
      "reasoning": "Blocked privilege escalation and quarantined affected pod"
    }
  ],
  "runtimeDefense": {
    "status": "active",
    "threatsBlocked": 1247,
    "protectedEndpoints": 8394,
    "recentBlocks": [
      {
        "timestamp": "2025-07-05T17:16:45Z",
        "type": "Prompt Injection",
        "target": "customer-service-llm",
        "action": "BLOCKED",
        "description": "Malicious prompt attempting to extract system configuration"
      },
      {
        "timestamp": "2025-07-05T17:15:23Z", 
        "type": "Model Theft Attempt",
        "target": "recommendation-engine",
        "action": "BLOCKED",
        "description": "Unauthorized model weight access attempt"
      }
    ]
  },
  "platformMetrics": {
    "eventProcessingRate": 847000,
    "activeHunts": 23,
    "averageResponseTime": 127,
    "systemUptime": 99.97
  },
  "threatIntelligence": {
    "totalSources": 247,
    "lastUpdate": "2025-07-05T17:15:00Z",
    "recentCorrelations": [
      {
        "id": "TI-2024-0847",
        "title": "Kinsing Cryptominer Traffic Patterns",
        "confidence": 95,
        "correlation": "Current egress pattern matches known Kinsing family signatures"
      }
    ]
  }
};

// Neural Network Animation for Welcome Screen
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural network nodes
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 150) {
                connections.push({
                    from: i,
                    to: j,
                    opacity: Math.max(0, 1 - distance / 150)
                });
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        connections.forEach(conn => {
            const nodeA = nodes[conn.from];
            const nodeB = nodes[conn.to];
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${conn.opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Dashboard functionality
function enterDashboard() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainDashboard = document.getElementById('mainDashboard');
    
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainDashboard.classList.remove('hidden');
        initDashboard();
    }, 500);
}

// Initialize dashboard with live data
function initDashboard() {
    // Start live data updates
    startLiveDataUpdates();
    
    // Initialize threat hunt nodes
    initThreatHuntNodes();
    
    // Initialize intelligence feed
    initIntelligenceFeed();
    
    // Initialize metrics
    updateMetrics();
    
    // Start animations
    startAnimations();
}

// Live data updates
function startLiveDataUpdates() {
    // Update event processing rate
    let eventRate = appData.platformMetrics.eventProcessingRate;
    setInterval(() => {
        eventRate += Math.floor(Math.random() * 1000) - 500;
        eventRate = Math.max(800000, Math.min(900000, eventRate));
        document.getElementById('eventRate').textContent = `${Math.floor(eventRate / 1000)}K`;
    }, 2000);
    
    // Update active hunts count
    let activeHunts = appData.platformMetrics.activeHunts;
    setInterval(() => {
        activeHunts += Math.floor(Math.random() * 3) - 1;
        activeHunts = Math.max(20, Math.min(30, activeHunts));
        document.getElementById('activeHunts').textContent = activeHunts;
        document.getElementById('activeHuntsCount').textContent = activeHunts;
    }, 5000);
    
    // Update response time
    let responseTime = appData.platformMetrics.averageResponseTime;
    setInterval(() => {
        responseTime += Math.floor(Math.random() * 20) - 10;
        responseTime = Math.max(100, Math.min(200, responseTime));
        document.getElementById('responseTime').textContent = `${responseTime}ms`;
    }, 3000);
    
    // Update uptime
    let uptime = appData.platformMetrics.systemUptime;
    setInterval(() => {
        uptime += 0.001;
        document.getElementById('uptime').textContent = `${uptime.toFixed(2)}%`;
    }, 10000);
}

// Initialize threat hunt nodes
function initThreatHuntNodes() {
    const huntNodes = document.querySelectorAll('.hunt-node');
    
    huntNodes.forEach(node => {
        node.addEventListener('click', () => {
            const agentId = node.dataset.agent;
            showHuntDetail(agentId);
        });
    });
}

// Show threat hunt detail modal
function showHuntDetail(agentId) {
    const hunt = appData.threatHunts.find(h => h.id === agentId);
    if (!hunt) return;
    
    const modal = document.getElementById('huntDetailModal');
    const agentIdElement = document.getElementById('huntAgentId');
    const workflowSteps = document.getElementById('workflowSteps');
    const reasoningTrace = document.getElementById('reasoningTrace');
    
    agentIdElement.textContent = hunt.id;
    
    // Populate workflow steps
    workflowSteps.innerHTML = '';
    hunt.workflow.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `workflow-step ${step.status}`;
        stepDiv.innerHTML = `
            <div class="step-number">${step.step}</div>
            <div class="step-details">
                <div class="step-title">${step.name}</div>
                <div class="step-description">${step.description}</div>
                <div class="step-status">${step.status.toUpperCase()}</div>
            </div>
        `;
        workflowSteps.appendChild(stepDiv);
    });
    
    // Populate reasoning trace
    reasoningTrace.innerHTML = `
        <div class="reasoning-item">
            <strong>Initial Detection:</strong> ${hunt.reasoning}
        </div>
        <div class="reasoning-item">
            <strong>Target Analysis:</strong> Kubernetes pod ${hunt.target} showing unusual behavior
        </div>
        <div class="reasoning-item">
            <strong>Risk Assessment:</strong> High confidence anomaly detected via eBPF sensors
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Close hunt detail modal
function closeHuntDetail() {
    const modal = document.getElementById('huntDetailModal');
    modal.classList.add('hidden');
}

// Initialize intelligence feed
function initIntelligenceFeed() {
    const intelligenceItems = [
        {
            timestamp: "2 min ago",
            content: "AI Correlation Match: Current egress pattern matches threat brief TI-2024-0847",
            confidence: 95
        },
        {
            timestamp: "5 min ago",
            content: "Knowledge Graph Update: New connection identified between Kinsing family and current IOCs",
            confidence: 87
        },
        {
            timestamp: "8 min ago",
            content: "Threat Intelligence Enrichment: Added 15 new indicators from external feeds",
            confidence: 82
        }
    ];
    
    // Simulate new intelligence items
    setInterval(() => {
        const newItem = {
            timestamp: "Just now",
            content: generateRandomIntelligence(),
            confidence: Math.floor(Math.random() * 20) + 80
        };
        
        // Add new item to feed
        addIntelligenceItem(newItem);
    }, 15000);
}

// Generate random intelligence content
function generateRandomIntelligence() {
    const templates = [
        "Behavioral Analysis: Detected pattern deviation in container runtime",
        "ML Model Update: Threat detection accuracy improved by 3.2%",
        "RAG Enhancement: Knowledge base expanded with 247 new threat indicators",
        "Autonomous Response: Successfully mitigated 3 potential incidents",
        "Cross-correlation: Identified relationship between 2 previously unrelated events"
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// Add intelligence item to feed
function addIntelligenceItem(item) {
    const feed = document.querySelector('.intelligence-feed');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'intel-item';
    itemDiv.innerHTML = `
        <div class="intel-timestamp">${item.timestamp}</div>
        <div class="intel-content">
            <strong>${item.content}</strong>
        </div>
        <div class="intel-confidence">${item.confidence}% Confidence</div>
    `;
    
    feed.insertBefore(itemDiv, feed.firstChild);
    
    // Remove oldest item if more than 5
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

// Update metrics
function updateMetrics() {
    // This function is called to initialize metrics display
    // Live updates are handled by startLiveDataUpdates()
}

// Start animations
function startAnimations() {
    // Animate workflow steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.1}s`;
        step.style.animation = 'slideInUp 0.5s ease-out forwards';
    });
    
    // Animate metrics cards
    const metricCards = document.querySelectorAll('.metric-card, .stat-card');
    metricCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
    });
}

// Simulate runtime defense updates
function simulateRuntimeDefense() {
    const blockTypes = [
        "Prompt Injection",
        "Model Theft Attempt", 
        "Data Poisoning",
        "Adversarial Input",
        "Privilege Escalation"
    ];
    
    const targets = [
        "customer-service-llm",
        "recommendation-engine",
        "fraud-detection-model",
        "search-assistant",
        "content-moderation"
    ];
    
    setInterval(() => {
        const newBlock = {
            timestamp: new Date().toISOString(),
            type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
            target: targets[Math.floor(Math.random() * targets.length)],
            action: "BLOCKED",
            description: "Malicious activity detected and prevented"
        };
        
        // Update recent blocks display
        updateRecentBlocks(newBlock);
        
        // Update threats blocked counter
        const threatsBlockedElement = document.querySelector('.stat-card .stat-value');
        if (threatsBlockedElement) {
            let current = parseInt(threatsBlockedElement.textContent.replace(',', ''));
            current += 1;
            threatsBlockedElement.textContent = current.toLocaleString();
        }
    }, 8000);
}

// Update recent blocks display
function updateRecentBlocks(newBlock) {
    const recentBlocks = document.querySelector('.recent-blocks');
    const blockItems = recentBlocks.querySelectorAll('.block-item');
    
    // Remove oldest block if more than 3
    if (blockItems.length >= 3) {
        blockItems[blockItems.length - 1].remove();
    }
    
    // Add new block
    const blockDiv = document.createElement('div');
    blockDiv.className = 'block-item';
    blockDiv.innerHTML = `
        <div class="block-type">${newBlock.type}</div>
        <div class="block-target">${newBlock.target}</div>
        <div class="block-status blocked">BLOCKED</div>
    `;
    
    // Insert after the h3
    const h3 = recentBlocks.querySelector('h3');
    h3.after(blockDiv);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork();
    simulateRuntimeDefense();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .workflow-step {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            margin-bottom: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 212, 255, 0.2);
            border-radius: 8px;
        }
        
        .workflow-step.completed {
            border-color: rgba(0, 255, 136, 0.3);
            background: rgba(0, 255, 136, 0.1);
        }
        
        .workflow-step.active {
            border-color: rgba(0, 212, 255, 0.5);
            background: rgba(0, 212, 255, 0.1);
        }
        
        .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.3);
            color: #00d4ff;
            font-weight: bold;
            font-size: 14px;
        }
        
        .workflow-step.completed .step-number {
            background: rgba(0, 255, 136, 0.3);
            color: #00ff88;
        }
        
        .step-details {
            flex: 1;
        }
        
        .step-title {
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .step-description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            margin-bottom: 4px;
        }
        
        .step-status {
            color: #00d4ff;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .workflow-step.completed .step-status {
            color: #00ff88;
        }
        
        .reasoning-item {
            margin-bottom: 16px;
            padding: 12px;
            background: rgba(0, 0, 0, 0.2);
            border-left: 3px solid #00d4ff;
            border-radius: 4px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .welcome-screen {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Handle escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeHuntDetail();
        }
    });
});

// Global functions for HTML onclick handlers
window.enterDashboard = enterDashboard;
window.closeHuntDetail = closeHuntDetail;