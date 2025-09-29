import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Lock, Database, Zap, Shield, Users, Radio, Cloud, Server } from 'lucide-react';

const Flow = () => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (id) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const flowSteps = [
        {
            id: 'step1',
            phase: 'PHASE 1: User Authentication & Wallet Connection',
            color: 'border-blue-500',
            bgColor: 'bg-blue-900/20',
            steps: [
                {
                    title: '1. User Opens Application',
                    component: 'Client (Browser/Mobile)',
                    tech: ['Next.js', 'React', 'TailwindCSS'],
                    action: 'User lands on homepage',
                    dataFlow: [],
                    security: []
                },
                {
                    title: '2. Connect Wallet Button Click',
                    component: 'Frontend → Wallet Provider',
                    tech: ['Wagmi', 'Ethers.js', 'MetaMask/WalletConnect'],
                    action: 'Trigger wallet connection modal',
                    dataFlow: [
                        'Request wallet connection',
                        'User approves in MetaMask'
                    ],
                    security: ['SSL/TLS encryption on all requests']
                },
                {
                    title: '3. Wallet Connected',
                    component: 'Client → API Gateway',
                    tech: ['NGINX', 'Cloudflare'],
                    action: 'Send wallet address to backend',
                    dataFlow: [
                        'wallet_address: 0x1234...',
                        'chain_id: 1 (Ethereum) or 137 (Polygon)',
                        'Request nonce for SIWE'
                    ],
                    security: [
                        'Rate limiting: 10 req/min per IP',
                        'DDoS protection',
                        'WAF filtering'
                    ]
                },
                {
                    title: '4. Generate Authentication Nonce',
                    component: 'Auth Service',
                    tech: ['Node.js', 'Express', 'SIWE Library'],
                    action: 'Create unique nonce for signature',
                    dataFlow: [
                        'Generate random nonce',
                        'Store in Redis with 5min TTL',
                        'Return nonce to client'
                    ],
                    security: [
                        'Nonce stored in Redis (key: wallet:nonce:{address})',
                        'TTL: 5 minutes',
                        'One-time use only'
                    ]
                },
                {
                    title: '5. Sign Message with Wallet',
                    component: 'Client → MetaMask',
                    tech: ['Ethers.js', 'SIWE'],
                    action: 'User signs SIWE message',
                    dataFlow: [
                        'Create SIWE message with nonce',
                        'User signs with private key (client-side)',
                        'Signature generated'
                    ],
                    security: [
                        'Private key never leaves user device',
                        'Message includes domain, timestamp, nonce'
                    ]
                },
                {
                    title: '6. Verify Signature',
                    component: 'Auth Service → Redis',
                    tech: ['SIWE', 'Ethers.js', 'Redis'],
                    action: 'Validate signature and create session',
                    dataFlow: [
                        'Verify signature matches wallet address',
                        'Check nonce validity',
                        'Delete used nonce from Redis',
                        'Generate JWT access token (15min)',
                        'Generate refresh token (7 days)',
                        'Create session in Redis'
                    ],
                    security: [
                        'JWT signed with RS256 algorithm',
                        'Store refresh token in Redis (key: session:{user_id})',
                        'HttpOnly, Secure, SameSite cookies',
                        'Session data: {user_id, wallet_address, ip, user_agent}'
                    ]
                },
                {
                    title: '7. User Authenticated',
                    component: 'Client Storage',
                    tech: ['Memory State (React)', 'HTTP Cookies'],
                    action: 'Store auth state',
                    dataFlow: [
                        'Access token in memory (useState)',
                        'Refresh token in HttpOnly cookie',
                        'User profile data'
                    ],
                    security: [
                        'NO localStorage usage',
                        'Tokens in memory only',
                        'Auto-refresh before expiry'
                    ]
                }
            ]
        },
        {
            id: 'step2',
            phase: 'PHASE 2: Lobby Connection & Game Discovery',
            color: 'border-purple-500',
            bgColor: 'bg-purple-900/20',
            steps: [
                {
                    title: '8. Navigate to Game Lobby',
                    component: 'Client → API Gateway → Game Service',
                    tech: ['Next.js Router', 'REST API'],
                    action: 'Fetch available game tables',
                    dataFlow: [
                        'GET /api/lobby/tables',
                        'Headers: Authorization: Bearer {jwt_token}',
                        'Query params: {game_type, stake_range, player_count}'
                    ],
                    security: [
                        'JWT validation middleware',
                        'Rate limiting: 100 req/min',
                        'Input sanitization'
                    ]
                },
                {
                    title: '9. Query Active Tables',
                    component: 'Game Service → Redis Cache',
                    tech: ['Redis', 'Node.js'],
                    action: 'Check cached lobby data',
                    dataFlow: [
                        'Check Redis key: lobby:tables:active',
                        'If cache hit: return data',
                        'If cache miss: query PostgreSQL'
                    ],
                    security: [
                        'Cache TTL: 10 seconds',
                        'Data sanitized before caching'
                    ]
                },
                {
                    title: '10. Fetch from Database (if cache miss)',
                    component: 'Game Service → PostgreSQL',
                    tech: ['PostgreSQL', 'PgBouncer', 'TypeORM'],
                    action: 'Query game_tables table',
                    dataFlow: [
                        'SELECT * FROM game_tables WHERE status = "waiting" AND player_count < max_players',
                        'Use read replica for query',
                        'Return result to service'
                    ],
                    security: [
                        'Parameterized queries (SQL injection prevention)',
                        'Connection pooling',
                        'Read-only user for queries'
                    ]
                },
                {
                    title: '11. Display Lobby Tables',
                    component: 'Client UI',
                    tech: ['React', 'TailwindCSS'],
                    action: 'Render available tables',
                    dataFlow: [
                        'Show table_id, players, stakes, game_type',
                        'Real-time player count updates via WebSocket'
                    ],
                    security: [
                        'XSS protection (sanitized output)',
                        'CSP headers'
                    ]
                },
                {
                    title: '12. User Selects Table',
                    component: 'Client → API Gateway',
                    tech: ['REST API'],
                    action: 'Request to join table',
                    dataFlow: [
                        'POST /api/tables/{table_id}/join',
                        'Body: {player_id, buy_in_amount}',
                        'Validate buy-in amount'
                    ],
                    security: [
                        'JWT validation',
                        'Check user balance before join',
                        'Idempotency key to prevent duplicate joins'
                    ]
                }
            ]
        },
        {
            id: 'step3',
            phase: 'PHASE 3: WebSocket Connection & Real-Time Session',
            color: 'border-green-500',
            bgColor: 'bg-green-900/20',
            steps: [
                {
                    title: '13. Establish WebSocket Connection',
                    component: 'Client → Socket.io Server',
                    tech: ['Socket.io', 'WebSocket'],
                    action: 'Create persistent connection',
                    dataFlow: [
                        'Connect to wss://socket.yourgame.com',
                        'Send auth token in handshake',
                        'Connection established'
                    ],
                    security: [
                        'WSS (WebSocket Secure)',
                        'Token validation on connection',
                        'Rate limiting: 50 events/sec per connection'
                    ]
                },
                {
                    title: '14. Authenticate Socket Connection',
                    component: 'Socket.io Middleware → Redis',
                    tech: ['Socket.io', 'JWT', 'Redis'],
                    action: 'Verify JWT and create socket session',
                    dataFlow: [
                        'Extract JWT from handshake',
                        'Verify token signature',
                        'Check session exists in Redis',
                        'Store socket_id mapping: socket:{user_id} → {socket_id}'
                    ],
                    security: [
                        'Reject invalid tokens',
                        'Check IP match with original session',
                        'Log connection attempts'
                    ]
                },
                {
                    title: '15. Join Table Room',
                    component: 'Socket.io Server → Redis Pub/Sub',
                    tech: ['Socket.io Rooms', 'Redis Pub/Sub'],
                    action: 'Add player to table room',
                    dataFlow: [
                        'socket.join(`table:${table_id}`)',
                        'Publish event to Redis: "player:joined"',
                        'Update room player list'
                    ],
                    security: [
                        'Verify player is authorized for this table',
                        'Check table capacity',
                        'Prevent room hijacking'
                    ]
                },
                {
                    title: '16. Emit Join Event to All Players',
                    component: 'Socket.io → All Room Members',
                    tech: ['Socket.io', 'Redis Adapter'],
                    action: 'Notify all players in room',
                    dataFlow: [
                        'io.to(`table:${table_id}`).emit("player_joined", {player_data})',
                        'Each client receives event',
                        'Update UI with new player'
                    ],
                    security: [
                        'Send only public player data',
                        'NO wallet addresses in broadcast',
                        'Sanitize all outgoing data'
                    ]
                },
                {
                    title: '17. Waiting in Lobby',
                    component: 'Client + Socket.io',
                    tech: ['React State', 'Socket.io Events'],
                    action: 'Display waiting screen',
                    dataFlow: [
                        'Listen for "player_joined" events',
                        'Listen for "game_starting" event',
                        'Show player count: 3/6'
                    ],
                    security: [
                        'Heartbeat every 30s',
                        'Auto-reconnect on disconnect',
                        'Session validation on reconnect'
                    ]
                },
                {
                    title: '18. Store Session in Database',
                    component: 'Game Service → PostgreSQL',
                    tech: ['PostgreSQL', 'Kafka'],
                    action: 'Record player join event',
                    dataFlow: [
                        'INSERT INTO game_sessions (table_id, player_id, join_time, status)',
                        'Publish to Kafka topic: "game-events"',
                        'Event: {type: "player_joined", table_id, player_id, timestamp}'
                    ],
                    security: [
                        'Encrypted player data at rest',
                        'Write to master DB',
                        'Transaction with rollback'
                    ]
                }
            ]
        },
        {
            id: 'step4',
            phase: 'PHASE 4: Game Start & Escrow Lock',
            color: 'border-yellow-500',
            bgColor: 'bg-yellow-900/20',
            steps: [
                {
                    title: '19. Check Player Count',
                    component: 'Game Service',
                    tech: ['Node.js', 'Redis'],
                    action: 'Verify minimum players reached',
                    dataFlow: [
                        'Check Redis: table:{table_id}:player_count',
                        'If >= min_players: trigger game start',
                        'Start countdown timer: 10 seconds'
                    ],
                    security: [
                        'Validate all players have sufficient balance',
                        'Check no duplicate players'
                    ]
                },
                {
                    title: '20. Lock Funds in Smart Contract',
                    component: 'Game Service → Blockchain',
                    tech: ['Ethers.js', 'Hardhat', 'GameEscrow.sol'],
                    action: 'Create escrow transaction',
                    dataFlow: [
                        'Call contract: lockFunds(gameId, players[], amounts[])',
                        'Each player approves token transfer',
                        'Funds locked in escrow contract',
                        'Return transaction hash'
                    ],
                    security: [
                        'ReentrancyGuard on lockFunds()',
                        'Checks-Effects-Interactions pattern',
                        'Multi-sig approval for large amounts',
                        'Gas optimization: batch approval'
                    ]
                },
                {
                    title: '21. Verify Blockchain Transaction',
                    component: 'Blockchain Listener Service',
                    tech: ['Ethers.js', 'Infura/Alchemy', 'Kafka'],
                    action: 'Listen for EscrowLocked event',
                    dataFlow: [
                        'Event listener on GameEscrow contract',
                        'Wait for 3 block confirmations',
                        'Publish to Kafka: "escrow-locked"',
                        'Update PostgreSQL: game_status = "funds_locked"'
                    ],
                    security: [
                        'Wait for confirmations to prevent reorg attacks',
                        'Verify event parameters match expected values',
                        'Log all blockchain interactions'
                    ]
                },
                {
                    title: '22. Emit Game Starting Event',
                    component: 'Socket.io → All Players',
                    tech: ['Socket.io', 'Redis Pub/Sub'],
                    action: 'Notify game is starting',
                    dataFlow: [
                        'io.to(`table:${table_id}`).emit("game_starting", {countdown: 10})',
                        'Each client shows countdown',
                        'Prepare game UI'
                    ],
                    security: [
                        'Verify all players still connected',
                        'Handle disconnections gracefully'
                    ]
                },
                {
                    title: '23. Initialize Game State',
                    component: 'Game Service → Redis',
                    tech: ['Redis', 'Node.js'],
                    action: 'Create game state object',
                    dataFlow: [
                        'Generate game_id',
                        'Create Redis hash: game:{game_id}',
                        'Store: {players, pot, round, dealer_position, status}',
                        'Set TTL: 4 hours'
                    ],
                    security: [
                        'Encrypt sensitive game state',
                        'Store private data separately from public data',
                        'Use Redis ACL for access control'
                    ]
                }
            ]
        },
        {
            id: 'step5',
            phase: 'PHASE 5: Game Execution & Real-Time Updates',
            color: 'border-orange-500',
            bgColor: 'bg-orange-900/20',
            steps: [
                {
                    title: '24. Request Random Cards',
                    component: 'Game Service → Chainlink VRF',
                    tech: ['Chainlink VRF', 'Smart Contract'],
                    action: 'Get provably fair random numbers',
                    dataFlow: [
                        'Call requestRandomWords() on VRF contract',
                        'Pay LINK token fee',
                        'Receive random seed',
                        'Use seed to shuffle deck'
                    ],
                    security: [
                        'Verifiable randomness (cannot be manipulated)',
                        'Callback with random numbers',
                        'Store seed hash for audit'
                    ]
                },
                {
                    title: '25. Deal Cards to Players',
                    component: 'Game Service',
                    tech: ['Node.js', 'Cryptography'],
                    action: 'Distribute cards privately',
                    dataFlow: [
                        'Generate card assignments from seed',
                        'Encrypt each player\'s cards',
                        'Store in Redis: player:{player_id}:cards (encrypted)'
                    ],
                    security: [
                        'AES-256 encryption for private cards',
                        'Unique encryption key per player',
                        'Keys stored in Redis with TTL'
                    ]
                },
                {
                    title: '26. Send Private Cards to Players',
                    component: 'Socket.io → Individual Players',
                    tech: ['Socket.io', 'Private Rooms'],
                    action: 'Emit cards to each player privately',
                    dataFlow: [
                        'io.to(player1_socket_id).emit("your_cards", {cards: []})',
                        'Each player receives only their cards',
                        'Never broadcast private cards to room'
                    ],
                    security: [
                        'One-to-one socket emission',
                        'Verify recipient socket_id matches player',
                        'Never log private card data'
                    ]
                },
                {
                    title: '27. Broadcast Public Game State',
                    component: 'Socket.io → All Players',
                    tech: ['Socket.io', 'Redis'],
                    action: 'Send community cards, pot, turn info',
                    dataFlow: [
                        'io.to(`table:${table_id}`).emit("game_state", {pot, community_cards, current_turn, bets})',
                        'Update all clients simultaneously',
                        'Clients render game board'
                    ],
                    security: [
                        'Only send non-sensitive data',
                        'Rate limit: 10 updates/sec max',
                        'Validate data before broadcast'
                    ]
                },
                {
                    title: '28. Player Actions (Bet/Fold/Raise)',
                    component: 'Client → Socket.io → Game Service',
                    tech: ['Socket.io Events', 'Redis'],
                    action: 'Process player move',
                    dataFlow: [
                        'socket.emit("player_action", {action: "raise", amount: 100})',
                        'Game Service validates action',
                        'Update Redis game state',
                        'Publish to Kafka: "player-action" event'
                    ],
                    security: [
                        'Verify it\'s player\'s turn',
                        'Validate bet amount (min/max)',
                        'Check player balance',
                        'Prevent action replay attacks (use nonce)',
                        'Log all actions with timestamp'
                    ]
                },
                {
                    title: '29. Store Action in Database',
                    component: 'Kafka Consumer → PostgreSQL',
                    tech: ['Kafka', 'PostgreSQL'],
                    action: 'Persist game action',
                    dataFlow: [
                        'Consumer reads from "player-action" topic',
                        'INSERT INTO game_actions (game_id, player_id, action_type, amount, timestamp)',
                        'Write to master DB',
                        'Commit offset in Kafka'
                    ],
                    security: [
                        'Event sourcing pattern',
                        'Immutable action log',
                        'Audit trail for disputes'
                    ]
                },
                {
                    title: '30. Broadcast Action to All Players',
                    component: 'Socket.io → All Room Members',
                    tech: ['Socket.io', 'Redis Pub/Sub'],
                    action: 'Update all players\' UI',
                    dataFlow: [
                        'io.to(`table:${table_id}`).emit("player_moved", {player_id, action, amount})',
                        'All clients update game state',
                        'UI shows animation'
                    ],
                    security: [
                        'Sanitize player_id',
                        'No sensitive data in broadcast'
                    ]
                },
                {
                    title: '31. Round Progression',
                    component: 'Game Service',
                    tech: ['Node.js', 'State Machine'],
                    action: 'Move to next betting round',
                    dataFlow: [
                        'Check if all players acted',
                        'Update Redis: game:{game_id}:round += 1',
                        'Reveal community cards (if applicable)',
                        'Reset betting round state'
                    ],
                    security: [
                        'Validate game state transitions',
                        'Atomic updates in Redis',
                        'Log state changes'
                    ]
                }
            ]
        },
        {
            id: 'step6',
            phase: 'PHASE 6: Game End & Winner Distribution',
            color: 'border-red-500',
            bgColor: 'bg-red-900/20',
            steps: [
                {
                    title: '32. Determine Winner',
                    component: 'Game Service',
                    tech: ['Poker Logic Library', 'Node.js'],
                    action: 'Evaluate hands and find winner',
                    dataFlow: [
                        'Get all players\' cards from Redis',
                        'Evaluate hand rankings',
                        'Determine winner(s)',
                        'Calculate pot distribution'
                    ],
                    security: [
                        'Verify all cards are valid',
                        'Multiple validation checks',
                        'Store result hash for audit'
                    ]
                },
                {
                    title: '33. Release Escrow Funds',
                    component: 'Game Service → Smart Contract',
                    tech: ['Ethers.js', 'GameEscrow.sol'],
                    action: 'Transfer winnings from escrow',
                    dataFlow: [
                        'Call contract: releaseFunds(gameId, winners[], amounts[])',
                        'Smart contract validates',
                        'Transfer tokens to winners',
                        'Emit WinningsDistributed event'
                    ],
                    security: [
                        'ReentrancyGuard protection',
                        'Only authorized backend can call',
                        'Multi-sig for large payouts',
                        'Event logging for transparency'
                    ]
                },
                {
                    title: '34. Verify Blockchain Payout',
                    component: 'Blockchain Listener → Kafka',
                    tech: ['Ethers.js', 'Kafka'],
                    action: 'Confirm funds transferred',
                    dataFlow: [
                        'Listen for WinningsDistributed event',
                        'Wait for 3 confirmations',
                        'Publish to Kafka: "payout-confirmed"',
                        'Update player balances in DB'
                    ],
                    security: [
                        'Verify transaction success',
                        'Check amounts match expected values',
                        'Handle failed transactions'
                    ]
                },
                {
                    title: '35. Update Player Balances',
                    component: 'Wallet Service → PostgreSQL',
                    tech: ['PostgreSQL', 'Transactions'],
                    action: 'Record winnings in database',
                    dataFlow: [
                        'BEGIN TRANSACTION',
                        'UPDATE user_balances SET balance += winnings WHERE user_id = winner',
                        'INSERT INTO transactions (user_id, type, amount, game_id)',
                        'COMMIT'
                    ],
                    security: [
                        'ACID transaction',
                        'Balance locks to prevent race conditions',
                        'Audit log all balance changes'
                    ]
                },
                {
                    title: '36. Broadcast Game Results',
                    component: 'Socket.io → All Players',
                    tech: ['Socket.io'],
                    action: 'Show winner and hand',
                    dataFlow: [
                        'io.to(`table:${table_id}`).emit("game_ended", {winner, hand, winnings})',
                        'Clients display results',
                        'Show all players\' cards'
                    ],
                    security: [
                        'Only reveal cards after game ends',
                        'Sanitize output data'
                    ]
                },
                {
                    title: '37. Update Statistics',
                    component: 'Stats Service → PostgreSQL + Redis',
                    tech: ['PostgreSQL', 'Redis'],
                    action: 'Record player stats',
                    dataFlow: [
                        'UPDATE player_stats SET games_played += 1, games_won += 1',
                        'Update leaderboard in Redis',
                        'Clear Redis cache for player profile'
                    ],
                    security: [
                        'Atomic increments',
                        'Prevent stat manipulation'
                    ]
                },
                {
                    title: '38. Store Game History',
                    component: 'Archive Service → PostgreSQL + IPFS',
                    tech: ['PostgreSQL', 'IPFS', 'Pinata'],
                    action: 'Archive complete game data',
                    dataFlow: [
                        'Collect all game actions from DB',
                        'Create JSON with complete game log',
                        'Upload to IPFS via Pinata',
                        'Store CID in PostgreSQL: games.ipfs_cid'
                    ],
                    security: [
                        'Encrypt sensitive data before IPFS upload',
                        'Immutable game record',
                        'Use for dispute resolution'
                    ]
                },
                {
                    title: '39. Clean Up Resources',
                    component: 'Game Service → Redis',
                    tech: ['Redis', 'Socket.io'],
                    action: 'Remove temporary data',
                    dataFlow: [
                        'Delete Redis keys: game:{game_id}, player:{player_id}:cards',
                        'Remove players from Socket.io room',
                        'Close socket connections or move to lobby'
                    ],
                    security: [
                        'Securely delete encryption keys',
                        'Clear all sensitive data',
                        'No data leakage'
                    ]
                },
                {
                    title: '40. Send Notifications',
                    component: 'Notification Service',
                    tech: ['Kafka', 'Email/Push API'],
                    action: 'Notify players of results',
                    dataFlow: [
                        'Consumer reads "game-ended" from Kafka',
                        'Send email/push notification',
                        'Update notification history'
                    ],
                    security: [
                        'Rate limit notifications',
                        'User preference respect',
                        'No sensitive data in notifications'
                    ]
                }
            ]
        },
        {
            id: 'step7',
            phase: 'PHASE 7: Monitoring, Logging & Analytics',
            color: 'border-cyan-500',
            bgColor: 'bg-cyan-900/20',
            steps: [
                {
                    title: 'Continuous Monitoring',
                    component: 'Prometheus + Grafana',
                    tech: ['Prometheus', 'Grafana', 'Node Exporter'],
                    action: 'Track system metrics',
                    dataFlow: [
                        'CPU, RAM, Disk usage',
                        'API response times',
                        'WebSocket connection count',
                        'Database query performance',
                        'Redis cache hit rate'
                    ],
                    security: [
                        'Alert on anomalies',
                        'Dashboard access control',
                        'Encrypted metric storage'
                    ]
                },
                {
                    title: 'Centralized Logging',
                    component: 'ELK Stack',
                    tech: ['Elasticsearch', 'Logstash', 'Kibana'],
                    action: 'Aggregate logs from all services',
                    dataFlow: [
                        'All services send logs to Logstash',
                        'Parse and index in Elasticsearch',
                        'Search and visualize in Kibana',
                        'Retention: 30 days'
                    ],
                    security: [
                        'NO sensitive data in logs',
                        'Mask wallet addresses',
                        'Encrypt logs at rest'
                    ]
                },
                {
                    title: 'Error Tracking',
                    component: 'Sentry',
                    tech: ['Sentry', 'Source Maps'],
                    action: 'Track application errors',
                    dataFlow: [
                        'Capture JS errors from client',
                        'Capture backend exceptions',
                        'Group similar errors',
                        'Alert on critical issues'
                    ],
                    security: [
                        'Scrub sensitive data from reports',
                        'Rate limit error reports',
                        'Team access control'
                    ]
                },
                {
                    title: 'Analytics & BI',
                    component: 'Analytics Service',
                    tech: ['Kafka', 'PostgreSQL', 'Metabase'],
                    action: 'Business intelligence reporting',
                    dataFlow: [
                        'Aggregate data from Kafka',
                        'Store in analytics DB',
                        'Generate reports: DAU, revenue, game stats',
                        'Dashboard for business team'
                    ],
                    security: [
                        'Anonymize user data',
                        'Separate analytics DB',
                        'Read-only access for analysts'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                        Complete Game Flow Architecture
                    </h1>
                    <p className="text-gray-400 text-lg">Step-by-Step Sequential Hierarchy for Blockchain Poker</p>
                    <p className="text-sm text-gray-500 mt-2">User → Client → Lobby → Game → Settlement → Archive</p>
                </div>

                {/* Architecture Overview */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 mb-8 border border-blue-500/30">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        Architecture Layers
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-400 mb-2">Frontend Layer</h3>
                            <p className="text-gray-400">Next.js, React, Wagmi, Socket.io-client</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-400 mb-2">Backend Layer</h3>
                            <p className="text-gray-400">Node.js, Express, Socket.io, Kafka, Redis</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-400 mb-2">Data Layer</h3>
                            <p className="text-gray-400">PostgreSQL, Redis, IPFS, Blockchain</p>
                        </div>
                    </div>
                </div>

                {/* Flow Steps */}
                <div className="space-y-6">
                    {flowSteps.map((phase) => (
                        <div key={phase.id} className={`border-l-4 ${phase.color} ${phase.bgColor} rounded-r-2xl overflow-hidden`}>
                            <button
                                onClick={() => toggleSection(phase.id)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <h2 className="text-2xl font-bold">{phase.phase}</h2>
                                {expandedSections[phase.id] ? (
                                    <ChevronDown className="w-6 h-6" />
                                ) : (
                                    <ChevronRight className="w-6 h-6" />
                                )}
                            </button>

                            {expandedSections[phase.id] && (
                                <div className="px-6 pb-6 space-y-6">
                                    {phase.steps.map((step, idx) => (
                                        <div key={idx} className="bg-gray-800/70 rounded-xl p-5 border border-gray-700">
                                            {/* Step Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                                    {step.title.match(/^\d+/)?.[0]}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-blue-300 mb-1">{step.title}</h3>
                                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                                        <Server className="w-4 h-4" />
                                                        {step.component}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {step.tech.map((tech, techIdx) => (
                                                        <span
                                                            key={techIdx}
                                                            className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs font-medium"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="mb-4">
                                                <p className="text-gray-300">
                                                    <span className="font-semibold text-yellow-400">Action:</span> {step.action}
                                                </p>
                                            </div>

                                            {/* Data Flow */}
                                            {step.dataFlow.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                                                        <Database className="w-4 h-4" />
                                                        Data Flow:
                                                    </h4>
                                                    <ul className="space-y-1 ml-6">
                                                        {step.dataFlow.map((flow, flowIdx) => (
                                                            <li key={flowIdx} className="text-sm text-gray-300 flex items-start gap-2">
                                                                <span className="text-green-400 mt-1">→</span>
                                                                <code className="bg-gray-900/70 px-2 py-0.5 rounded text-green-300">{flow}</code>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Security */}
                                            {step.security.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                                                        <Lock className="w-4 h-4" />
                                                        Security Measures:
                                                    </h4>
                                                    <ul className="space-y-1 ml-6">
                                                        {step.security.map((sec, secIdx) => (
                                                            <li key={secIdx} className="text-sm text-gray-300 flex items-start gap-2">
                                                                <span className="text-red-400 mt-1">🔒</span>
                                                                <span>{sec}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Data Storage Architecture */}
                <div className="mt-12 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/30">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Database className="w-8 h-8" />
                        Data Storage Architecture
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-blue-400 mb-4">PostgreSQL Tables</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <code className="text-green-400">users</code>
                                    <p className="text-gray-400 ml-4">user_id, wallet_address, username, created_at, email_verified</p>
                                </div>
                                <div>
                                    <code className="text-green-400">game_tables</code>
                                    <p className="text-gray-400 ml-4">table_id, game_type, max_players, min_stake, status, created_at</p>
                                </div>
                                <div>
                                    <code className="text-green-400">game_sessions</code>
                                    <p className="text-gray-400 ml-4">session_id, table_id, game_id, players[], status, start_time, end_time</p>
                                </div>
                                <div>
                                    <code className="text-green-400">game_actions</code>
                                    <p className="text-gray-400 ml-4">action_id, game_id, player_id, action_type, amount, timestamp, round</p>
                                </div>
                                <div>
                                    <code className="text-green-400">transactions</code>
                                    <p className="text-gray-400 ml-4">tx_id, user_id, type, amount, tx_hash, status, timestamp</p>
                                </div>
                                <div>
                                    <code className="text-green-400">user_balances</code>
                                    <p className="text-gray-400 ml-4">user_id, balance, locked_balance, updated_at</p>
                                </div>
                                <div>
                                    <code className="text-green-400">player_stats</code>
                                    <p className="text-gray-400 ml-4">user_id, games_played, games_won, total_winnings, rank</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-red-400 mb-4">Redis Keys Structure</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <code className="text-yellow-400">session:{'{user_id}'}</code>
                                    <p className="text-gray-400 ml-4">JWT refresh token, session data (TTL: 7 days)</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">wallet:nonce:{'{address}'}</code>
                                    <p className="text-gray-400 ml-4">SIWE nonce for authentication (TTL: 5 min)</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">game:{'{game_id}'}</code>
                                    <p className="text-gray-400 ml-4">Current game state hash (TTL: 4 hours)</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">player:{'{player_id}'}:cards</code>
                                    <p className="text-gray-400 ml-4">Encrypted player cards (TTL: until game ends)</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">lobby:tables:active</code>
                                    <p className="text-gray-400 ml-4">Cached list of active tables (TTL: 10 sec)</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">socket:{'{user_id}'}</code>
                                    <p className="text-gray-400 ml-4">Socket ID mapping for WebSocket</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">leaderboard:global</code>
                                    <p className="text-gray-400 ml-4">Sorted set of player rankings</p>
                                </div>
                                <div>
                                    <code className="text-yellow-400">rate_limit:{'{ip}'}</code>
                                    <p className="text-gray-400 ml-4">Request counter for rate limiting</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-purple-400 mb-4">Kafka Topics</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Radio className="w-4 h-4 text-purple-400" />
                                    <code className="text-purple-300">game-events</code>
                                    <span className="text-gray-400">- Player actions, game state changes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio className="w-4 h-4 text-purple-400" />
                                    <code className="text-purple-300">blockchain-events</code>
                                    <span className="text-gray-400">- Smart contract events</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio className="w-4 h-4 text-purple-400" />
                                    <code className="text-purple-300">user-notifications</code>
                                    <span className="text-gray-400">- Email/push notifications queue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio className="w-4 h-4 text-purple-400" />
                                    <code className="text-purple-300">analytics-events</code>
                                    <span className="text-gray-400">- Business intelligence data</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4">IPFS Storage</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• <strong>Game Archives:</strong> Complete game history with all actions</p>
                                <p>• <strong>NFT Metadata:</strong> Achievement badges, tournament trophies</p>
                                <p>• <strong>Tournament Results:</strong> Final standings and prize distributions</p>
                                <p>• <strong>Audit Logs:</strong> Immutable records for disputes</p>
                                <p className="text-gray-400 mt-3">All IPFS CIDs stored in PostgreSQL for reference</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Architecture */}
                <div className="mt-8 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/30">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Shield className="w-8 h-8" />
                        Security & Compliance
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-red-400 mb-3">Smart Contract Security</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ ReentrancyGuard on all payable functions</li>
                                <li>✓ Checks-Effects-Interactions pattern</li>
                                <li>✓ OpenZeppelin battle-tested contracts</li>
                                <li>✓ Multi-sig wallet for admin operations</li>
                                <li>✓ Time-locked upgrades (48h delay)</li>
                                <li>✓ Emergency pause mechanism</li>
                                <li>✓ Rate limiting on withdrawals</li>
                                <li>✓ Audited by CertiK/ConsenSys</li>
                            </ul>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-3">Backend Security</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ JWT with RS256 (asymmetric encryption)</li>
                                <li>✓ Refresh token rotation</li>
                                <li>✓ Rate limiting (Redis)</li>
                                <li>✓ SQL injection prevention</li>
                                <li>✓ XSS protection (CSP headers)</li>
                                <li>✓ CORS whitelist</li>
                                <li>✓ Input validation & sanitization</li>
                                <li>✓ Helmet.js security headers</li>
                            </ul>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3">Data Privacy</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ AES-256 encryption at rest</li>
                                <li>✓ TLS 1.3 for data in transit</li>
                                <li>✓ Private keys never leave client</li>
                                <li>✓ No PII in logs</li>
                                <li>✓ GDPR compliant</li>
                                <li>✓ Right to be forgotten</li>
                                <li>✓ Data anonymization</li>
                                <li>✓ Regular security audits</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Deployment Architecture */}
                <div className="mt-8 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-8 border border-green-500/30">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Cloud className="w-8 h-8" />
                        Deployment & Scaling
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-green-400 mb-4">Infrastructure</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="font-semibold text-blue-300 mb-2">Container Orchestration</h4>
                                    <ul className="space-y-1 text-gray-300">
                                        <li>• Kubernetes cluster (3+ nodes)</li>
                                        <li>• Docker containers for all services</li>
                                        <li>• Horizontal Pod Autoscaler</li>
                                        <li>• Rolling updates (zero downtime)</li>
                                        <li>• Health checks & liveness probes</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-purple-300 mb-2">Load Balancing</h4>
                                    <ul className="space-y-1 text-gray-300">
                                        <li>• NGINX Ingress Controller</li>
                                        <li>• Round-robin distribution</li>
                                        <li>• Sticky sessions for WebSocket</li>
                                        <li>• SSL/TLS termination</li>
                                        <li>• CDN (Cloudflare) for static assets</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-teal-400 mb-4">Database Scaling</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="font-semibold text-indigo-300 mb-2">PostgreSQL Setup</h4>
                                    <ul className="space-y-1 text-gray-300">
                                        <li>• Master-Slave replication (1 master, 2 replicas)</li>
                                        <li>• PgBouncer connection pooling</li>
                                        <li>• Partitioning by date/player_id</li>
                                        <li>• Daily backups + WAL archiving</li>
                                        <li>• Read queries → replicas</li>
                                        <li>• Write queries → master</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-pink-300 mb-2">Redis Setup</h4>
                                    <ul className="space-y-1 text-gray-300">
                                        <li>• Redis Cluster (3 masters, 3 replicas)</li>
                                        <li>• Sentinel for automatic failover</li>
                                        <li>• AOF + RDB persistence</li>
                                        <li>• Separate instances for: cache, sessions, pub/sub</li>
                                        <li>• Eviction policy: allkeys-lru</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">CI/CD Pipeline</h3>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex-1 text-center">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mb-2">GitHub Push</div>
                                    <p className="text-gray-400">Code commit</p>
                                </div>
                                <div className="text-2xl text-gray-500">→</div>
                                <div className="flex-1 text-center">
                                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold mb-2">GitHub Actions</div>
                                    <p className="text-gray-400">Build & Test</p>
                                </div>
                                <div className="text-2xl text-gray-500">→</div>
                                <div className="flex-1 text-center">
                                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold mb-2">Docker Build</div>
                                    <p className="text-gray-400">Create image</p>
                                </div>
                                <div className="text-2xl text-gray-500">→</div>
                                <div className="flex-1 text-center">
                                    <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold mb-2">K8s Deploy</div>
                                    <p className="text-gray-400">Rolling update</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-12 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-2xl p-8 border border-violet-500/30">
                    <h2 className="text-3xl font-bold mb-4">Architecture Summary</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed">
                            This architecture provides a <strong className="text-blue-400">complete end-to-end solution</strong> for a production-ready blockchain poker game.
                            It handles everything from user authentication with SIWE, real-time gameplay with Socket.io, secure fund management with smart contracts,
                            to comprehensive monitoring and analytics.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            <strong className="text-green-400">Key Features:</strong> Horizontal scalability with Kubernetes, low-latency real-time updates with Redis Pub/Sub,
                            provably fair gameplay with Chainlink VRF, complete audit trail with event sourcing, and enterprise-grade security following OWASP best practices.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            <strong className="text-purple-400">Performance:</strong> Supports 10,000+ concurrent players, sub-100ms response times, 99.9% uptime SLA,
                            and optimized gas costs with Layer 2 solutions.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Use this hierarchical flow to design your system architecture on Eraser.io, Draw.io, or Figma</p>
                    <p className="mt-2">Each step includes: Component → Tech Stack → Data Flow → Security Measures</p>
                </div>
            </div>
        </div>
    );
}

export default Flow