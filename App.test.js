import { render, fireEvent, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddItems from './app/addItems'
import ShowItemScreen from './app/showItemsScreen'

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ cancelled: true })),
  MediaTypeOptions: { Images: 'Images' },
}));

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => Promise.resolve({ coords: { latitude: 1, longitude: 2 } })),
}));

describe('AddItems', () => {
  it('shows error if title or description is missing', async () => {
    const { getByText } = render(<AddItems />);
    fireEvent.press(getByText('Save'));
    await waitFor(() => {
      expect(getByText(/Fill name and description/i)).toBeTruthy()
    });
  });

  it('saves item to AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);
    const { getByPlaceholderText, getByText } = render(<AddItems />)
    fireEvent.changeText(getByPlaceholderText('Name'), 'Test Item')
    fireEvent.changeText(getByPlaceholderText('Description'), 'Test Desc')
    fireEvent.press(getByText('Save'))
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});

describe('ShowItemScreen', () => {
  it('renders empty list message', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null)
    const { getByText } = render(<ShowItemScreen />)
    await waitFor(() => {
      expect(getByText(/No items found/i)).toBeTruthy()
    });
  });

  it('renders items from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([
      { title: 'Item1', description: 'Desc1', createdAt: new Date().toISOString() }
    ]));
    const { getByText } = render(<ShowItemScreen />);
    await waitFor(() => {
      expect(getByText('Item1')).toBeTruthy()
      expect(getByText(/Desc1/)).toBeTruthy()
    });
  });
});