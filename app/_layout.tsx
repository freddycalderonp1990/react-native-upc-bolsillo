import CustomDrawer from '@/presentation/components/shared/CustomDrawer';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'indigo',
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: 'rgba(30, 30, 30, 0.7)', // gris oscuro con transparencia
    
        },

      }}
    >
    


    </Drawer>
  );
}
