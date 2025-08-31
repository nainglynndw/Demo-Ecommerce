import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@stores/userStore';
import { useThemeStore } from '@stores/themeStore';
import { useOrders } from '@hooks/useOrders';
import { PROFILE_CONSTANTS } from '@profile/constants';
import InfoRow from './components/InfoRow';
import { createStyles } from './styles';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  ZoomIn,
  ReduceMotion,
  SlideInLeft,
} from 'react-native-reanimated';

export const Profile: React.FC = () => {
  const { userProfile, logout } = useUserStore();
  const { theme } = useThemeStore();
  const { data: orders = [], isLoading: ordersLoading } = useOrders(
    userProfile?.email || '',
  );

  const styles = createStyles(theme);

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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Animated.View
            style={styles.avatarContainer}
            entering={ZoomIn.duration(900)
              .delay(400)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ scale: 0.3 }] })}
          >
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
          </Animated.View>
          <Animated.View
            style={styles.profileInfo}
            entering={FadeInUp.duration(800)
              .delay(600)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({
                opacity: 0,
                transform: [{ translateY: 50 }],
              })}
          >
            <Text style={styles.userName}>
              {userProfile?.name || 'No name set'}
            </Text>
            <Text style={styles.userEmail}>
              {userProfile?.email || 'No email set'}
            </Text>
            {userProfile?.phone && (
              <Text style={styles.userPhone}>{userProfile.phone}</Text>
            )}
          </Animated.View>
        </View>

        {/* Personal Information */}
        <Animated.View
          style={styles.section}
          entering={FadeInDown.duration(850)
            .delay(800)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({
              opacity: 0,
              transform: [{ translateY: -60 }],
            })}
        >
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
        </Animated.View>

        {/* Address */}
        <Animated.View
          style={styles.section}
          entering={SlideInLeft.duration(900)
            .delay(1000)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({ transform: [{ translateX: -350 }] })}
        >
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
        </Animated.View>

        {/* Order History */}
        <Animated.View
          style={styles.section}
          entering={SlideInRight.duration(850)
            .delay(1200)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({ transform: [{ translateX: 380 }] })}
        >
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
        </Animated.View>

        {/* Preferences */}
        <Animated.View
          style={styles.section}
          entering={FadeInUp.duration(800)
            .delay(1400)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({ opacity: 0, transform: [{ translateY: 70 }] })}
        >
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
        </Animated.View>

        {/* Logout Button */}
        <Animated.View
          entering={ZoomIn.duration(900)
            .delay(1600)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({ transform: [{ scale: 0.2 }] })}
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

