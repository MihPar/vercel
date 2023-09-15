export type videosType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: Array<string>;
};

export const videos: videosType[] = [
  {
    id: 0,
    title: "roman",
    author: "Mark Tven",
    canBeDownloaded: true,
    minAgeRestriction: 5,
    createdAt: "2023-09-13T19:56:25.759Z",
    publicationDate: "2023-09-13T19:56:25.759Z",
    availableResolutions: ["P144"],
  },
  {
    id: 1,
    title: "action",
    author: "Bread Peet",
    canBeDownloaded: true,
    minAgeRestriction: 10,
    createdAt: "2023-09-13T19:56:25.759Z",
    publicationDate: "2023-09-13T19:56:25.759Z",
    availableResolutions: ["P144"],
  },
  {
    id: 2,
    title: 'dom',
    author: "Mickle Jhon",
    canBeDownloaded: true,
    minAgeRestriction: 10,
    createdAt: "2023-09-13T19:56:25.759Z",
    publicationDate: "2023-09-13T19:56:25.759Z",
    availableResolutions: ["P144"],
  },
];
