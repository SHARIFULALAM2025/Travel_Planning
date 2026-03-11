// icons
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import MapIcon from '@mui/icons-material/Map'
import RateReviewIcon from '@mui/icons-material/RateReview'
import LuggageIcon from '@mui/icons-material/Luggage'
import ArticleIcon from '@mui/icons-material/Article'
// nav config

export const navItems = [
  {
    id: 1,
    name: 'home',
    path: '/',
    icon: <HomeIcon></HomeIcon>,
    access: 'public',
  },
  {
    id: 2,
    name: 'explore',
    path: '/destinations',
    icon: <ExploreIcon></ExploreIcon>,
    access: 'public',
  },
  {
    id: 3,
    name: 'reviews',
    path: '/reviews',
    icon: <RateReviewIcon></RateReviewIcon>,
    access: 'public',
  },
  {
    id: 4,
    name: 'blog',
    path: '/blog',
    icon: <ArticleIcon></ArticleIcon>,
    access: 'public',
  },

  //  Private (Only when logged in)
  {
    id: 5,
    name: 'Shop',
    path: '/shop',
    icon: <MapIcon></MapIcon>,
    access: 'private',
  },

  {
    id: 6,
    name: 'Contact',
    path: '/contact',
    icon: <LuggageIcon></LuggageIcon>,
    access: 'private',
  },
]
