import { FcGoogle, FcCalendar } from 'react-icons/fc'
import { SiGooglemaps } from 'react-icons/si'
const securityItems = [
  {
    title: 'Google Authenticator',
    desc: 'Google Authenticator provides 6-digit codes for 2FA',
    type: 'toggle',
    enabled: true,
  },
  {
    title: 'Password',
    desc: 'Last Changed 15 Oct 2024, 09:00 AM',
    type: 'button',
    btnText: 'Change',
  },
  {
    title: 'Two Factor',
    desc: 'Receive codes via SMS or email every time you login',
    type: 'toggle',
    enabled: true,
  },
  {
    title: 'Phone Number Verification',
    desc: 'Last Changed 15 Oct 2024, 09:00 AM',
    type: 'multi-button',
    btnText: 'Change',
    secondaryBtn: 'Remove',
  },
  {
    title: 'Email Verification',
    desc: 'Verified Email : info@example.com',
    type: 'multi-button',
    btnText: 'Change',
    secondaryBtn: 'Remove',
  },
  {
    title: 'Device Management',
    desc: 'Last Changed 18 Oct 2024, 11:15 AM',
    type: 'button',
    btnText: 'Manage',
  },
  {
    title: 'Account Activity',
    desc: 'Last Changed 04 Nov 2024, 04:30 PM',
    type: 'button',
    btnText: 'View',
  },
  {
    title: 'Delete Account',
    desc: "Refers to permanently deleting a user's account and data",
    type: 'button',
    btnText: 'Delete',
  },
]

const notificationItems = [
  {
    title: 'Booking Confirmations',
    desc: 'Instant notifications for flight, hotel, or activity bookings',
    push: false,
    sms: true,
    email: true,
  },
  {
    title: 'Trip Reminders',
    desc: 'Alerts for upcoming trips (1 day, 1 week before).',
    push: false,
    sms: true,
    email: true,
  },
  {
    title: 'Price Alerts',
    desc: 'Notify users of price drops for flights or accommodations.',
    push: true,
    sms: true,
    email: false,
  },
  {
    title: 'Special Offers',
    desc: 'Optional notifications for discounts or promotions.',
    push: true,
    sms: false,
    email: true,
  },
]

const integrationItems = [
  {
    title: 'Google',
    desc: 'Used to find travel destinations, accommodations & reviews with ease.',
    icon: <FcGoogle size={24} />,
    enabled: true,
  },
  {
    title: 'Google Calendar',
    desc: 'Get notifications for upcoming trips or events.',
    icon: <FcCalendar size={24} />,
    enabled: true,
  },
  {
    title: 'Google Maps',
    desc: 'Boosts with interactive routes, destinations & location-based services.',
    icon: <SiGooglemaps size={24} className="text-[#4285F4]" />, // Using Si for the branded Maps look
    enabled: true,
  },
]
export { securityItems, notificationItems, integrationItems }
