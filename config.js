// ===== GALLERY IMAGES =====
// Update these paths to your image locations in the images/ folder
const GALLERY_IMAGES = [
  'images/graduation.jpg',
  'images/debut.jpg',
  'images/portrait.jpg',
  'images/event.jpg',
  'images/birthday.jpg',
  'images/school.jpg'
];

// ===== NEWS & ANNOUNCEMENTS =====
// Add/update news items here (newest first)
// Post these on your Facebook page as well for sync
const NEWS_ITEMS = [
  {
    id: 1,
    title: '🎉 Something New is Coming!',
    date: '2026-04-20',
    content: 'The one where you\'re in control. JaceShots Studio is opening soon in Bukig, Aparri, Cagayan! Now accepting early bookings.',
    category: 'Announcement',
    status: 'published'
  },
  {
    id: 2,
    title: '🎓 Graduation Pictures Ready',
    date: '2026-04-15',
    content: 'All graduation pictorial photos from BNATS batch are now ready for pickup! Please contact us to schedule your pickup time.',
    category: 'Graduation',
    status: 'published'
  },
  {
    id: 3,
    title: '📸 Sports Personality Event Coverage',
    date: '2026-04-10',
    content: 'Thank you to NCNHS for having us cover the Sports Personality event. Photos will be available for download by April 25.',
    category: 'Event',
    status: 'published'
  }
];

// ===== CONTACT INFORMATION =====
const CONTACT_INFO = {
  phone: '09654978157',
  facebook: 'facebook.com/JaceShots',
  messenger: 'm.me/JaceShots',
  email: 'contact@jaceshots.ph'
};

// ===== BOOKING SETTINGS =====
// Weekdays only (Monday=1 to Friday=5, Saturday=6, Sunday=0)
const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon, Tue, Wed, Thu, Fri
const MIN_BOOKING_DAYS_AHEAD = 3; // Can book at least 3 days in advance
