// Test runner script for KitchenCare+ app
// This script can be executed to run all cross-platform tests and generate a report

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import runTests from './runTests';
import { colors, typography, spacing } from '../theme/colors';

// Component to display test results
export const TestResultsScreen = () => {
  const [testResults, setTestResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Run tests when component mounts
  React.useEffect(() => {
    const executeTests = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const results = await runTests();
        setTestResults(results);
      } catch (err) {
        setError(err.message || 'An error occurred while running tests');
        console.error('Test execution error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    executeTests();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Running Cross-Platform Tests...</Text>
        <Text style={styles.subtitle}>This may take a few moments</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Test Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!testResults) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Test Results</Text>
      </View>
    );
  }

  // Count passed and failed tests
  const passedTests = testResults.results.filter(result => result.passed).length;
  const failedTests = testResults.results.filter(result => !result.passed).length;
  const totalTests = testResults.results.length;
  const passRate = Math.round((passedTests / totalTests) * 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cross-Platform Test Results</Text>
        <Text style={styles.subtitle}>
          Platform: {testResults.platform} | {new Date(testResults.timestamp).toLocaleString()}
        </Text>
      </View>
      
      <View style={[styles.summaryCard, testResults.success ? styles.successCard : styles.failureCard]}>
        <Text style={styles.summaryTitle}>
          {testResults.success ? 'All Tests Passed' : 'Some Tests Failed'}
        </Text>
        <Text style={styles.summaryText}>
          {passedTests} of {totalTests} tests passed ({passRate}%)
        </Text>
      </View>
      
      <Text style={styles.sectionTitle}>Test Details</Text>
      
      {testResults.results.map((result, index) => (
        <View 
          key={index} 
          style={[styles.resultCard, result.passed ? styles.passedCard : styles.failedCard]}
        >
          <View style={styles.resultHeader}>
            <Text style={styles.resultName}>{result.name}</Text>
            <Text style={[
              styles.resultStatus, 
              result.passed ? styles.passedText : styles.failedText
            ]}>
              {result.passed ? 'PASSED' : 'FAILED'}
            </Text>
          </View>
          <Text style={styles.resultPlatform}>Platform: {result.platform}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  summaryCard: {
    padding: spacing.lg,
    borderRadius: 10,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  successCard: {
    backgroundColor: colors.success + '20', // 20% opacity
    borderColor: colors.success,
    borderWidth: 1,
  },
  failureCard: {
    backgroundColor: colors.error + '20', // 20% opacity
    borderColor: colors.error,
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontSize: typography.fontSize.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  resultCard: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  passedCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  failedCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  resultName: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  resultStatus: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  passedText: {
    color: colors.success,
    backgroundColor: colors.success + '20', // 20% opacity
  },
  failedText: {
    color: colors.error,
    backgroundColor: colors.error + '20', // 20% opacity
  },
  resultPlatform: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.md,
    marginTop: spacing.md,
  },
});

export default TestResultsScreen;
