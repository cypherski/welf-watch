import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, BarChart } from 'lucide-react'

export default function TokenInfo() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Invest in $WELF?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Growth Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                $WELF leverages a unique niche in the cryptocurrency market, combining philanthropy with financial opportunity.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Community Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join a like-minded community of investors passionate about animal rights and welfare.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-6 w-6 text-blue-600" />
                Real Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Each transaction contributes to raising awareness and funding initiatives for animal welfare.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}