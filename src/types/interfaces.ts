interface Image {
  original: string;
}

interface Schedule {
  days: string[];
  time: string;
}

interface Network {
  name: string;
  country: {
    name: string;
  };
}

interface Info {
  label: string;
  value: string;
}

export interface Rating {
  average: number | null;
}

export interface ShowResponse {
  name?: string;
  summary?: string;
  image?: Image | null;
  rating?: Rating;
  language?: string;
  status?: string;
  runtime?: number;
  premiered?: string;
  ended?: string;
  schedule?: Schedule;
  network?: Network;
  genres?: string[];
}

export interface Show {
  name: string;
  summary: string;
  image?: Image | null;
  rating: Rating;
  info: Info[];
}
