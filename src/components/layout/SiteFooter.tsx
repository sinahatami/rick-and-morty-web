import { Heart } from 'lucide-react';

import { GithubIcon, LinkedinIcon } from '~/components/data-display/BrandIcons';
import { siteConfig } from '~/lib/site';

import { Container } from './Container';

const socialLink =
  'rounded-lg bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary-ink';

export function SiteFooter() {
  return (
    <footer className="glass mt-auto border-t border-gray-200/50">
      <Container className="py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="mb-2 text-xl font-black text-ink">Rick & Morty Wiki</h3>
            <p className="text-sm font-medium text-gray-600">
              Data provided by{' '}
              <a
                href={siteConfig.apiUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-ink underline-offset-2 hover:underline"
              >
                The Rick and Morty API
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={siteConfig.author.github} aria-label="GitHub profile" className={socialLink}>
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.author.linkedin}
              aria-label="LinkedIn profile"
              className={socialLink}
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-xs font-bold tracking-widest text-gray-600 uppercase sm:flex-row">
          <div className="flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} {siteConfig.author.name}
            </span>
            <span className="text-gray-300" aria-hidden="true">
              |
            </span>
            <span>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
          </div>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-current text-red-500" aria-label="love" /> in
            Alpha Centauri
          </span>
        </div>
      </Container>
    </footer>
  );
}
