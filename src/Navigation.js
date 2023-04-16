import User from './components/User';
import { Navigate } from 'react-router-dom';

export const navigateToUserPage = () => {
  Navigate(User);
};
