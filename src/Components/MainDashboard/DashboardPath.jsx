const { HomeFilled } = require("@mui/icons-material");

export const DashboardLink = [
  {
    id: 1,
    name: 'My Profile',
    path: '/myProfile',
    icon: <HomeFilled size={12} />,
    role: ['user'],
  },
  {
    id: 2,
    name: 'Overview',
    path: '/dashboard',
    icon: <HomeFilled size={12} />,
    role: ['admin', 'user'],
  },
  {
    id: 3,
    name: 'All User',
    path: '/user',
    icon: <HomeFilled size={12} />,
    role: ['admin'],
  },
  {
    id: 4,
    name: 'My Order',
    path: '/order',
    icon: <HomeFilled size={12} />,
    role: ['admin','user'],
  },
]
