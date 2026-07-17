import React from "react";

export type NavItem = { name: string; href: string; icon: React.ReactNode };

const I = {
  une: <svg viewBox="0 0 24 24"><path d="M4 21V4h9l1 2h6v9h-7l-1-2H4" /></svg>,
  politique: <svg viewBox="0 0 24 24"><path d="M12 3v18M5 8h14M6 12h12" /></svg>,
  societe: (
    <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0112 0M16 6a3 3 0 010 6M21 20a6 6 0 00-4-5.6" /></svg>
  ),
  sport: (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 3a14 14 0 000 18M3 12h18" /></svg>
  ),
  culture: <svg viewBox="0 0 24 24"><path d="M4 6h16v11H4zM4 20h16" /></svg>,
  economie: <svg viewBox="0 0 24 24"><path d="M12 3v18M8 7h6a2.5 2.5 0 010 5H8m0 0h7" /></svg>,
  justice: <svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z" /></svg>,
  sante: <svg viewBox="0 0 24 24"><path d="M20 8h-4l-2 9-3-14-2 7H4" /></svg>,
  daily: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h5" /></svg>,
  archives: <svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5zM15 4v4h4" /></svg>,
  podcasts: (
    <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0012 0M12 17v4" /></svg>
  ),
};

export const RUBRIQUES: NavItem[] = [
  { name: "À la Une", href: "/", icon: I.une },
  { name: "Politique", href: "/actualites-nationales/politique", icon: I.politique },
  { name: "Société", href: "/actualites-nationales/societe", icon: I.societe },
  { name: "Sport", href: "/sports", icon: I.sport },
  { name: "Culture", href: "/actualites-nationales/culture-art", icon: I.culture },
  { name: "Économie", href: "/actualites-nationales/economie", icon: I.economie },
  { name: "Justice", href: "/actualites-nationales/justice", icon: I.justice },
  { name: "Santé", href: "/actualites-nationales/sante", icon: I.sante },
];

export const MEDIA: NavItem[] = [
  { name: "A Barthelemy Inabo", href: "/dailies", icon: I.archives },
  { name: "Articles", href: "/a-la-une", icon: I.daily },
  { name: "Podcasts", href: "/podcasts", icon: I.podcasts },
];
