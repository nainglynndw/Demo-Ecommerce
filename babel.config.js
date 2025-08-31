module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@features': './src/features',
          '@auth': './src/features/auth',
          '@orders': './src/features/orders',
          '@products': './src/features/products',
          '@profile': './src/features/profile',
          '@stores': './src/stores',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@app-types': './src/types',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
