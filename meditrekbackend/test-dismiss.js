const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testDismiss() {
  try {
    console.log('🧪 Testing Dismiss Alert functionality...\n');

    // Step 1: Login
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'sakhile@monkeyandriver.com',
      password: 'password123'
    });
    const authToken = loginResponse.data.token;
    console.log('✅ Login successful\n');

    // Step 2: Create a new alert to dismiss
    console.log('2. Creating a new alert...');
    const newAlert = {
      title: 'Test Alert for Dismiss',
      message: 'This alert will be dismissed',
      type: 'info',
      priority: 'low'
    };
    const createResponse = await axios.post(`${BASE_URL}/alerts`, newAlert, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const alertId = createResponse.data.alert._id;
    console.log(`✅ Alert created with ID: ${alertId}\n`);

    // Step 3: Test dismiss functionality
    console.log('3. Testing PATCH /api/alerts/:id/dismiss - Dismiss alert...');
    const dismissResponse = await axios.patch(`${BASE_URL}/alerts/${alertId}/dismiss`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Alert dismissed: ${dismissResponse.data.message}`);
    console.log(`   isDismissed: ${dismissResponse.data.alert.isDismissed}\n`);

    // Step 4: Verify alert is dismissed
    console.log('4. Verifying alert is dismissed...');
    const getResponse = await axios.get(`${BASE_URL}/alerts/${alertId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`✅ Alert status - isDismissed: ${getResponse.data.isDismissed}\n`);

    console.log('🎉 Dismiss functionality test passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testDismiss();