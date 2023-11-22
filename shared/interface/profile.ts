import { iTag } from '@/shared/interface/tag';
import { iSummary } from '@/shared/interface/summary';
import { iHistory } from '@/shared/interface/history';

interface iProfile {
  name: string;
  avatar: string;
  jobTitle: string;
  github: string;
  linkedin: string;
  email: string;
  following: number;
  followers: number;
  isOnline: boolean;
};

type tProfileAll = iProfile | iTag[] | iSummary | iHistory[];

interface iProfileAll {
  [index: string]: tProfileAll;

  profile: iProfile;
  tags: iTag[];
  history: iHistory[];
  summary: iSummary;
}

export {
  type iProfile,
  type iProfileAll,
  type tProfileAll,
}