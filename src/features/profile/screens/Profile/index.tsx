import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@stores/userStore';
import { useThemeStore } from '@stores/themeStore';
import { useOrders } from '@hooks/useOrders';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@navigation/MainNavigator';
import { Theme } from '@app-types/theme';
import { PROFILE_CONSTANTS } from '@profile/constants';
import { COLORS } from '@constants';
import InfoRow from './components/InfoRow';

type ProfileScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const Profile: React.FC<Props> = ({ navigation }) => {
  const { userProfile, logout } = useUserStore();
  const { theme } = useThemeStore();
  const { data: orders = [], isLoading: ordersLoading } = useOrders(
    userProfile?.email || '',
  );

  const styles = createStyles(theme);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name?: string) => {
    if (!name) {
      return 'U';
    }
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {userProfile?.avatar ? (
              <Image
                source={{ uri: userProfile.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {getInitials(userProfile?.name)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>
              {userProfile?.name || 'No name set'}
            </Text>
            <Text style={styles.userEmail}>
              {userProfile?.email || 'No email set'}
            </Text>
            {userProfile?.phone && (
              <Text style={styles.userPhone}>{userProfile.phone}</Text>
            )}
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Full Name" value={userProfile?.name || 'Not set'} />
            <InfoRow label="Email" value={userProfile?.email || 'Not set'} />
            <InfoRow label="Phone" value={userProfile?.phone || 'Not set'} />
            <InfoRow
              label="Date of Birth"
              value={userProfile?.dateOfBirth || 'Not set'}
              isLast
            />
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.infoCard}>
            <InfoRow
              label="Street"
              value={userProfile?.address?.street || 'Not set'}
            />
            <InfoRow
              label="City"
              value={userProfile?.address?.city || 'Not set'}
            />
            <InfoRow
              label="State"
              value={userProfile?.address?.state || 'Not set'}
            />
            <InfoRow
              label="ZIP Code"
              value={userProfile?.address?.zipCode || 'Not set'}
            />
            <InfoRow
              label="Country"
              value={userProfile?.address?.country || 'Not set'}
              isLast
            />
          </View>
        </View>

        {/* Order History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.infoCard}>
            {ordersLoading ? (
              <InfoRow label="Loading..." value="" isLast />
            ) : orders.length > 0 ? (
              <>
                {orders
                  .slice(0, PROFILE_CONSTANTS.recentOrdersLimit)
                  .map((order, index) => (
                    <InfoRow
                      key={order.id}
                      label={`#${order.id.slice(
                        PROFILE_CONSTANTS.orderIdDisplayLength,
                      )}`}
                      value={`${
                        order.productName
                      } - $${order.totalAmount.toFixed(2)}`}
                      isLast={
                        index ===
                        Math.min(
                          orders.length - 1,
                          PROFILE_CONSTANTS.recentOrdersLimit - 1,
                        )
                      }
                    />
                  ))}
                {orders.length > PROFILE_CONSTANTS.recentOrdersLimit && (
                  <TouchableOpacity style={styles.viewAllOrdersButton}>
                    <Text style={styles.viewAllOrdersText}>
                      View All Orders ({orders.length})
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <InfoRow
                label="No orders yet"
                value="Place your first order!"
                isLast
              />
            )}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.infoCard}>
            <InfoRow
              label="Theme"
              value={
                userProfile?.preferences?.theme
                  ? userProfile.preferences.theme.charAt(0).toUpperCase() +
                    userProfile.preferences.theme.slice(1)
                  : 'Not set'
              }
              isLast
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      width: 60,
    },
    backButtonText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    editButton: {
      width: 60,
      alignItems: 'flex-end',
    },
    editButtonText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    scrollView: {
      flex: 1,
    },
    profileCard: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    avatarContainer: {
      marginBottom: 16,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: COLORS.white,
    },
    profileInfo: {
      alignItems: 'center',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    userPhone: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    section: {
      marginHorizontal: 20,
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 12,
    },
    infoCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    viewAllOrdersButton: {
      marginTop: 12,
      paddingVertical: 8,
      alignItems: 'center',
    },
    viewAllOrdersText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      marginHorizontal: 20,
      marginTop: 32,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: '600',
    },
    bottomSpace: {
      height: 32,
    },
  });

  return styles;
};
