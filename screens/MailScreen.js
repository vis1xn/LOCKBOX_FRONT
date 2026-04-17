import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';
import { PI_URL } from '../api/config';

const MailScreen = ({ navigation }) => {
  const [mailData, setMailData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMailStatus();
  }, []);

  const fetchMailStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PI_URL}/mail/status`);
      const data = await res.json();
      setMailData(data);
    } catch {
      setMailData(null);
    } finally {
      setLoading(false);
    }
  };

  const mailPresent = mailData?.mail_present;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mail Status</Text>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#00c8ff" />
        ) : mailData ? (
          <>
            <View style={[styles.statusCircle, {
              borderColor: mailPresent ? '#ffa000' : '#4a6070'
            }]}>
              <Text style={styles.statusEmoji}>{mailPresent ? '📬' : '📭'}</Text>
              <Text style={[styles.statusText, {
                color: mailPresent ? '#ffa000' : '#4a6070'
              }]}>
                {mailPresent ? 'MAIL PRESENT' : 'NO MAIL'}
              </Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Distance reading</Text>
              <Text style={styles.detailValue}>{mailData.distance_cm} cm</Text>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Could not reach LockBox sensor.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchMailStatus}>
        <Text style={styles.buttonText}>↻ Refresh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d14',
    padding: 24
  },
  back: {
    marginTop: 8,
    marginBottom: 16
  },
  backText: {
    color: '#00c8ff',
    fontSize: 16
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2030',
    marginBottom: 32
  },
  statusEmoji: {
    fontSize: 52
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 8
  },
  detailBox: {
    backgroundColor: '#1a2030',
    borderRadius: 14,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3a4a'
  },
  detailLabel: {
    color: '#4a6070',
    fontSize: 13,
    marginBottom: 4
  },
  detailValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700'
  },
  errorText: {
    color: '#4a6070',
    fontSize: 16
  },
  button: {
    backgroundColor: '#1a2030',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3a4a',
    marginBottom: 8
  },
  buttonText: {
    color: '#00c8ff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default MailScreen;