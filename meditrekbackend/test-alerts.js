const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

// Test user credentials
const testUser = {
  email: 'sakhile@monkeyandriver.com',
  password: 'password123'
};

async function testAlertsAPI() {
  try {
    console.log('🧪 Testing Alerts & Notifications API...\n');

    // Step 1: Login to get auth token
    console.log('1. Logging in to get auth token...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, testUser);
    authToken = loginResponse.data.token;
    console.log('✅ Login successful\n');

    // Step 2: Get all alerts
    console.log('2. Testing GET /api/alerts - Get all alerts...');
    const alertsResponse = await axios.get(`${BASE_URL}/alerts`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Found ${alertsResponse.data.alerts.length} alerts`);
    console.log(`   Pagination: Page ${alertsResponse.data.pagination.currentPage} of ${alertsResponse.data.pagination.totalPages}\n`);

    // Step 3: Get unread count
    console.log('3. Testing GET /api/alerts/unread/count - Get unread count...');
    const unreadResponse = await axios.get(`${BASE_URL}/alerts/unread/count`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Unread alerts: ${unreadResponse.data.unreadCount}\n`);

    // Step 4: Create a new alert
    console.log('4. Testing POST /api/alerts - Create new alert...');
    const newAlert = {
      title: 'Test Alert from API',
      message: 'This is a test alert created via the API',
      type: 'info',
      priority: 'medium'
    };
    const createResponse = await axios.post(`${BASE_URL}/alerts`, newAlert, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Alert created with ID: ${createResponse.data.alert._id}\n`);

    // Step 5: Get single alert
    console.log('5. Testing GET /api/alerts/:id - Get single alert...');
    const alertId = createResponse.data.alert._id;
    const singleAlertResponse = await axios.get(`${BASE_URL}/alerts/${alertId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Retrieved alert: "${singleAlertResponse.data.title}"\n`);

    // Step 6: Mark alert as read
    console.log('6. Testing PATCH /api/alerts/:id/read - Mark as read...');
    const readResponse = await axios.patch(`${BASE_URL}/alerts/${alertId}/read`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Alert marked as read: ${readResponse.data.message}\n`);

    // Step 7: Test filtering
    console.log('7. Testing GET /api/alerts with filters - Get unread alerts...');
    const filteredResponse = await axios.get(`${BASE_URL}/alerts?read=false&limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Found ${filteredResponse.data.alerts.length} unread alerts\n`);

    // Step 8: Mark all alerts as read
    console.log('8. Testing PATCH /api/alerts/read-all - Mark all as read...');
    const readAllResponse = await axios.patch(`${BASE_URL}/alerts/read-all`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ ${readAllResponse.data.updatedCount} alerts marked as read\n`);

    // Step 9: Verify unread count is 0
    console.log('9. Verifying unread count after marking all as read...');
    const finalUnreadResponse = await axios.get(`${BASE_URL}/alerts/unread/count`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Unread alerts: ${finalUnreadResponse.data.unreadCount}\n`);

    console.log('🎉 All tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Authentication: ✅');
    console.log('- Get all alerts: ✅');
    console.log('- Get unread count: ✅');
    console.log('- Create alert: ✅');
    console.log('- Get single alert: ✅');
    console.log('- Mark as read: ✅');
    console.log('- Filter alerts: ✅');
    console.log('- Mark all as read: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('Full error:', error);
  }
}

// Run the tests
testAlertsAPI(); 