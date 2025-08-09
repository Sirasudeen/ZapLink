import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import { RocketOutlined, CloseOutlined } from '@ant-design/icons';


const { Content } = Layout;

const MainLayout = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(true);

    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {isAlertVisible && (
                <div className="relative bg-gradient-to-r from-[#0083b0] to-[#40c9ff] text-white text-center p-2 text-sm font-medium flex justify-center items-center rounded-lg mt-1 mx-1 shadow-lg">
                    <RocketOutlined className="mr-2" />
                    <span>Analytics feature is coming soon! Stay tuned.</span>
                    <button
                        onClick={() => setIsAlertVisible(false)}
                        className="absolute right-4 text-white hover:text-gray-200 transition-colors"
                        aria-label="Close notification"
                    >
                        <CloseOutlined />
                    </button>
                </div>
            )}
            <AppHeader />
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout;