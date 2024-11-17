export default function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">$WELF</h3>
              <p className="text-gray-600">
                Uniting cryptocurrency with compassion for animal welfare
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Whitepaper</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Press Kit</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} $WELF. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }