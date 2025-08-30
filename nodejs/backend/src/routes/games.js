/**
 * Game routes for minigames
 */
export default async function (fastify, options) {
  
  /**
   * GET /api/games
   * List available minigames
   */
  fastify.get('/', {
    schema: {
      description: 'List available minigames',
      tags: ['Games'],
      summary: 'List games',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            games: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  type: { type: 'string' },
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      success: true,
      games: [
        {
          id: 'fortune-wheel',
          name: 'Fortune Wheel',
          description: 'Spin the wheel to win prizes',
          type: 'luck',
          status: 'active'
        },
        {
          id: 'loot-box',
          name: 'Loot Box',
          description: 'Open boxes to get random items',
          type: 'luck',
          status: 'active'
        },
        {
          id: 'puzzle-game',
          name: 'Puzzle Game',
          description: 'Solve puzzles to progress',
          type: 'skill',
          status: 'coming-soon'
        }
      ]
    }
  })

  /**
   * GET /api/games/:id
   * Get specific game details
   */
  fastify.get('/:id', {
    schema: {
      description: 'Get specific game details',
      tags: ['Games'],
      summary: 'Get game details',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            game: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                rules: { type: 'array', items: { type: 'string' } },
                rewards: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    
    // Mock game data - in real implementation, this would come from database
    const games = {
      'fortune-wheel': {
        id: 'fortune-wheel',
        name: 'Fortune Wheel',
        description: 'Spin the wheel to win prizes',
        type: 'luck',
        status: 'active',
        rules: [
          'Each spin costs 1 coin',
          'Wheel has 8 different prize slots',
          'Higher rarity prizes have lower probability'
        ],
        rewards: [
          'Common: 5 coins',
          'Uncommon: 15 coins', 
          'Rare: 50 coins',
          'Epic: 100 coins',
          'Legendary: 500 coins'
        ]
      },
      'loot-box': {
        id: 'loot-box',
        name: 'Loot Box',
        description: 'Open boxes to get random items',
        type: 'luck',
        status: 'active',
        rules: [
          'Each box costs 10 coins',
          'Boxes contain 3-5 random items',
          'Item rarity affects drop rates'
        ],
        rewards: [
          'Common items: 60% chance',
          'Uncommon items: 25% chance',
          'Rare items: 10% chance',
          'Epic items: 4% chance',
          'Legendary items: 1% chance'
        ]
      }
    }
    
    const game = games[id]
    if (!game) {
      return reply.code(404).send({
        success: false,
        message: 'Game not found'
      })
    }
    
    return {
      success: true,
      game
    }
  })

  /**
   * POST /api/games/:id/play
   * Start playing a specific game
   */
  fastify.post('/:id/play', {
    schema: {
      description: 'Start playing a specific game',
      tags: ['Games'],
      summary: 'Start game',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          playerId: { type: 'string' },
          bet: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            gameSession: {
              type: 'object',
              properties: {
                sessionId: { type: 'string' },
                gameId: { type: 'string' },
                playerId: { type: 'string' },
                status: { type: 'string' },
                startTime: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { playerId, bet } = request.body
    
    // Mock game session creation
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      success: true,
      gameSession: {
        sessionId,
        gameId: id,
        playerId,
        status: 'active',
        startTime: new Date().toISOString()
      }
    }
  })
}
