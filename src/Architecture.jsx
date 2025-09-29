import React, { useState } from 'react';
import { Database, Server, Lock, Zap, Globe, Shield, Coins, Users, Activity, Cloud } from 'lucide-react';

const Architecture = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const components = {
        frontend: {
            title: "Client Layer (Frontend)",
            icon: Globe,
            color: "bg-blue-500",
            details: [
                "React.js / Next.js 14+ with App Router",
                "Wagmi v2 for wallet connections",
                "Ethers.js v6 for blockchain interactions",
                "Socket.io-client for real-time game updates",
                "Redux Toolkit + RTK Query for state management",
                "TailwindCSS for styling",
                "MetaMask, WalletConnect, Coinbase Wallet support",
                "SIWE (Sign-In with Ethereum) authentication"
            ]
        },
        auth: {
            title: "Authentication & Authorization",
            icon: Shield,
            color: "bg-purple-500",
            details: [
                "SIWE for wallet-based authentication",
                "JWT tokens (short-lived access + refresh tokens)",
                "Redis for session management",
                "Rate limiting with Redis",
                "2FA optional support",
                "Anti-bot measures (hCaptcha/Turnstile)",
                "IP whitelisting for admin access"
            ]
        },
        gateway: {
            title: "API Gateway & Load Balancer",
            icon: Activity,
            color: "bg-green-500",
            details: [
                "NGINX / Kong API Gateway",
                "SSL/TLS termination",
                "Request routing & load balancing",
                "Rate limiting (1000 req/min per IP)",
                "DDoS protection (Cloudflare)",
                "WAF (Web Application Firewall)",
                "Health checks & circuit breakers"
            ]
        },
        backend: {
            title: "Backend Services (Microservices)",
            icon: Server,
            color: "bg-orange-500",
            details: [
                "Node.js / Express.js services",
                "Game Logic Service (TypeScript)",
                "Wallet Service (balance checks)",
                "Tournament Service",
                "Leaderboard Service",
                "Notification Service",
                "Admin Dashboard Service",
                "Docker containers + Kubernetes orchestration"
            ]
        },
        realtime: {
            title: "Real-Time Communication",
            icon: Zap,
            color: "bg-yellow-500",
            details: [
                "Socket.io for WebSocket connections",
                "Redis Pub/Sub for horizontal scaling",
                "Socket.io-redis adapter",
                "Room-based architecture (game tables)",
                "Heartbeat monitoring",
                "Automatic reconnection handling",
                "Message queuing with Kafka"
            ]
        },
        messageQueue: {
            title: "Message Queue & Event Streaming",
            icon: Activity,
            color: "bg-pink-500",
            details: [
                "Apache Kafka for event streaming",
                "Topics: game-events, transactions, notifications",
                "Zookeeper for coordination",
                "Kafka Connect for DB integration",
                "Event sourcing pattern",
                "CQRS implementation",
                "Dead letter queue for failed events"
            ]
        },
        cache: {
            title: "Caching Layer",
            icon: Zap,
            color: "bg-red-500",
            details: [
                "Redis Cluster for high availability",
                "Session storage (TTL: 24h)",
                "Leaderboard caching",
                "Game state caching",
                "API response caching",
                "Rate limiting counters",
                "Pub/Sub for real-time events"
            ]
        },
        database: {
            title: "Database Layer",
            icon: Database,
            color: "bg-indigo-500",
            details: [
                "PostgreSQL 15+ (Primary DB)",
                "Master-Slave replication",
                "Connection pooling (PgBouncer)",
                "Partitioning by date/player",
                "Indexes on frequently queried fields",
                "Backup strategy (daily + WAL archiving)",
                "Tables: users, games, transactions, balances"
            ]
        },
        blockchain: {
            title: "Blockchain Integration",
            icon: Coins,
            color: "bg-cyan-500",
            details: [
                "Ethereum Mainnet / L2 (Polygon, Arbitrum)",
                "Hardhat for smart contract development",
                "OpenZeppelin contracts (upgradeable)",
                "Ethers.js v6 for interactions",
                "Infura / Alchemy as RPC providers",
                "Event listeners for on-chain activities",
                "Gas optimization: batch transactions"
            ]
        },
        smartContracts: {
            title: "Smart Contracts (Solidity)",
            icon: Lock,
            color: "bg-emerald-500",
            details: [
                "PokerToken.sol (ERC-20 game token)",
                "GameEscrow.sol (holds bets, ReentrancyGuard)",
                "Tournament.sol (tournament management)",
                "NFTRewards.sol (ERC-721 achievements)",
                "Upgradeable proxy pattern (UUPS)",
                "Chainlink VRF for random card dealing",
                "Multi-sig for admin operations",
                "Audited by CertiK/OpenZeppelin"
            ]
        },
        storage: {
            title: "Decentralized Storage",
            icon: Cloud,
            color: "bg-violet-500",
            details: [
                "IPFS for storing game metadata",
                "NFT metadata (images, achievements)",
                "Tournament results archives",
                "Pinata / Web3.Storage for pinning",
                "Content addressing (CID)",
                "Backup on Filecoin for long-term storage"
            ]
        },
        monitoring: {
            title: "Monitoring & Logging",
            icon: Activity,
            color: "bg-teal-500",
            details: [
                "Prometheus for metrics collection",
                "Grafana for visualization",
                "ELK Stack (Elasticsearch, Logstash, Kibana)",
                "Sentry for error tracking",
                "CloudWatch / Datadog",
                "Uptime monitoring (UptimeRobot)",
                "Alerts via PagerDuty / Slack"
            ]
        }
    };

    const securityFeatures = [
        "ReentrancyGuard on all payable functions",
        "Checks-Effects-Interactions pattern",
        "SafeMath equivalent (Solidity 0.8+)",
        "Access control (Ownable, AccessControl)",
        "Input validation & sanitization",
        "SQL injection prevention (parameterized queries)",
        "XSS protection (CSP headers)",
        "CORS configuration",
        "Encrypted environment variables",
        "Regular security audits"
    ];

    const gasOptimizations = [
        "Batch multiple operations in single transaction",
        "Use events for data storage instead of state variables",
        "Pack struct variables efficiently",
        "Use mappings instead of arrays where possible",
        "Minimize storage writes",
        "Use calldata instead of memory for read-only params",
        "Short-circuit conditions in require statements",
        "Remove unused variables",
        "Use fixed-size bytes instead of string",
        "Layer 2 solutions (Polygon) for cheaper gas"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Blockchain Poker Game Architecture
                    </h1>
                    <p className="text-gray-400 text-lg">Production-Ready, Scalable & Secure System Design</p>
                </div>

                {/* Architecture Diagram */}
                <div className="bg-gray-800 rounded-2xl p-8 mb-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Server className="w-6 h-6" />
                        System Architecture Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {Object.entries(components).map(([key, comp]) => {
                            const Icon = comp.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedComponent(key)}
                                    className={`${comp.color} p-6 rounded-xl hover:scale-105 transition-transform duration-200 text-left shadow-lg hover:shadow-2xl`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="w-8 h-8" />
                                        <h3 className="font-bold text-lg">{comp.title}</h3>
                                    </div>
                                    <p className="text-sm opacity-90">Click to view details</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Component Details */}
                    {selectedComponent && (
                        <div className="bg-gray-900 rounded-xl p-6 border-2 border-purple-500 animate-fadeIn">
                            <h3 className="text-2xl font-bold mb-4 text-purple-400">
                                {components[selectedComponent].title}
                            </h3>
                            <ul className="space-y-2">
                                {components[selectedComponent].details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">▹</span>
                                        <span className="text-gray-300">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Data Flow */}
                <div className="bg-gray-800 rounded-2xl p-8 mb-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-6 h-6" />
                        Game Flow Architecture
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">1</div>
                            <div>
                                <h4 className="font-bold">User Authentication</h4>
                                <p className="text-sm text-gray-400">MetaMask → SIWE → JWT Token → Redis Session</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">2</div>
                            <div>
                                <h4 className="font-bold">Join Game Table</h4>
                                <p className="text-sm text-gray-400">WebSocket Connection → Socket.io Room → Redis Pub/Sub</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">3</div>
                            <div>
                                <h4 className="font-bold">Place Bet</h4>
                                <p className="text-sm text-gray-400">Frontend → API Gateway → Game Service → Smart Contract (Escrow)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">4</div>
                            <div>
                                <h4 className="font-bold">Game Logic Execution</h4>
                                <p className="text-sm text-gray-400">Backend Logic → Chainlink VRF (Random Cards) → Kafka Event Stream</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">5</div>
                            <div>
                                <h4 className="font-bold">Winner Distribution</h4>
                                <p className="text-sm text-gray-400">Smart Contract → Transfer Tokens → Update PostgreSQL → Cache in Redis</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
                            <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center font-bold">6</div>
                            <div>
                                <h4 className="font-bold">Real-time Updates</h4>
                                <p className="text-sm text-gray-400">Socket.io Emit → All Players Receive Updates → UI Re-render</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Features */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-400">
                            <Shield className="w-6 h-6" />
                            Security Features
                        </h2>
                        <ul className="space-y-2">
                            {securityFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="text-red-400 mt-1">🔒</span>
                                    <span className="text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
                            <Zap className="w-6 h-6" />
                            Gas Optimization Techniques
                        </h2>
                        <ul className="space-y-2">
                            {gasOptimizations.map((opt, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="text-green-400 mt-1">⚡</span>
                                    <span className="text-gray-300">{opt}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tech Stack Summary */}
                <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Server className="w-6 h-6" />
                        Complete Tech Stack
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div>
                            <h3 className="font-bold mb-3 text-blue-300">Frontend</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li>• Next.js 14+</li>
                                <li>• React 18+</li>
                                <li>• Wagmi v2</li>
                                <li>• Ethers.js v6</li>
                                <li>• Socket.io-client</li>
                                <li>• TailwindCSS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3 text-green-300">Backend</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li>• Node.js / Express</li>
                                <li>• TypeScript</li>
                                <li>• Socket.io</li>
                                <li>• Kafka</li>
                                <li>• Redis</li>
                                <li>• PostgreSQL</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3 text-purple-300">Blockchain</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li>• Solidity 0.8+</li>
                                <li>• Hardhat</li>
                                <li>• OpenZeppelin</li>
                                <li>• Chainlink VRF</li>
                                <li>• IPFS</li>
                                <li>• Polygon/Arbitrum</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3 text-orange-300">DevOps</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li>• Docker</li>
                                <li>• Kubernetes</li>
                                <li>• NGINX</li>
                                <li>• Prometheus</li>
                                <li>• Grafana</li>
                                <li>• GitHub Actions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Scalability Notes */}
                <div className="mt-8 bg-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Scalability & Performance
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                        <div>
                            <h3 className="font-bold mb-2 text-blue-400">Horizontal Scaling</h3>
                            <p className="text-sm">Multiple backend instances behind load balancer. Redis Pub/Sub for Socket.io synchronization. Kafka partitions for parallel processing.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2 text-green-400">Database Optimization</h3>
                            <p className="text-sm">Read replicas for queries. Write to master. Connection pooling. Proper indexing. Partitioning for large tables.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2 text-purple-400">Caching Strategy</h3>
                            <p className="text-sm">Redis for sessions, game states, leaderboards. CDN for static assets. API response caching with proper TTL.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2 text-orange-400">Layer 2 Solutions</h3>
                            <p className="text-sm">Use Polygon or Arbitrum for lower gas fees. Batch transactions. Optimize contract storage layout.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Architecture