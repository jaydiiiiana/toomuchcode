/**
 * Types for the Profile screen.
 */

export interface MenuItemData {
  icon: string;
  label: string;
  subtitle?: string;
  color?: string;
  showBadge?: boolean;
  onPress?: () => void;
}

export interface MenuSection {
  title: string;
  items: MenuItemData[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  consultationsCount: number;
  savedCount: number;
  reviewsCount: number;
}
