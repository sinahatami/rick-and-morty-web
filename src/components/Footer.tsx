import { Github, Linkedin, Heart } from 'lucide-react';

import { Container } from './shared/Container';

export default function Footer() {
  return (
    <footer className="glass border-t border-gray-200/50 mt-auto">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black text-[#0B1E2D] mb-2">Rick & Morty Wiki</h3>
            <p className="text-gray-500 text-sm font-medium">
              Data provided by{' '}
              <a
                href="https://rickandmortyapi.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#007080] hover:underline"
              >
                The Rick and Morty API
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sinahatami/"
              aria-label="GitHub Profile"
              className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#00B5CC] hover:bg-[#00B5CC]/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sina-hatami/"
              aria-label="LinkedIn Profile"
              className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#00B5CC] hover:bg-[#00B5CC]/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Sina Hatami</span>
            <span className="text-gray-200">|</span>
            <span>
              v{process.env.NEXT_PUBLIC_APP_VERSION || require('../../package.json').version}
            </span>
          </div>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> in Alpha Centauri
          </span>
        </div>
      </Container>
    </footer>
  );
}
