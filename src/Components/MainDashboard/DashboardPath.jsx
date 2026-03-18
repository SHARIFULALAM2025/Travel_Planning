const { HomeFilled } = require("@mui/icons-material");

export const DashboardLink = [
  {
    name: 'Overview',
    path: '/dashboard', 
    icon: <HomeFilled size={22} />,
    role: ['admin', 'user'],
  },
]
