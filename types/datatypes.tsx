export type SideNavItem = {
  title: string;
  icon: JSX.Element;
  path?: string;
  subMennu?: boolean;
  children?: SideNavItem[];
};
