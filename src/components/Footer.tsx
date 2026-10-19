import React from 'react';
import { UiTranslations } from '../translations';
import { Compass } from 'lucide-react';

interface FooterProps {
  t: UiTranslations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="mt-16 border-t border-amber-900/10 py-10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <span className="text-sm font-bold text-slate-800">
            Matematica Distractivă
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-md leading-relaxed">
          {t.footerNote}
        </p>
      </div>
    </footer>
  );
};
