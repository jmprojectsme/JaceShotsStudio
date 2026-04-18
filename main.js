// ===== GALLERY INITIALIZATION =====
let currentImageIndex = 0;

function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  
  GALLERY_IMAGES.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.onclick = () => openLightbox(index);
    item.innerHTML = `
      <img src="${img}" alt="Gallery image ${index + 1}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-overlay-text">View</div>
      </div>
    `;
    galleryGrid.appendChild(item);
  });
}

// ===== NEWS INITIALIZATION =====
function initNews() {
  const newsGrid = document.getElementById('newsGrid');
  
  if (NEWS_ITEMS.length === 0) {
    newsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No announcements yet. Check back soon!</p>';
    return;
  }

  NEWS_ITEMS.forEach(news => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    
    const newsDate = new Date(news.date);
    const formattedDate = newsDate.toLocaleDateString('en-PH', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    newsCard.innerHTML = `
      <div class="news-header">
        <div>
          <h3>${news.title}</h3>
          <div class="news-meta">
            <span class="news-date">${formattedDate}</span>
            <span class="news-category">${news.category}</span>
          </div>
        </div>
      </div>
      <p class="news-content">${news.content}</p>
    `;
    
    newsGrid.appendChild(newsCard);
  });
}

// ===== LIGHTBOX FUNCTIONS =====
function openLightbox(index) {
  currentImageIndex = index;
  document.getElementById('lightbox').classList.add('active');
  document.getElementById('lightboxImg').src = GALLERY_IMAGES[index];
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
  document.getElementById('lightboxImg').src = GALLERY_IMAGES[currentImageIndex];
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  document.getElementById('lightboxImg').src = GALLERY_IMAGES[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== BOOKING FORM VALIDATION =====

// Check if date is a weekday
function isWeekday(date) {
  const day = date.getDay();
  return AVAILABLE_DAYS.includes(day);
}

// Get day name
function getDayName(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

// Set min date to today + MIN_BOOKING_DAYS_AHEAD (next weekday)
function setMinBookingDate() {
  const dateInput = document.getElementById('eventDate');
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + MIN_BOOKING_DAYS_AHEAD);

  // Find next available weekday
  while (!isWeekday(minDate)) {
    minDate.setDate(minDate.getDate() + 1);
  }

  const minDateStr = minDate.toISOString().split('T')[0];
  dateInput.setAttribute('min', minDateStr);
}

// Validate selected date
function validateBookingDate() {
  const dateInput = document.getElementById('eventDate');
  const selectedDate = new Date(dateInput.value + 'T00:00:00');
  const errorMsg = document.getElementById('dateErrorMsg');

  if (!dateInput.value) {
    return true; // Let HTML5 validation handle empty
  }

  // Check if weekday
  if (!isWeekday(selectedDate)) {
    const dayName = getDayName(selectedDate);
    errorMsg.textContent = `⚠️ We're closed on ${dayName}s. Please select a weekday (Monday-Friday).`;
    errorMsg.style.display = 'block';
    return false;
  }

  // Check minimum days ahead
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minAllowedDate = new Date(today);
  minAllowedDate.setDate(minAllowedDate.getDate() + MIN_BOOKING_DAYS_AHEAD);

  if (selectedDate < minAllowedDate) {
    errorMsg.textContent = `⚠️ Please book at least ${MIN_BOOKING_DAYS_AHEAD} days in advance.`;
    errorMsg.style.display = 'block';
    return false;
  }

  errorMsg.style.display = 'none';
  return true;
}

// Listen to date changes
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('eventDate');
  setMinBookingDate();
  
  dateInput.addEventListener('change', validateBookingDate);
});

// ===== BOOKING FORM SUBMISSION =====
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate date first
  if (!validateBookingDate()) {
    return;
  }

  const submitBtn = document.querySelector('.form-submit');
  const messageDiv = document.getElementById('formMessage');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    // Get form data
    const bookingData = {
      id: Date.now(), // Simple ID using timestamp
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service_type: document.getElementById('service').value,
      event_date: document.getElementById('eventDate').value,
      location: document.getElementById('location').value,
      notes: document.getElementById('notes').value,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Save to localStorage
    let bookings = JSON.parse(localStorage.getItem('jaceshots_bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('jaceshots_bookings', JSON.stringify(bookings));

    // Show success message
    messageDiv.innerHTML = `
      <div style="font-weight: 600;">✓ Booking Request Submitted!</div>
      <div style="margin-top: 8px; font-size: 12px; line-height: 1.6;">
        We received your request for <strong>${bookingData.service_type}</strong> on <strong>${bookingData.event_date}</strong>.
        <br><br>
        We will review your booking and contact you at <strong>${bookingData.phone}</strong> within 24 hours to confirm availability.
        <br><br>
        Thank you for choosing JaceShots Photography!
      </div>
    `;
    messageDiv.classList.add('success');
    messageDiv.classList.remove('error');
    document.getElementById('bookingForm').reset();
    
    // Scroll to confirmation
    setTimeout(() => {
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    // Log for debugging (remove in production)
    console.log('Booking saved:', bookingData);
    console.log('All bookings:', JSON.parse(localStorage.getItem('jaceshots_bookings')));

  } catch (error) {
    console.error('Booking error:', error);
    messageDiv.textContent = '✗ Error submitting booking. Please try again or contact us directly.';
    messageDiv.classList.add('error');
    messageDiv.classList.remove('success');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book Now';
  }
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initNews();
});
  
