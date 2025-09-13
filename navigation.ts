export type SectionType = 'home' | 'exchange' | 'messages' | 'groups' | 'sfmbook' | 'sfmpay' | 'sfmarket' | 'sfmrealestate' | 'sfmbooking';

export interface Section {
  id: SectionType;
  label: string;
  icon?: string;
}