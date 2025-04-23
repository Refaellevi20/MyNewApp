import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileHeader}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.profileImage}
        />
        <ThemedText type="title">John Doe</ThemedText>
        <ThemedText type="subtitle">Software Developer</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoSection}>
        <ThemedView style={styles.infoRow}>
          <ThemedText type="defaultSemiBold">Email:</ThemedText>
          <ThemedText>john.doe@example.com</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoRow}>
          <ThemedText type="defaultSemiBold">Location:</ThemedText>
          <ThemedText>San Francisco, CA</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText type="defaultSemiBold">Join Date:</ThemedText>
          <ThemedText>March 2024</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  infoSection: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
