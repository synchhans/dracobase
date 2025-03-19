import { User } from "./user.types";

export interface HeaderDashboardProps {
  user: User;
  handleLogout: () => void;
}
