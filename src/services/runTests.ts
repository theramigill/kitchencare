// Test script for KitchenCare+ app cross-platform compatibility
// This script runs tests to verify that the app works correctly on both Android and iOS platforms

import { runAllTests } from './crossPlatformTesting';

// Run all cross-platform tests and log results
const runTests = async () => {
  console.log('Starting cross-platform compatibility tests...');
  
  try {
    const testResults = await runAllTests();
    
    console.log(`Test completed on ${testResults.platform} platform at ${testResults.timestamp}`);
    console.log(`Overall result: ${testResults.success ? 'PASSED' : 'FAILED'}`);
    console.log(`Message: ${testResults.message}`);
    
    console.log('\nDetailed test results:');
    testResults.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.name} (${result.platform}): ${result.passed ? 'PASSED' : 'FAILED'}`);
      console.log(`   ${result.message}`);
    });
    
    // Count passed and failed tests
    const passedTests = testResults.results.filter(result => result.passed).length;
    const failedTests = testResults.results.filter(result => !result.passed).length;
    
    console.log(`\nSummary: ${passedTests} tests passed, ${failedTests} tests failed`);
    
    // Return test results for further processing
    return testResults;
  } catch (error) {
    console.error('Error running tests:', error);
    return {
      success: false,
      message: `Error running tests: ${error.message}`,
      results: [],
      platform: 'unknown',
      timestamp: new Date().toISOString()
    };
  }
};

// Export the test runner
export default runTests;
