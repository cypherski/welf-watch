import { NextResponse } from 'next/server'

// Mock database with more stories
const storiesDatabase = [
  {
    id: 1,
    title: "Injured Sea Turtle's Miraculous Recovery",
    date: "2024-11-17",
    summary: "A heartwarming story of community effort saving a critically injured sea turtle through blockchain-enabled veterinary care coordination.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Success', 'Marine Life'],
    category: 'featured'
  },
  {
    id: 2,
    title: "Wildlife Protection Initiative Launch",
    date: "2024-11-16",
    summary: "New blockchain-based tracking system implemented to protect endangered species in national parks.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Initiative', 'Wildlife'],
    category: 'latest'
  },
  {
    id: 3,
    title: "Urban Animal Shelter Transformation",
    date: "2024-11-15",
    summary: "City shelter implements revolutionary care system, dramatically improving adoption rates.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Innovation', 'Shelter'],
    category: 'latest'
  },
  {
    id: 4,
    title: "Marine Conservation Breakthrough",
    date: "2024-11-14",
    summary: "Innovative tracking system helps protect endangered marine species in coastal waters.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Conservation', 'Marine Life'],
    category: 'featured'
  },
  {
    id: 5,
    title: "Veterinary Network Expansion",
    date: "2024-11-13",
    summary: "Blockchain-enabled veterinary network grows to cover rural areas, providing critical care access.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Healthcare', 'Rural'],
    category: 'latest'
  },
  {
    id: 6,
    title: "Emergency Response System Success",
    date: "2024-11-12",
    summary: "New animal emergency response system shows promising results in first month of operation.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Emergency', 'Success'],
    category: 'featured'
  },
  {
    id: 7,
    title: "Community Care Initiative",
    date: "2024-11-11",
    summary: "Local communities band together to create sustainable animal care programs.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Community', 'Initiative'],
    category: 'latest'
  },
  {
    id: 8,
    title: "Wildlife Rehabilitation Center Opens",
    date: "2024-11-10",
    summary: "State-of-the-art rehabilitation center brings hope for injured wildlife.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Wildlife', 'Healthcare'],
    category: 'featured'
  },
  {
    id: 9,
    title: "Pet Health Monitoring Innovation",
    date: "2024-11-09",
    summary: "New blockchain-based health monitoring system revolutionizes pet care.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Innovation', 'Healthcare'],
    category: 'latest'
  },
  {
    id: 10,
    title: "Endangered Species Protection Success",
    date: "2024-11-08",
    summary: "Coordinated effort saves critical habitat for endangered species.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Success', 'Conservation'],
    category: 'featured'
  },
  {
    id: 11,
    title: "Animal Welfare Technology Breakthrough",
    date: "2024-11-07",
    summary: "Revolutionary tracking system improves outcomes for shelter animals.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Technology', 'Welfare'],
    category: 'latest'
  },
  {
    id: 12,
    title: "Marine Mammal Rescue Achievement",
    date: "2024-11-06",
    summary: "Coordinated rescue effort saves pod of stranded whales.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Rescue', 'Marine Life'],
    category: 'featured'
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    // Filter stories by category if specified
    let filteredStories = category
      ? storiesDatabase.filter(story => story.category === category)
      : storiesDatabase

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedStories = filteredStories.slice(startIndex, endIndex)

    return NextResponse.json({
      status: 'success',
      data: paginatedStories,
      total: filteredStories.length,
      page,
      totalPages: Math.ceil(filteredStories.length / limit)
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}